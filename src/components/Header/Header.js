import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Header.css'
import { update } from '../../redux/store/store'

const Header = () => {
    const dispatch = useDispatch();
    const money = useSelector(state => state.counter.money);
    // const lvl = useSelector(state => state.counter.lvl);

    function inGarage() {
        dispatch(update({name: 'view', source: 'garage'}));
    }
    function inMarket() {
        dispatch(update({name: 'view', source: 'market'}));
    }

    return (
        <div className='header'>
            <div className="header__info">
                {/* <span>lvl: {lvl} </span> */}
                <span>Деньги: {money} Р</span>
            </div>
            <span className="link" onClick={inGarage}>Гараж</span>
            <span className="link" onClick={inMarket}>Рынок</span>
        </div >
    );
}

export default Header;