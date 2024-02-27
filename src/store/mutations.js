import Vue from 'vue'

const componentRegister = {
    AppAdmin: () => import(/* webpackChunkName: "admin"   */ /* webpackPrefetch: true */ '../components/admin/AppAdmin'),
    AppTable: () => import(/*webpackChunkName: "adminComponent" */ '../components/tables/AppTable'),
    AppForm: () => import(/*  webpackChunkName: "adminComponent"*/ '../components/forms/AppForm'),
    AppShow: () => import(/*  webpackChunkName: "adminComponent"*/ '../components/pages/AppShow'),
    AppIframe: () => import(/*  webpackChunkName: "adminComponent"*/ '../components/iframe/AppIframe'),
    App404: () => import(/* webpackChunkName: "adminComponent" */ '../views/App404'),
};

export const SET_ITEMS = (state, payload) => {
    state.page_title = payload.page_title;
    state.user = payload.user;
    state.components = payload.components;
    state.languages = payload.languages;
    state.domain = payload.domain;
    state.token = payload.token;
    state.search = payload.search;
};

const getDefaultFormState = () => {
    return {
        formFields: {}
    }
};

export const CLEAR_FORM_STATE = (state) => {
    Object.assign(state, getDefaultFormState());
};

export const SET_ROUTES = (state, {routes, router}) => {

    for (let link of routes) {
        link['component'] = componentRegister[link['component']];
        if (link['children'].length > 0) {
            for (let child of link['children']) {
                child['components']['list'] = componentRegister[child['components']['list']];
            }
        }
    }
    router.addRoutes(routes);
};

export const SET_NOT_FOUND = ((state, payload) => {
    state.notFoundData = payload;
    state.notFoundStatus = !state.notFoundStatus;
});

export const SET_NAVIGATION_LINKS = (state, links) => {
    state.navigationLinks = links;
};

function deleteItemsRecursive(key, array) {
    for (let item of array) {
        if(item.primary_key === key) {
            array.splice(array.indexOf(item), 1);
            return;
        }
        if (item.children.length > 0) {
            deleteItemsRecursive(key, item.children);
        }
    }
}

export const DELETE_ROW_ITEM = (state, item) => {
    deleteItemsRecursive(item.primary_key, state.components.list.elements);
};

export  const OPEN_MODAL = (state, payload) => {
  state.modalData = payload;
};

export  const OPEN_MODAL_CLONE = (state, payload) => {
    state.modalCloneData = payload;
};

export  const OPEN_MODAL_EXPORT = (state, payload) => {
    state.modalExportData = payload;
};

export const UPDATE_ROW_LIST = (state, items) => {
    state.components.list.elements = items;
};

export const UPDATE_ELEMENTS = (state, payload) => {
    state.elements = payload;
};

export const TOGGLE_MENU = (state) => {
    state.toggleMenu = !state.toggleMenu;
};

export const SET_LOADING_STATUS = (state)=> {
    state.isLoading = !state.isLoading;
};

export const SET_SEARCH_LOADING_STATUS = (state)=> {
    state.searchLoadingStatus = !state.searchLoadingStatus;
};


export const UPDATE_FORM_FIELD = (state, payload) => {
    const value = payload.value;
    if(payload.update_values) { // Need for updating meta_title and slug
        const tmp = { ...state.formFields };
        payload.update_values.forEach(el => {
            if(state.formFields[payload.fieldName] === state.formFields[el]) {
                tmp[el] = value;
                state.formFields = { ...tmp };
            }
        })

    }
    state.formFields[payload.fieldName] = value;
};

export const UPDATE_FILE_FIELD = (state, payload) => {
    const name = payload.fieldName;
    const value = payload.value;
    Vue.set(state.formFields, name, value);
};

export const UPDATE_MODULE_VISIBILITY = (state, moduleId) => {
    let groups = state.components.form.groups;

    for (let group of groups) {
        if(group.children) {
            let moduleEntities = 'module_entities.' + moduleId;
            // debugger // eslint-disable-line
            for (let children of group.children) {
                for (let field in children.fields) {
                    if (field === moduleEntities) {
                        children.fields[field].hide = !children.fields[field].hide;
                    } else if (field.indexOf('module_entities') > -1) {
                        children.fields[field].hide = true;
                    }
                }
            }

        }
    }
};

export const SHOULD_SYNC_SEO_VALUES = (state, shouldSync) => {
   state.shouldSyncSeoValues = shouldSync;
};

export const ADD_FIELDS = (state, payload) => {
    state.formFields[payload.name] = payload.value;
};

export const UPDATE_CHECKBOX_ITEM = (state, payload) => {
    state.formFields[payload.name] = payload.checkedValues;
    if (!state.formFields[payload.name].includes(payload.choiceId)) {
        state.formFields[payload.name].push(payload.choiceId)
    } else {
        let index = state.formFields[payload.name].findIndex(id => id === payload.choiceId);
        state.formFields[payload.name].splice(index, 1)
    }
};

export const SHOW_NOTIFICATION_MESSAGE = (state, payload) => {
    // debugger // eslint-disable-line
    state.messageComponents.flash_message = payload.components.flash_message;
    state.messageComponents.hasMessage = !state.messageComponents.hasMessage;

};

export const HIDE_NOTIFICATION_MESSAGE = (state) => {
    state.messageComponents.hasMessage = !state.messageComponents.hasMessage;
};

export const REDIRECT_TO = (state, payload) => {
    state.redirectComponent = payload.components.redirect;
    state.redirectComponent.hasRedirect = true;
};

export const REMOVE_REDIRECT = (state) => {
    state.redirectComponent.hasRedirect = false;
};

export const SET_ERRORS = (state, payload) => {
    state.errors = payload;
};

export const CLEAR_ERRORS = (state, fieldName) => {
    if (fieldName) {
        state.errors[fieldName] = '';
        delete state.errors[fieldName];
        return;
    }
    state.errors = {};
};

export const UPDATE_SEARCH_ITEMS = (state, payload) => {
    state.components.list.elements = payload.components.list.elements;
};
