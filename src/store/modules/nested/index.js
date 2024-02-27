// import state from './state';
// import * as getters from './getters';
// import * as mutations from './mutation';
// import * as actions from './actions';


export default {
    namespaced: true,
    state: {
        elements: [
            {
                id: 1,
                name: "Shrek",
                elements: []
            },
            {
                id: 2,
                name: "Fiona",
                elements: [
                    {
                        id: 4,
                        name: "Lord Farquad",
                        elements: []
                    },
                    {
                        id: 5,
                        name: "Prince Charming",
                        elements: []
                    }
                ]
            },
            {
                id: 3,
                name: "Donkey",
                elements: []
            }
        ]
    },
    mutations: {
        updateElements: (state, payload) => {
            console.log(state);
            state.elements = payload;
        }
    },
    actions: {
        updateElements: ({ commit }, payload) => {
            console.log(payload);
            commit("updateElements", payload);
        }
    }
}