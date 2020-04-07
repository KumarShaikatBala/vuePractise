
require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'



/*vue Router:*/
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default},
    { path: '/users', component: require('./components/Users.vue').default}
];
const router = new VueRouter({
    mode:'history',
    linkActiveClass:'active',
    routes // short for `routes: routes`
});

/*vform:*/
window.Form=Form;
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);


/*Moment js for Date time Format:*/
import moment from 'moment';
Vue.filter('myDate',function (created) {
    return moment(created).format('MMMM Do YYYY, h:mm:ss a');
});
/*Progress bar Package:*/
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '4px'
});

/*Sweet Alert Package:*/
import Swal from 'sweetalert2'
window.Swal = require('sweetalert2');
/*Sweet Alert Toaster:*/
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});
window.Toast=Toast;

/*Custome Event:*/

window.Fire=new Vue();


Vue.component('example-component', require('./components/ExampleComponent.vue').default);
//Vue.component('profile', require('./components/Profile.vue').default);



const app = new Vue({
    el: '#app',
    router
});
