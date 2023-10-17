import { createSlice } from '@reduxjs/toolkit'

const localStore = localStorage.playerDataCar;
const moneyStart = localStore ? JSON.parse(localStore).money : 15000;
const lvlStart = localStore ? JSON.parse(localStore).lvl : 1;
const maxExpStart = localStore ? JSON.parse(localStore).maxExp : 100000;
const currentExpStart = localStore ? JSON.parse(localStore).currentExp : 0;
const garageStart = localStore ? JSON.parse(localStore).garage : [];
const repairStart = localStore ? JSON.parse(localStore).repair : 1;
const work0 = localStore ? JSON.parse(localStore).work[0].amount: 1;
const work1 = localStore ? JSON.parse(localStore).work[1].amount: 0;
const work2 = localStore ? JSON.parse(localStore).work[2].amount: 0;
const work3 = localStore ? JSON.parse(localStore).work[3].amount: 0;
const work4 = localStore ? JSON.parse(localStore).work[4].amount: 0;

export const counterSlice = createSlice({
  name: 'game',
  initialState: {
    sound: true,
    view: 'garage',
    lvl: lvlStart,
    maxExp: maxExpStart,
    currentExp: currentExpStart,
    money: moneyStart,
    repair: repairStart,
    garage: garageStart,
    garageSpaces: [0],
    seller: false,
    work: [
      { name: 'Курьер', amount: work0, max: 999 },
      { name: 'Такси', amount: work1, max: 999 },
      { name: 'Шиномонтаж', amount: work2, max: 999 },
      { name: 'Автосервис', amount: work3, max: 999 },
      { name: 'Автосалон', amount: work4, max: 999 },
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