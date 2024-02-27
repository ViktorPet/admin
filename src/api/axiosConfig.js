import axios from "axios/index";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;


function checkResponseCode(status) {
    if (status === 401) {
        window.location.href = '/login';
    }

    if (status === 403) {
        window.location.href = '/access-denied';
    }
}

axios.interceptors.response.use(response => {
    if(response.status) {
        let status = response.status;
        checkResponseCode(status);
    }

    return response;

}, error => {
    if(error.response){
        let status = error.response.status;
        checkResponseCode(status);
        return Promise.reject(error.response);
    } else {
        return Promise.reject(error.response);
    }
});


export default axios;