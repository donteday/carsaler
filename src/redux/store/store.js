import { createSlice } from '@reduxjs/toolkit'

const localStore = localStorage.playerData1
const moneyStart = localStore ? JSON.parse(localStore).money : 15000;
const lvlStart = localStore ? JSON.parse(localStore).lvl : 1;
const maxExpStart = localStore ? JSON.parse(localStore).maxExp : 100000;
const currentExpStart = localStore ? JSON.parse(localStore).currentExp : 0;
const garageStart = localStore ? JSON.parse(localStore).garage : [];
const repairStart = localStore ? JSON.parse(localStore).repair : 1;

export const counterSlice = createSlice({
  name: 'game',
  initialState: {
    sound: true,
    view: 'garage',
    lvl: 1,
    maxExp: maxExpStart,
    currentExp: currentExpStart,
    money: 15000,
    repair: repairStart,
    garage: garageStart,
    garageSpaces: [0],
    work: [
      { name: 'Курьер', amount: 1, max: 999 },
      { name: 'Такси', amount: 0, max: 999 },
      { name: 'Шиномонтаж', amount: 0, max: 999 },
      { name: 'Автосервис', amount: 0, max: 999 },
      { name: 'Автосалон', amount: 0, max: 999 },
    ]
  },
  reducers: {
    incrementMoney: (state, action) => {
      state.money += action.payload
    },
    update: (state, action) => {
      state[action.payload.name] = action.payload.source;
    },
    addExp: (state, action) => {
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
      state.garage[action.payload].damage = +state.garage[action.payload].damage + state.repair;
      state.garage[action.payload].endPrice = state.garage[action.payload].startPrice + state.garage[action.payload].damage*state.garage[action.payload].ratio;
      if (state.garage[action.payload].damage >= 100) state.garage[action.payload].damage = 100;
    },
    workUp: (state, action) => {
      state.work[action.payload.index].amount = state.work[action.payload.index].amount + action.payload.amount;
    }
  }
})


export const { workUp, incrementMoney, update, buyCar, sellCar, carRepair, carStatus, addExp} = counterSlice.actions

export default counterSlice.reducer