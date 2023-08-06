const state = {
    userInfo: {
        id: null,
        name: "",
        email: "",
    }
}

const mutations = {
    UPDATE_USER_INFO: (state, val) => {
        state.userInfo = val;
    }
}

const actions = {
    updateUserInfo(store, val) {
        store.commit('UPDATE_USER_INFO', val)
    },
    logout(store,val){
        store.commit('UPDATE_USER_INFO',{id: null, name: ""})
    }
}

export default {
    state,
    actions,
    mutations,
}