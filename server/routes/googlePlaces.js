var router = require("express").Router()

var axios = require('axios')

var google = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/',
    timeout: 3000
})
var places = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/details/',
    timeout: 3000
})

router.post("/api/google", (req, res, next) => {
    console.log('reqBody', req.body)
    console.log("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+req.body.midway.lat+","+req.body.midway.lng+"&rankby=distance&name="+req.body.category+"&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U")
    google.get("json?location="+req.body.midway.lat+","+req.body.midway.lng+"&radius="+req.body.radius+"&name="+req.body.category+"&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U")
        .then(response =>{
            var promises = []
            
            for (let i = 0; i < response.data.results.length; i++) {
                const place = response.data.results[i];
                console.log('json?placeid='+place.place_id+"&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U")
                promises.push(places.get('json?placeid='+place.place_id+"&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U")
                .then(res => {
                    return res.data.result
                })
                .catch(err=>{
                    console.log(err)
                }))  
            }
            Promise.all(promises)
            .then(results =>{
                console.log("results:", results)
                return res.send(results)
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(next)
})

module.exports = { router };