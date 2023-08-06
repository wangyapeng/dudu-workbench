import { createStore, createLogger } from 'vuex'
import roomList from './modules/roolList'
import guestList from './modules/guestList'
import appStore from './appStore'
import userStore from './userStore'
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
  },
  modules: {
    appStore,
    userStore,
    roomList,
    guestList,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})