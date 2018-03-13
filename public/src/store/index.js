import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';
import router from '../router/index';

var auth = axios.create({
    baseURL: "//localhost:3000/auth/",
    timeout: 3000
});

var place = axios.create({
    baseURL: "https://www.google.com/maps/embed/v1/search?key=AIzaSyAPjJdiAmmeYPIveMMq-QfCZxx7m0VezsQ&q=",
    timeout: 3000
});

var direction = axios.create({
    baseURL: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAPjJdiAmmeYPIveMMq-QfCZxx7m0VezsQ&origin=",
    timeout: 3000
})

vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {}
    },
    mutations: {

    }, 
    actions: {
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