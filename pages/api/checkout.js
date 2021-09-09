import axios from "axios";
import Stripe from 'stripe'
import uuidv4 from 'uuid/v4';
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import calculateCartTotal from "../../utils/calculateCartTotal";
import { uuid4 } from "stripe/lib/utils";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { paymentData } = req.body;
    try {
        // Verify & get UserId from token
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // find the cart based on userId & populate it
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product",
        });
        // calculate cart totals again from cart products (be sure not messed with)
        const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
        // get the email from payment data & see if existing stripe customer
        const previousCustomer = await stripe.customers.list({
            email: paymentData.email,
            limit: 1,
        })
        const isExistingCustomer = previousCustomer.data.length > 0;
        // if not existing stripe customer, create them by email
        let newCustomer;
        if (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentData.email,
                source: paymentData.id
            })
        };
        const customer = (isExistingCustomer && previousCustomer.data[0].id) || newCustomer.id;
        // create a charge with total & send receipt email
        const charge = await stripe.charges.create({
            currency: 'usd',
            amount: stripeTotal,
            receipt_email: paymentData.email,
            customer,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`,

        }, {
            idempotency_key: uuid4()
        });
        // add the order data to our DB
        await new Order({
            user: userId,
            email: paymentData.email,
            total: cartTotal,
            products: cart.products,
        }).save();
        // Clear products in Cart
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { products: [] } }
        );
        // send back response oif success (200)
        res.status(200).send("Checkout successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processsing payment.")
    }
}
