import Product from '../../models/Product';
import Cart from '../../models/Cart';
import Order from '../../models/Order';

import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "POST":
            await handlePostRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        default:
            res.status(405).send(`Methos ${req.method} not allowed`)
    }
}

async function handlePostRequest(req, res) {
    const { name, price, description, mediaUrl } = req.body
    try {
        if (!name || !price || !description || !mediaUrl) {
            return res.status(422).send("Product is missing one or more fields");
        }
        const product = await new Product({ name, price, description, mediaUrl }).save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error creating product");
    }
}

async function handleGetRequest(req, res) {
    const { _id } = req.query;
    const product = await Product.findOne({ _id });
    res.status(200).json(product);
}


async function handleDeleteRequest(req, res) {
    const { _id } = req.query;
    try {
        // Delet product by _id
        await Product.findOneAndDelete({ _id });
        res.status(204).json({});
        await Cart.updateMany( // pull all from carts
            { "products.product": _id },
            { $pull: { products: { product: _id } } }
        );
        await Order.updateMany( // pull all from previous Orders
            { "products.product": _id },
            { $pull: { products: { product: _id } } }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting product");
    }


}

