import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Header.css'
import { update } from '../../redux/store/store'

const Header = () => {
    const dispatch = useDispatch();
    const money = useSelector(state => state.counter.money);
    const lvl = useSelector(state => state.counter.lvl);
    const currentExp = useSelector(state => state.counter.currentExp);
    const maxExp = useSelector(state => state.counter.maxExp);

    function inGarage() {
        dispatch(update({ name: 'view', source: 'garage' }));
    }
    function inMarket() {
        dispatch(update({ name: 'view', source: 'market' }));
    }

    return (
        <div className='header'>
            <span className='header__exp' style={{ width: `${currentExp / maxExp * 100}%` }}></span>
            <div className="header__info">
                <span className="header__info-lvl">Ур. {lvl}</span>
                <span>Деньги: {money} Р</span>
            </div>
            <div className="header__buttons">
                <span className="link" onClick={inGarage}>Гараж</span>
                <span className="link" onClick={inMarket}>Рынок</span>
            </div>
        </div >
    );
}

export default Header;