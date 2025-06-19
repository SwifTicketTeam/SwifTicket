import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token:  localStorage.getItem('token') || null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) {
            state.token = '';
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