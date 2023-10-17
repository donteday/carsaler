import './App.css';
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementMoney } from './redux/store/store'
// import { increment, zeroingExp } from './redux/store/store'
import Header from './components/Header/Header';
import Market from './components/Market/Market';
import Garage from './components/Garage/Garage';
import Work from './components/Work/Work';
// import Seller from './components/Seller/Seller';

function App() {
  const dispatch = useDispatch();

  const view = useSelector(state => state.counter.view);
  const workArr = useSelector(state => state.counter.work);
  useEffect(() => {
    const moneyInterval = setInterval(() => {
      let count = 0;
      workArr.map(function (e, index) {
        if (e.amount) {
          // count += (Math.pow(e.amount,(index+1))*(index+1))*(1+ImproveMultiplair/10);
          count += Math.pow(e.amount,(index+1))*(index+1);
        };
        return true;
      });
      dispatch(incrementMoney(count))
    }, 1000);
    return () => clearInterval(moneyInterval);

  }, [workArr, dispatch]);

  return (
    <div className="app">
      <Header />
      {view === 'market' ? <Market /> : ''}
      {view === 'garage' ? <Garage /> : ''}
      {view === 'work' ? <Work /> : ''}

    </div>
  );
}

export default App;
