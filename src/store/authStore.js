import createStore from "react-auth-kit/createStore";

const authStore = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
});

export default authStore;