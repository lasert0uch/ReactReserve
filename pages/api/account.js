import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res)
            break;
        case "PUT":
            await handlePutRequest(req, res)
            break;
        default:
            res.status(405).send("Request not allowed: ", req.method) // Use template literals if not working
            break;
    }
}

async function handleGetRequest(req, res) {
    if (!("authorization" in req.headers)) { // same as (!req.headers.authorization)
        return res.status(401).send("You are not authorized for this action");
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(403).send("Invalid token");
    }

}

async function handlePutRequest(req, res) {
    const { _id, role } = req.body;
    await User.findOneAndUpdate(
        { _id },
        { role },
    );
    res.status(200).send('User Updated');
}