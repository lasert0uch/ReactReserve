
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const users = await User.find({ _id: { $ne: userId } })
            .sort(
                {
                    name: "asc" //Sorting by the name of the user in the database. ascending order
                    //for descending order write name: "desc"
                    //Then login to your app as a root user and see the my account page
                    //If I want to sort on the role of the user i.e., user, admin, root then
                    //role: "asc" //for ascending order or "desc" for descending order
                    //We can sort on email 
                    //email: "asc" //Sort by email in ascending order
                })
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(403).send("Please login again")
    }
}
