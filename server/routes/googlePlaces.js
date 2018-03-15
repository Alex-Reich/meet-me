var router = require("express").Router()

var axios = require('axios')

var google = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/',
    timeout: 3000
})


router.post("/api/google", (req, res, next) => {
    console.log('reqBody', req.body)
    console.log("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+req.body.midway.lat+","+req.body.midway.lng+"&rankby=distance&name="+req.body.category+"&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U")
    google.get("json?location="+req.body.midway.lat+","+req.body.midway.lng+"&radius="+req.body.radius+"&name="+req.body.category+"&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U")
        .then(places => {
            console.log('SERVER', places.data)
            return res.send(places.data)
        })
        .catch(next)
})

module.exports = { router };