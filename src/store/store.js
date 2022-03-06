import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        toDialogFormVisible: false,
    },
    getters: {

    },
    mutations: {
        setDialogFormVisible(state) {
            state.toDialogFormVisible = true;
            console.log("toDialogFormVisible=>", state.toDialogFormVisible);
        }
    },
    actions: {

    },
})

export default store