const router = require("express").Router();
const dotenv = require("dotenv");
const axios = require('axios');

dotenv.config();

let api = axios.create({
    headers: {
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': 'Bearer ' + process.env.OAUTH_TOKEN
    }
});

//Get Featured Channels
router.get("/", async (req, res) => {
    try{
        api.get("https://api.twitch.tv/helix/search/channels?query=?")
        .then(response => res.json(response.data))
    }catch(err){
        res.status(500).json(err)
    }
});

//Search for specific channel
router.get("/search/:query", async (req, res) => {
    try{
        api.get(`https://api.twitch.tv/helix/search/channels?query=?${req.params.query}`)
        .then(response => res.json(response.data))
    }catch(err){
        res.status(500).json(err)
    }
});

//Get specific channel info
router.get("/select/:channelId", async (req, res) => {
    try{
        api.get(`https://api.twitch.tv/helix/users?id=${req.params.channelId}`)
        .then(response => res.json(response.data))
    }catch(err){
        res.status(500).json(err)
    }
});

//Get specific channel follower count
router.get("/select/:channelID/followers", async (req, res) => {
    try{
        api.get(`https://api.twitch.tv/helix/users/follows?to_id=${req.params.channelID}&first=1`)
        .then(response => res.json(response.data))
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;