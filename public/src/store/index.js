import vue from 'vue';
import vuex from 'vuex';
var production = !window.location.host.includes('localhost'); // FOR HEROKU

var herokuURL = production ? '//meetme-at.herokuapp.com/' : '//localhost:3000/' // FOR HEROKU

import axios from 'axios';
import router from '../router/index';
import authStore from './auth-store';
import planTripStore from './plan-trip-store';


var geocode = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
    // timeout: 3000
});

var serverAPI = axios.create({
    baseURL: herokuURL + "api/",
    // timeout: 3000,
    withCredentials: true
})

var placesAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch',
    timeout: 3000
})

var distanceAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=',
    // timeout: 3000
})

var apiKey = "&key=AIzaSyAKRamCx2fGfdUevOl9uYVPLce_FEv-Je4"
var baseMap = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U&origin="

vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {},
        map: {},
        voyage: {
            origin: {
                lat: 0,
                lng: 0
            },
            destination: {
                lat: 0,
                lng: 0
            }
        },
        midway: {},
        roadMidway: {},
        options: [],
        midWayResults: [],
        roadResults: [],
        originAddress: '',
        destinationAddress: '',
        contacts: [],
        emailSuccess: '',
        placesResults: false
    },
    modules: {
        authStore,
        planTripStore
    },
    mutations: {
        setMapOrigin(state, payload) {
            console.log("this is our SETMAP PAYLOAD ORIGIN!", payload)
            vue.set(state.voyage.origin, "lat", payload.lat)
            vue.set(state.voyage.origin, "lng", payload.lng)
        },
        setMapDestination(state, payload) {
            console.log("this is our SETMAP PAYLOAD DESTINATION!", payload)
            vue.set(state.voyage.destination, "lat", payload.lat)
            vue.set(state.voyage.destination, "lng", payload.lng)
        },
        updateUser(state, payload) {
            state.user = payload
        },
        setMidway(state, payload) {
            console.log('setMIDWAY,', payload)
            state.midway = payload
        },
        setRoadMidway(state, payload) {
            state.roadMidway = payload
        },
        setResults(state, payload) {
            state.midWayResults = payload
        },
        setRoadResults(state, payload) {
            state.placesResults = true
            state.roadResults = payload
        },
        setOriginAddress(state, payload) {
            state.originAddress = payload
        },
        setDestinationAddress(state, payload) {
            state.destinationAddress = payload
        },
        setContacts(state, payload) {
            state.contacts = payload
        },
        emailSuccess(state, payload) {
            state.emailSuccess = payload
        },
        noPlaces(state, payload){
            state.placesResults = false
        },
        clearData(state, payload){
            state.contacts = []
            state.roadResults = []
            state.midWayResults = []
            state.user = {}
        }
    },
    actions: {
        //GETS STARTING LOCATION
        getTripOrigin({ commit, dispatch }, payload) {
            // IF GEOLOCATION IS USED
            if(payload.origin.length == 0){
                return payload.geolocation
            }
            return new Promise((resolve, reject) => {
                geocode.get(payload.origin + apiKey).then(res => {
                        var data = res.data.results[0]
                        commit('setOriginAddress', data.formatted_address)
                        commit('setMapOrigin', { lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                        resolve({ lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })
            })
        },
        // GET TRIP DESTINATION
        getTripDestination({ commit, dispatch }, payload) {
            return new Promise((resolve, reject) => {
                geocode.get(payload.destination + apiKey).then(res => {
                        var data = res.data.results[0]
                        commit('setDestinationAddress', data.formatted_address)
                        commit('setMapDestination', { lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                        resolve({ lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })

            })
        },
        getDistance({ commit, dispatch }, payload) {

            distanceAPI.get(payload.origin.lat + ',' + payload.origin.lng + '&destinations=' + payload.destination.lat + ',' + payload.destination.lng + apiKey)
                .then(res => {
                    console.log('DISTANCE DATA:', res.data)
                        // dispatch distance to another function that 
                })
        },
        getPlaces({ commit, dispatch }, payload) {
            serverAPI.post('google', payload)
                .then(res => {
                    console.log('GOOGLE PLACES RESULTS', res.data)
                    if(res.data == "No Results"){
                        commit("noPlaces", res.data)
                    }else{
                        commit('setRoadResults', res.data)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //sending an email functions
        sendEmail({ commit, dispatch }, payload) {
            serverAPI.post('send', payload.email).then(res => {
                commit('emailSuccess', payload.id)
            })
        },
        getContacts({ commit, dispatch }, payload) {
            serverAPI
                .get('contacts')
                .then(res => {
                    var contacts = res.data
                    commit('setContacts', contacts)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editContact({ commit, dispatch }, payload) {
            serverAPI.put('contacts/'+ payload._id, payload)
                .then(res => {
                    var updatedContact = res.data;
                    dispatch('getContacts')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createContact({commit, dispatch}, payload) {
            console.log('NEW CONTACT INFO', payload)
            serverAPI.post('contacts', payload)
                .then(res => {
                    dispatch('getContacts')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteContact({commit, dispatch}, payload){
            serverAPI.delete('contacts/' + payload._id)
                .then(res => {
                    dispatch('getContacts')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
});