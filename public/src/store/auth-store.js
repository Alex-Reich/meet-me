import axios from 'axios';
import router from '../router'

var production = !window.location.host.includes('localhost'); // FOR HEROKU
var herokuURL = production ? '//meetme-at.herokuapp.com/' : '//localhost:3000/' // FOR HEROKU

var auth = axios.create({
    baseURL: herokuURL + "auth/",
    timeout: 3000,
    withCredentials: true
});
export default {
    actions: {
        //region user actions
        createUser({ commit, dispatch }, payload) {
            auth.post("register", payload).then(res => {
                    commit('updateUser', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        login({ commit, dispatch }, payload) {
            auth.post('login', payload).then(res => {
                    commit('updateUser', res.data.user)
                    dispatch('getContacts')
                    // router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log('Invalid Username or Password')
                })
        },
        authenticate({ commit, dispatch }, payload) {
            auth.get('authenticate')
                .then(res => {
                    console.log('AUTH SESSION', res.data)
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
                    commit('clearData', {})
                })
                .catch(err => {
                    console.log(err)
                })
        }
        //endregion
    }
}