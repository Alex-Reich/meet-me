import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';
import router from '../router/index';

var auth = axios.create({
    baseURL: "//localhost:3000/auth/",
    timeout: 3000
});

var place = axios.create({
    baseURL: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDncWlc5Zb37QYDvrCT88Dybb6KsHwZ9HQ&q=",
    timeout: 3000
});

// var directions = axios.create({
//     baseURL: "https://www.google.com/maps/embed/v1/directions?key=AAIzaSyDncWlc5Zb37QYDvrCT88Dybb6KsHwZ9HQ&origin=",
//     timeout: 3000
// })

var baseMap = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U&origin="

vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {},
        map: {
            options: {}
        }
        // map: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDncWlc5Zb37QYDvrCT88Dybb6KsHwZ9HQ&q=initMap"
    },
    mutations: {
        setMap(state, payload) {
            console.log("this is our SETMAP PAYLOAD!", payload)
        },
        updateUser(state, payload){
            state.user = payload
        }
    },
    actions: {
        //direction actions
        calcRoute({ commit, dispatch }, payload) {
            console.log(payload)
            const options = {
                zoom: 14,
                center: new google.maps.LatLng(51.501527, -0.1921837)
            }
            commit('setMap', baseMap + payload.origin + "&destination=" + payload.destination)
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