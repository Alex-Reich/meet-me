import axios from 'axios';
import router from '../router'


var auth = axios.create({
    baseURL: "//localhost:3000/auth/",
    timeout: 3000,
    withCredentials: true
});
export default {
    actions: {
        //region user actions
        createUser({ commit, dispatch }, payload) {
            auth.post("register", payload).then(res => {
                    commit('updateUser', res.data)
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
                })
                .catch(err => {
                    console.log(err)
                })
        }
        //endregion
    }
}