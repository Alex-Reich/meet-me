import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import MeetFriend from '@/components/MeetFriend';
import MapFriend from '@/components/MapFriend';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login', 
      component: Login
    },
    {
      path: '/meet-friend',
      name: 'MeetFriend',
      component: MeetFriend
    },
    {
      path: '/map-friend',
      name: 'MapFriend',
      component: MapFriend
    }
  ]
})
