const express = require("express");
const app = express();
const axios = require('axios');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const channelRoute = require("./routes/channels")

//middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Route
app.use("/channels", channelRoute);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.send(200);
      }
      else {
        next();
      }
});

//Test for heroku
/* app.get('/', (req, res) => { res.send('Hello from Express!')})
 */

app.listen(process.env.PORT || 4400, () => {
    console.log("Backend server is running!")
});
