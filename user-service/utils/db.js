const mongoose = require("mongoose");
const {mongodbUrl} = require("../configs/db.config")
const connectDB = () => {
    mongoose
        .connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .catch((err) => {
            console.log(
                "Could not connected to the database. Exiting now...",
                err
            );
            process.exit();
        });
};

module.exports = connectDB;
