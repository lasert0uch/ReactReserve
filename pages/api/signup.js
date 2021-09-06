import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from "../../models/Cart";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // 1) Validate fields
        if (!isLength(name, { min: 3, max: 20 })) {
            return res.status(422).send("Your name must be between 3 and 20 characters");
        } else if (!isLength(password, { min: 7 })) {
            return res.status(422).send("Your password must be at least 7 characters");
        } else if (!isEmail(email)) {
            return res.status(422).send("You must provide a valid email");
        }
        // 2) check if isExists in Db
        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).send(`User already exists with email ${email}`);
        }
        // 3) if not existing, hash the password
        const hash = await bcrypt.hash(password, 10);
        // 4) create user
        const newUser = await new User({
            name,
            email,
            password: hash,
        }).save();
        console.log({ newUser });
        // 5) Create a Cart for new user
        await new Cart({ user: newUser._id }).save();
        // 6) create token for new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // 7) send back token
        res.status(201).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error signing up user. Please try again later");
    }
}