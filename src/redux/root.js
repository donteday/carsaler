import { configureStore } from '@reduxjs/toolkit'
import gameStore from './store/store'

export const store = configureStore({
    reducer: {
        counter: gameStore
    }
})

function sub() {
    localStorage.playerDataCar = JSON.stringify(store.getState().counter);
  }
store.subscribe(sub);