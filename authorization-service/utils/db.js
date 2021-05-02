const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect(process.env.DB_CONNECT_URL, {
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
