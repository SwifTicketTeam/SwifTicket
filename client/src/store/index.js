import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token:  localStorage.getItem('token') || null,
        username: "",
        email: "",
        role: "",
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) {
            state.token = '';
            state.username = '';
            state.email = '';
            state.role = '';
            localStorage.removeItem('token');
        }
    },
    actions: {
        saveToken: (context, token) => {
            context.commit('setToken', token);
        },
        deleteToken: (context) => {
            context.commit('clearToken');
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getToken: (state) => state.token,
    }
});