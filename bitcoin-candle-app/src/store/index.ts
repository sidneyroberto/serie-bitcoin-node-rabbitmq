import { createStore } from 'vuex'
import CandleStore from './modules/CandleStore'

export default createStore({
  modules: {
    CandleStore
  }
})
