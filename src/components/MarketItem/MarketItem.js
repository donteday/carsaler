import './MarketItem.css';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, buyCar } from '../../redux/store/store'

const MarketItem = ({ car, index }) => {
    const dispatch = useDispatch();
    const thisRef = useRef();
    const money = useSelector(state => state.counter.money);
    const lvl = useSelector(state => state.counter.lvl);
    const garage = useSelector(state => state.counter.garage);
    const garageSpaces = useSelector(state => state.counter.garageSpaces);
    function buy() {
        if ((money - car.endPrice) <= 0 || garage.length === garageSpaces.length) return;
        dispatch(incrementMoney(-car.endPrice));
        dispatch(buyCar(car));
        thisRef.current.remove();
    }
    return (
        <div className='car__container'>
            {
                index <= lvl-1 ?
                <div className="market__car" ref={thisRef}>
                    <div className='market__car-title'>
                        <span>{car.name}</span>
                        <img className="market__car-img" src={require(`../../img/${car.img}`)} alt="" style={{ filter: `sepia(${100 - car.damage}%)` }} />
                    </div>
                    <div className='market__car-info'>
                        <span>Состояние: {car.damage}</span>
                        <span>Цена: {car.endPrice}</span>
                        <span>Пробег: {car.mileage}км</span>
                        <span className='link' onClick={buy}>Купить</span>
                    </div>
                </div>
                : <div className="market__car">Откроется на {index+1} уровне</div>
            }

        </div>
    );

}

export default MarketItem;