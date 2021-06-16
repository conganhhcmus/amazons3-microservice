const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/api-gateway");

app.use(express.json());
app.use("/", routes);
app.listen(PORT, () => {
    console.log("api gateway running on: " + PORT);
});
