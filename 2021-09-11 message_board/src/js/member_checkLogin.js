import { webPath } from './common';

(async function () {

    // Base64
    // atob() converts binary to ASCII
    // btoa() converts ASCII to binary    


    let token = localStorage.getItem('token') || '';

    if (token === '') {
        alert('請登入系統。');
        location.href = webPath.page.member_login;
        return;
    }

    let requestHeaders = {
        'token': token
    };

    let fetchOptions = {
        method: 'GET',
        headers: new Headers(requestHeaders)
    };

    let response = await fetch(webPath.api.member_checkLogin, fetchOptions);
    let json = await response.json();

    if (json.resultCode === -1) {
        alert('請登入系統。');
        window.location.href = webPath.page.member_login;
    }

})();

function getTokenPayLoad() {

    let token = localStorage.getItem('token');
    let payLoad = token.split('.')[1];
    return window.atob(payLoad);
}

export {
    getTokenPayLoad
}
