import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Contacts from '@/components/Contacts'
import MeetFriend from '@/components/MeetFriend';
import PlanTrip from '@/components/PlanTrip';

Vue.use(Router);

export default new Router({
    routes: [{
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
            path: '/plan-trip',
            name: 'PlanTrip',
            component: PlanTrip
        },
        {
            path: '/contacts',
            name: 'Contacts',
            component: Contacts
        }
    ]
})