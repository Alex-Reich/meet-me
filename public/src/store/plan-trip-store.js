import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';
import router from '../router';

var geocode = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
    // timeout: 3000
});

var apiKey = "&key=AIzaSyAKRamCx2fGfdUevOl9uYVPLce_FEv-Je4"

export default {
    state: {
        trip: {
            start: {
                lat: 0,
                lng: 0
            },
            end: {
                lat: 0,
                lng: 0
            }
        },
        startAddress: '',
        endAddress: ''
    },
    mutations: {
        setMapStart(state, payload) {
            console.log("this is our SETMAP PAYLOAD ORIGIN!", payload)
            vue.set(state.trip.start, "lat", payload.lat)
            vue.set(state.trip.start, "lng", payload.lng)
        },
        setMapEnd(state, payload) {
            console.log("this is our SETMAP PAYLOAD DESTINATION!", payload)
            vue.set(state.trip.end, "lat", payload.lat)
            vue.set(state.trip.end, "lng", payload.lng)
        },
        setStartAddress(state, payload) {
            state.startAddress = payload
        },
        setEndAddress(state, payload) {
            state.endAddress = payload
        }
    },
    actions: {
        getStartLatLng({commit, dispatch}, payload){
            return new Promise((resolve, reject) => {
                geocode.get(payload.start + apiKey).then(res => {
                        var data = res.data.results[0]
                        commit('setStartAddress', data.formatted_address)
                        commit('setMapStart', { lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                        resolve({ lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })
            })
        },
        getEndLatLng({commit, dispatch}, payload){
            return new Promise((resolve, reject) => {
                geocode.get(payload.end + apiKey).then(res => {
                        var data = res.data.results[0]
                        commit('setEndAddress', data.formatted_address)
                        commit('setMapEnd', { lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                        resolve({ lat: data.geometry.location.lat, lng: data.geometry.location.lng })
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })
                    // commit('setMap', geocode + payload.origin + apiKey)

            })
        }
    }
}