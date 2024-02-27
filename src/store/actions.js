import axios from '../api/axiosConfig';

let BASE_URL = '/api';

if(isInDevelopmentMode()) {
    BASE_URL = 'http://netix.webfiniti.bg/api';
}

function hasDomainInUrl(url) {
    return (url.includes('http') || url.includes('https'));
}

function isInDevelopmentMode() {
    return process.env.NODE_ENV === 'development';
}

function saveItemsRecursive(items, array) {

    for (let [index, item] of array.entries()) {
        items[index] = {id: item.primary_key, children: []};
        if (item.children.length > 0) {
            saveItemsRecursive(items[index]['children'], item.children);
        }
    }
    return items;
}

function generateHeaders(token) {
    const headers = {
        'X-CSRF-TOKEN': token
    };
    return {
        headers: headers
    }
}

export const getItems = ({commit}, url, method) => {

    if(isInDevelopmentMode()) {
        //admin/groups/1/edit
        axios.get(`/db/create.json`, {validateStatus: false})
            .then(response => {
                if (response.status !== 404) {
                    let items = response.data;
                    const hasFlashMessage = Object.prototype.hasOwnProperty.call(items.components, 'flash_message');
                    const hasRedirect = Object.prototype.hasOwnProperty.call(items.components, 'redirect');
                    commit('SET_ITEMS', items);
                    if(hasFlashMessage) {
                        commit('SHOW_NOTIFICATION_MESSAGE', items);
                    }

                    if(hasRedirect) {
                        commit('REDIRECT_TO', items);
                    }
                    else {
                        commit('REMOVE_REDIRECT');
                    }
                }
                else {
                    const heading = response.data.heading;
                    const info = response.data.info;
                    const payload = {
                        heading,
                        info
                    };
                    commit('SET_NOT_FOUND', payload)
                }

            }).catch(() => {
        });

        return;
    }
    if (!method) {
        method = 'get';
    }

    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    } else {
        if(isInDevelopmentMode()) {
            BASE_URL = 'http://netix.webfiniti.bg/api';
        }else {
            BASE_URL = '/api';
        }

    }
    commit('SET_LOADING_STATUS');

    axios[method](`${BASE_URL}${url}`, {validateStatus: false})
        .then(response => {
            if (response.status !== 404) {
                let items = response.data;
                const hasFlashMessage = Object.prototype.hasOwnProperty.call(items.components, 'flash_message');
                const hasRedirect = Object.prototype.hasOwnProperty.call(items.components, 'redirect');
                commit('SET_ITEMS', items);
                if(hasFlashMessage) {
                    commit('SHOW_NOTIFICATION_MESSAGE', items);
                }

                if(hasRedirect) {
                    commit('REDIRECT_TO', items);
                }
                else {
                    commit('REMOVE_REDIRECT');
                }
            }
            else {
                const heading = response.data.heading;
                const info = response.data.info;
                const payload = {
                    heading,
                    info
                };
                commit('SET_NOT_FOUND', payload)
            }
            commit('SET_LOADING_STATUS');

        }).catch(() => {
    });
};

export const getSearchItems = ({commit}, {keyword, method, url}) => {
    commit('SET_SEARCH_LOADING_STATUS');
    axios[method](`${BASE_URL}${url}?keyword=` + keyword)
        .then(response => {
            if(response.data) {
                commit('UPDATE_SEARCH_ITEMS', response.data);
                commit('SET_SEARCH_LOADING_STATUS');
            }
        })
        .catch(err => {
            console.log(err)
        })
    // commit('UPDATE_SEARCH_ITEMS', payload);
};




export const getNavigationLinks = ({commit}) => {
    if(isInDevelopmentMode()) {
        axios.get(`/db/menu.json`)
            .then(response => {
                let links = response.data;
                commit('SET_NAVIGATION_LINKS', links);
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        axios.get(`${BASE_URL}/db/menu.json`)
            .then(response => {
                let links = response.data;
                commit('SET_NAVIGATION_LINKS', links);
            })
            .catch(err => {
                console.log(err)
            })
    }
};

export const getRoutes = ({commit}, router) => {
    if(isInDevelopmentMode()) {
        axios.get(`/db/routes.json`)
            .then(response => {
                let routes = response.data;
                commit('SET_ROUTES', {routes, router});
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        axios.get(`${BASE_URL}/db/routes.json`)
            .then(response => {
                let routes = response.data;
                commit('SET_ROUTES', {routes, router});
            })
            .catch((error) => {
                console.log(error);
            })
    }
};

export const cloneRowItemByItemId = ({commit, getters}, {url, method}) => {
    const token = getters.getToken;

    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    } else {
        if(isInDevelopmentMode()) {
            BASE_URL = 'http://netix.webfiniti.bg/api';
        }else {
            BASE_URL = '/api';
        }
    }
    method = method.toLowerCase();

    commit('SET_LOADING_STATUS');

    axios[method](`${BASE_URL}${url}`, generateHeaders(token))
        .then(response => {
            let payload = response.data;

            commit('SET_ITEMS', payload);

            window.location = window.location.href;
        }).catch(error => {
            console.log(error);
            commit('SET_LOADING_STATUS');
    });
};

export const exportToCsv = ({commit}, {action, method, data}) => {
    if (hasDomainInUrl(action)) {
        BASE_URL = '';
    } else {
        if(isInDevelopmentMode()) {
            BASE_URL = 'http://netix.webfiniti.bg/api';
        }else {
            BASE_URL = '/api';
        }
    }

    method = method.toLowerCase();
    commit('SET_LOADING_STATUS');
    axios[method](`${BASE_URL}${action}`, data)
        .then(response => {
            const blob = new Blob ([response.data], { type: 'text/csv' });
            const link = document.createElement ('a');
            const uniqid = Math.random ().toString (36).substring (2, 15) + Math.random ().toString (36).substring (2, 15);

            link.href = URL.createObjectURL (blob);
            link.download = 'export_'+ uniqid +'.csv';
            link.click ();

            URL.revokeObjectURL (link.href);

            commit('SET_LOADING_STATUS');
        })
        .catch(error => {
            const errors = error.data.errors;
            commit('SET_ERRORS', errors);
            commit('SET_LOADING_STATUS');
        });
};

export const deleteRowItem = ({commit, getters}, {element, url, method}) => {
    const token = getters.getToken;
    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    } else {
        if(isInDevelopmentMode()) {
            BASE_URL = 'http://netix.webfiniti.bg/api';
        }else {
            BASE_URL = '/api';
        }

    }
    method = method.toLowerCase();
    commit('SET_LOADING_STATUS');
    axios[method](`${BASE_URL}${url}`, generateHeaders(token))
        .then(response => {
            let payload = response.data;
            commit('SHOW_NOTIFICATION_MESSAGE', payload);
            commit('DELETE_ROW_ITEM', element);
            commit('SET_LOADING_STATUS');
        }).catch(error => {
            console.log(error);
            commit('SET_LOADING_STATUS');
    })
};

export const openModal = ({commit}, {element, url, method}) => {
    const data = {element, url, method};
    commit('OPEN_MODAL', data);
};

export const openModalClone = ({commit}, {element, url, method}) => {
    const data = {element, url, method};
    commit('OPEN_MODAL_CLONE', data);
};

export const openModalExport = ({commit}, {element, url, method}) => {
    const data = {element, url, method};
    commit('OPEN_MODAL_EXPORT', data);
};

export const updateRowList = ({commit, getters}, {url, method,  list, page}) => {
    const token = getters.getToken;
    const items = [];
    let savedItems = saveItemsRecursive(items, list);
    method = method.toLowerCase();
    if(hasDomainInUrl(url)) {
        BASE_URL = '';
    }

    commit('SET_LOADING_STATUS');
    axios[method](`${BASE_URL}${url}`, {elements: savedItems, page}, generateHeaders(token))
        .then(() => {
            commit('UPDATE_ROW_LIST', list);
            commit('SET_LOADING_STATUS');
        })
        .catch(()=> {
            commit('SET_LOADING_STATUS');
        });

};

export const updateElements = ({commit}, payload) => {
    commit("UPDATE_ELEMENTS", payload);
};

export const updatePublishPrimary = ({commit, getters }, {url, method}) => {
    const token = getters.getToken;

    method = method.toLowerCase();
    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    }

    axios[method](`${BASE_URL}${url}`, '', generateHeaders(token)).then(response => {
            const payload = response.data;
            commit('SHOW_NOTIFICATION_MESSAGE', payload);
            const hasRedirect = Object.prototype.hasOwnProperty.call(payload.components, 'redirect');
            if(hasRedirect) {
                commit('REDIRECT_TO', payload);
            }
        });
};

export const updatePublishInMenu = ({commit, getters }, {url, method}) => {
    const token = getters.getToken;

    method = method.toLowerCase();
    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    }

    axios[method](`${BASE_URL}${url}`, '', generateHeaders(token)).then(response => {
            const payload = response.data;
            commit('SHOW_NOTIFICATION_MESSAGE', payload);
            const hasRedirect = Object.prototype.hasOwnProperty.call(payload.components, 'redirect');
            if(hasRedirect) {
                commit('REDIRECT_TO', payload);
            }
        });
};

export const updatePublishNew = ({commit, getters }, {url, method}) => {
    const token = getters.getToken;

    method = method.toLowerCase();
    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    }

    axios[method](`${BASE_URL}${url}`, '', generateHeaders(token)).then(response => {
            const payload = response.data;
            commit('SHOW_NOTIFICATION_MESSAGE', payload);
            const hasRedirect = Object.prototype.hasOwnProperty.call(payload.components, 'redirect');
            if(hasRedirect) {
                commit('REDIRECT_TO', payload);
            }
        });
};

export const updatePublishFixed = ({commit, getters }, {url, method}) => {
    const token = getters.getToken;

    method = method.toLowerCase();
    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    }

    axios[method](`${BASE_URL}${url}`, '', generateHeaders(token)).then(response => {
            const payload = response.data;
            commit('SHOW_NOTIFICATION_MESSAGE', payload);
            const hasRedirect = Object.prototype.hasOwnProperty.call(payload.components, 'redirect');
            if(hasRedirect) {
                commit('REDIRECT_TO', payload);
            }
        });
};

export const updatePublishStatus = ({commit, getters }, {url, method}) => {
    const token = getters.getToken;

    method = method.toLowerCase();
    if (hasDomainInUrl(url)) {
        BASE_URL = '';
    }

    axios[method](`${BASE_URL}${url}`, '', generateHeaders(token)).then(response => {
            const payload = response.data;
            commit('SHOW_NOTIFICATION_MESSAGE', payload);
            const hasRedirect = Object.prototype.hasOwnProperty.call(payload.components, 'redirect');
            if(hasRedirect) {
                commit('REDIRECT_TO', payload);
            }
        });
};

export const updateModuleItem = ({commit}, payload) => {
    commit('UPDATE_CHECKBOX_ITEM', payload);
};

export const toggleMenu = ({commit}) => {
    commit('TOGGLE_MENU');
};

export const updateField = ({commit}, payload) => {
    commit('UPDATE_FORM_FIELD', payload);

};

export const updateFileField = ({commit}, payload) => {
    commit('UPDATE_FILE_FIELD', payload);
};

export const shouldSyncSeoValues = ({commit}, shouldSync) => {
    commit('SHOULD_SYNC_SEO_VALUES', shouldSync);
};


export const addFields = ({commit}, payload) => {
    commit('ADD_FIELDS', payload);
};

export const addFileFields = ({commit}, payload) => {
    commit('ADD_FILE_FIELD', payload);
};

export const updateModuleVisibility = ({commit}, id) => {
    commit('UPDATE_MODULE_VISIBILITY', id);
};

export const sendFormData = ({commit}, {action, method, data}) => {
    if (hasDomainInUrl(action)) {
        BASE_URL = '';
    } else {
        if(isInDevelopmentMode()) {
            BASE_URL = 'http://netix.webfiniti.bg/api';
        }else {
            BASE_URL = '/api';
        }

    }

    method = method.toLowerCase();
    commit('SET_LOADING_STATUS');
    axios[method](`${BASE_URL}${action}`, data)
        .then(response => {
            const payload = response.data;
            const hasFlashMessage = Object.prototype.hasOwnProperty.call(payload.components, 'flash_message');
            const hasRedirect = Object.prototype.hasOwnProperty.call(payload.components, 'redirect');

            if(hasRedirect) {
                commit('REDIRECT_TO', payload);
            }else {
                commit('REMOVE_REDIRECT');
            }
            if(hasFlashMessage) {
                commit('SHOW_NOTIFICATION_MESSAGE', payload);
            }
            commit('SET_LOADING_STATUS');
        })
        .catch(error => {
            const errors = error.data.errors;
            commit('SET_ERRORS', errors);
            commit('SET_LOADING_STATUS');
        });
};

export const hideNotificationMessage = ({commit}) => {
    commit('HIDE_NOTIFICATION_MESSAGE');
};

export const removeRedirect = ({commit}) => {
    commit('REMOVE_REDIRECT');
};

export const clearErrors = ({commit}, payload) => {
    commit('CLEAR_ERRORS', payload);
};

export const clearFormState = ({commit}) => {
    commit('CLEAR_FORM_STATE');
};
