import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

Vue.use(vuex, axios);

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

// import searchModule from './modules/search'


// Vue.config.devtools = true;

const debug = process.env.NODE_ENV === 'development'

Vue.config.devtools = debug;

export default new vuex.Store({
    strict: debug,
    state,
    getters,
    mutations, // assign new state, or refresh the state
    actions, // // Make a API call async,
    // modules: {
    //     searchModule
    // },
})
