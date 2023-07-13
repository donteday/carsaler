import { createSlice } from '@reduxjs/toolkit'


// const localStore = localStorage.playerData

// const moneyStart = localStore ? JSON.parse(localStore).money : 100;

export const counterSlice = createSlice({
  name: 'game',
  initialState: {
    sound: true,
    view: 'garage',
    lvl: 1,
    currentExp: 0,
    money: 15000,
    garage: [],
  },
  reducers: {
    incrementMoney: (state, action) => {
      state.money += action.payload
    },
    update: (state, action) => {
      state[action.payload.name] = action.payload.source;
    },
    buyCar: (state, action) => {
      state.garage.push(action.payload);
    },
    sellCar: (state, action) => {
      state.garage.splice(action.payload, 1);
    },
    carRepair: (state, action) => {
      state.garage[action.payload].damage = +state.garage[action.payload].damage + 1;
      state.garage[action.payload].endPrice = state.garage[action.payload].startPrice + state.garage[action.payload].damage*state.garage[action.payload].priceRatio;
    }
  }
})


export const { incrementMoney, update, buyCar, sellCar, carRepair} = counterSlice.actions

export default counterSlice.reducer