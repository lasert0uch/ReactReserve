import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



connectDb();

export default async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check if User exists by email
        const user = await User.findOne({ email }).select('+password');
        // 2. -- if not, return error
        if (!user) {
            return res.status(404).send(`No user exists with email: ${email}`);
        }
        // 3. Check if User pwd matched db value
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) {
            // 4. -- if so, generate token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // 5. send token to client
            return res.status(200).json(token);
        } else {
            return res.status(401).send(`Passsword Mismatch: Please enter the correct password`)
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Error Logging In. Please try again later");
    }
}