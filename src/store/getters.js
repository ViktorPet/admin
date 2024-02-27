// debugger // eslint-disable-line

export const getMenuStatus = (state) => {
    return state.toggleMenu;
};

export const getDevelopmentMode = (state) => {
    return state.isInDevelopmentMode;
};

export const getLoadingStatus = (state) => {
    return state.isLoading;
};

export const getSearchLoadingStatus = (state) => {
    return state.searchLoadingStatus;
};

export const getHostName = (state) => {
    return state.hostName;
};

export const getMetaField = (state) => {
    return (name) => {
        if(state.formFields) {
            return state.formFields[name]
        }
    }
};

export const getDomainName = (state) => {
    return state.domain.domain;
};

export const getDomainLink = (state) => {
    return state.domain.link;
};

export const getDomainImage = (state) => {
    return state.domain.domain_image;
};

export const getIframeSrc = (state) => {
    if(state.components.iframe) {
        return state.components.iframe.src + '?type=2&&field_id=upload_file';
    }

};

export const getNotFoundStatus = (state) => {
    return state.notFoundStatus;
};

export const hasAnyError = (state) => {
    if(state.errors) {
        return Object.keys(state.errors).length > 0;
    } else {
        return false;
    }

};

export const getToken = (state) => {
    return state.token;
};

export const hasError = (state) => {
    return (field) => {
        if(state.errors) {
            return Object.prototype.hasOwnProperty.call(state.errors, field);
        } else {
            return false;
        }
    }
};

export const getErrors = (state) => {
    return (field) => {
        if (state.errors[field] && Array.isArray(state.errors[field])) {
            return state.errors[field][0];
        } else {
            return state.errors[field]
        }
    }
};

export const shouldSyncSeoValues = (state) => {
    return state.shouldSyncSeoValues;
};