import mongoose from 'mongoose';
const connection = {};

async function connectDb() {
    // console.log(`connection.isConnected = ${connection.isConnected}`)
    if (connection.isConnected) {
        // Use Existing Connection
        console.log('Using Existing DB Connection');
        return;
    }
    // Use a new DB Connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // console.log('New Database Connected');
    connection.isConnected = db.connections[0].readyState;
    // console.log(`connection.isConnected = ${connection.isConnected}`)

}

export default connectDb;