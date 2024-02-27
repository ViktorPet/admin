import VueRouter from 'vue-router';
import AppRedirect from '../components/shared/redirect/AppRedirect';

export const routes = [
    { path: '/admin/docs', component: AppRedirect }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


export default router;
