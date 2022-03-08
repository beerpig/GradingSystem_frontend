import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        toDialogFormVisible: false,
        toDialogFormEmail: '',
        toCollapseData: ''
    },
    getters: {

    },
    mutations: {
        setDialogFormVisible(state) {
            state.toDialogFormVisible = true;
            console.log("toDialogFormVisible=>", state.toDialogFormVisible);
        },
        setDialogFormEmail(state, { data }) {
            state.toDialogFormEmail = data.data.email
            console.log("toDialogFormEmail=>", data)
        },
        setCollapse(state, { data }) {
            state.toCollapseData = data;
            console.log("toCollapseData=>", data)
        }
    },
    actions: {

    },
})

export default store