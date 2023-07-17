import { createSlice } from '@reduxjs/toolkit'


// const localStore = localStorage.playerData

// const moneyStart = localStore ? JSON.parse(localStore).money : 100;

export const counterSlice = createSlice({
  name: 'game',
  initialState: {
    sound: true,
    view: 'garage',
    lvl: 1,
    maxExp: 100000,
    currentExp: 0,
    money: 15000,
    garage: [],
    garageSpaces: [0],
  },
  reducers: {
    incrementMoney: (state, action) => {
      state.money += action.payload
    },
    update: (state, action) => {
      state[action.payload.name] = action.payload.source;
    },
    addExp: (state, action) => {
      console.log(state.currentExp);
      state.currentExp += action.payload;
      if (state.currentExp >= state.maxExp) {
        state.lvl = state.lvl + 1;
        state.currentExp = 0;
        state.maxExp = state.lvl * state.lvl * 100000;
      }
    },
    buyCar: (state, action) => {
      state.garage.push(action.payload);
    },
    sellCar: (state, action) => {
      state.garage.splice(action.payload, 1);
    },
    carStatus: (state, action) => {
      state.garage[action.payload].status = true;
    },
    carRepair: (state, action) => {
      state.garage[action.payload].damage = +state.garage[action.payload].damage + 1;
      state.garage[action.payload].endPrice = state.garage[action.payload].startPrice + state.garage[action.payload].damage*state.garage[action.payload].ratio;
    }
  }
})


export const { incrementMoney, update, buyCar, sellCar, carRepair, carStatus, addExp} = counterSlice.actions

export default counterSlice.reducer