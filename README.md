## Sean Varvel's Project Repo for MERN Stack - The Complete Guide
Will require a new file to be added to root, `next.config.js`, with the following code, where `<userID>:<Password>` are properly defined for MongoDB:
```
// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://<userID>:<Password>@cluster0.suxyl.mongodb.net/ReactReserve?retryWrites=true&w=majority",
    JWT_SECRET: "<insert-jwt-secrets>",
    CLOUDINARY_URL: "<insert-cloudinary-url>",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
```
