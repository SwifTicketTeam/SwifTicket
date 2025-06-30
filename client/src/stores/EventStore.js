import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        event: {},
    },
    mutations: {
        newEvent(state, event) {
            state.event = event;
        }
    },
    actions: {
        setEvent({ commit }, event) {
            commit("newEvent", event);
        }
    },
    getters: {
        getEvent: (state) => state.event,
    }
}