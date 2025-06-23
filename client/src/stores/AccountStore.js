import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default{
    namespaced: true,
    state: {
        bio:  "",
    },
    mutations: {
        saveBio (state, newBio) {
            state.bio = newBio;
            console.log(state.bio);
        }
    },
    actions: {
        setBio ({ commit }, newBio) {
            commit("saveBio", newBio);
        }
    },
    getters: {
        getBio: state => state.bio,
    }
}