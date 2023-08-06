const state = () => ({
    login: false,
})


const mutations = {
    SET_LOGIN_STATUS: (state, val) => {
        state.login = val;
    }
}

const actions = {
    setLoginStatus({commit}, val) {
        commit('SET_LOGIN_STATUS',val)
    },
    clearLogin({commit}) {
        commit('SET_LOGIN_STATUS',false)
    }
}


export default {
    state,
    actions,
    mutations,
}