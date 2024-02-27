import Vue from 'vue';
import vueDebounce from 'vue-debounce';

import VuePageTransition from 'vue-page-transition';
import VueRouter from 'vue-router';

import App from './App.vue';
import store from './store';
import router from './router';

import AppFileManager from './components/forms/filemanager/AppFileManager';
import Checkbox from './components/forms/CheckBox';
import Datetime from 'vue-datetime';
import vSelect from "vue-select";
import AppNavigationList from './components/sidebar/AppNavigationList';
import AppNavigationListItem from './components/sidebar/AppNavigationListItem';
import AppNotificationMessage from './components/shared/notification/AppNotificationMessage';
import AppRedirect from './components/shared/redirect/AppRedirect';
import AppModalClone from './components/shared/modal/AppModalClone';
import AppModalExport from './components/shared/modal/AppModalExport';
import Skeleton from 'vue-loading-skeleton';
import ColorfulCircle from 'vue-colorful-circle';
import colorPicker from '@caohenghu/vue-colorpicker';
import CollapseTransition from "@ivanv/vue-collapse-transition";

import 'vue-datetime/dist/vue-datetime.css';
import 'jquery/src/jquery';
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
require("@fancyapps/fancybox");
import 'bootstrap/dist/js/bootstrap.min';
import VueMoment from 'vue-moment';
import VueLazyload from 'vue-lazyload';
import Multiselect from 'vue-multiselect';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.component('app-navigation-list', AppNavigationList);
Vue.component('app-navigation-list-item', AppNavigationListItem);
Vue.component('app-notification-message', AppNotificationMessage);
Vue.component('app-redirect', AppRedirect);
Vue.component('app-filemanager', AppFileManager);
Vue.component('app-checkbox', Checkbox);
Vue.component('v-select', vSelect)
Vue.component('app-modal-clone', AppModalClone);
Vue.component('app-modal-export', AppModalExport);
Vue.component('v-multi-select', Multiselect);
Vue.component(VueNumberInput.name, VueNumberInput);
Vue.component('color-picker', colorPicker);
Vue.component('collapse-transition', CollapseTransition);
Vue.component('calendar', Calendar);
Vue.component('date-picker', DatePicker);
Vue.use (Calendar);
Vue.use (DatePicker);
Vue.use(VueMoment);
Vue.use(VuePageTransition);
Vue.use(VueRouter);
Vue.use(Datetime);
Vue.use(vueDebounce);
Vue.use(vSelect);
Vue.use(Skeleton);
Vue.use(Multiselect);
Vue.use(VueNumberInput);
Vue.use(ColorfulCircle);
Vue.use(colorPicker);
Vue.use(CollapseTransition);

Vue.use(vueDebounce, {
    listenTo: 'input'
});

Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: '../images/loader.gif',
});

Vue.config.productionTip = false;
Vue.config.devtools = true;


// Vue.config.devtools = process.env.NODE_ENV === 'development';

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
