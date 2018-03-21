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
    google.get("json?location="+req.body.midway.lat+","+req.body.midway.lng+"&radius="+req.body.radius+"&name="+req.body.category+"&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U")
        .then(response =>{
            var promises = []
            var length = req.body.length <= response.data.results.length ? req.body.length : response.data.results.length
            for (let i = 0; i < length; i++) {
                const place = response.data.results[i];
                promises.push(places.get('json?placeid='+place.place_id+"&key=AIzaSyBece11rk9XiCkYhO6GAL-DNC6_2p74_Ck")
                .then(res => {
                    return res.data.result
                })
                .catch(err=>{
                    console.log(err)
                }))  
            }
            Promise.all(promises)
            .then(results =>{
                if(results.length > 0){
                    return res.send(results)
                }else{
                    return res.send("No Results")
                }
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(next)
})

module.exports = { router };