import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';
import router from '../router/index';

var auth = axios.create({
    baseURL: "//localhost:3000/auth/",
    timeout: 3000
});

var geocode = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
    timeout: 3000
});

// var directions = axios.create({
//     baseURL: "https://www.google.com/maps/embed/v1/directions?key=AAIzaSyDncWlc5Zb37QYDvrCT88Dybb6KsHwZ9HQ&origin=",
//     timeout: 3000
// })

var apiKey = "&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U"
var baseMap = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U&origin="

vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {},
        map: {},
        origin: {
            lat: 43,
            lng: -116
        },
        destination: {
            lat: 43,
            lng: -116
        },
        options: []
        // map: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDncWlc5Zb37QYDvrCT88Dybb6KsHwZ9HQ&q=initMap"
    },
    mutations: {
        setMapOrigin(state, payload) {
            console.log("this is our SETMAP PAYLOAD ORIGIN!", payload)
            vue.set(state.origin, "lat", payload.lat)
            vue.set(state.origin, "lng", payload.lng)
            // state.options.lat = payload.lat;
            // state.options.lng = payload.lng;
        },
        setMapDestination(state, payload){
            console.log("this is our SETMAP PAYLOAD DESTINATION!", payload)
            vue.set(state.destination, "lat", payload.lat)
            vue.set(state.destination, "lng", payload.lng)
        },
        updateUser(state, payload){
            state.user = payload
        }
    },
    actions: {
        //direction actions
        getTripOrigin({ commit, dispatch }, payload) {
            console.log("ORIGIN ACTION", payload)
            geocode.get(payload.origin+apiKey).then(res =>{
                console.log(res)
                var data = res.data.results[0].geometry.location
                console.log("THIS IS DATA FROM CALCROUTE", data)
                commit('setMapOrigin', {lat: data.lat, lng: data.lng})
            })

            .catch(error =>{
                console.log(error)
            })
        },
        getTripDestination({ commit, dispatch }, payload) {
            console.log("DESTINATION ACTION", payload)
            geocode.get(payload.destination+apiKey).then(res =>{
                console.log(res)
                var data = res.data.results[0].geometry.location
                console.log("THIS IS DATA FROM CALCROUTE DEST.", data)
                commit('setMapDestination', {lat: data.lat, lng: data.lng})
            })
            .catch(error =>{
                console.log(error)
            })
            // commit('setMap', geocode + payload.origin + apiKey)
        },

        //user actions
        createUser({ commit, dispatch }, payload) {
            auth.post("register", payload).then(res => {
                commit('updateUser', res.data.user)
                router.push({ name: 'Home' })
            })
                .catch(err => {
                    console.log(err)
                })
        },
        login({ commit, dispatch }, payload) {
            auth.post('login', payload).then(res => {
                commit('updateUser', res.data.user)
                router.push({ name: 'Home' })
            })
                .catch(err => {
                    console.log('Invalid Username or Password')
                })

        },
        authenticate({ commit, dispatch }, payload) {
            auth.get('authenticate', payload).then(res => {
                commit('updateUser', res.data)
            })
                .catch(err => {
                    console.log(err)
                })
        },
        logout({ commit, dispatch }, payload) {
            auth.delete('logout')
                .then(res => {
                    commit('updateUser', {})
                    dispatch('authenticate', payload)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
});