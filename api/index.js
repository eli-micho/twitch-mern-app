const express = require("express");
const app = express();
const axios = require('axios');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const channelRoute = require("./routes/channels")

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/channels", channelRoute);

app.listen(3300, () => {
    console.log("Backend server is running!")
});
