import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        token:  localStorage.getItem('token') || null,
        UID: '',
        username:  '',
        email:  '',
        role:  '',
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clearToken(state) {
            state.token = null;
            state.UID = '';
            state.username = '';
            state.email = '';
            state.role = '';
            localStorage.removeItem('token');
        },
        setName(state, name) {
            state.username = name;
        }
    },
    actions: {
        saveToken: (context, token) => {
            context.commit('setToken', token);
        },
        deleteToken: (context) => {
            context.commit('clearToken');
        },
        saveName: (context, name) => {
            context.commit('setName', name);
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    }
}