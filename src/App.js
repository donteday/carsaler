import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import { increment, zeroingExp } from './redux/store/store'
import Header from './components/Header/Header';
import Market from './components/Market/Market';
import Garage from './components/Garage/Garage';

function App() {
  const view = useSelector(state => state.counter.view);

  return (
    <div className="app">
      <Header />
      {view === 'market' ? <Market /> : <Garage />}
    </div>
  );
}

export default App;
