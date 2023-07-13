import './MarketItem.css';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux'
import { incrementMoney, buyCar } from '../../redux/store/store'

const MarketItem = ({car}) => {
    const dispatch = useDispatch();
    const thisRef = useRef();
    function buy() {
        dispatch(incrementMoney(-car.endPrice));
        dispatch(buyCar(car));
        thisRef.current.remove();
    }
    return (
        <div className='car__container'>
            <div className="market__car" ref={thisRef}>
                <div className='market__car-title'>
                    <span>{car.name}</span>
                    <img className="market__car-img" src={require(`../../img/${car.img}`)} alt="" style={{filter: `sepia(${100-car.damage}%)`}}/>
                </div>
                <div className='market__car-info'>
                    <span>Состояние: {car.damage}</span>
                    <span>Цена: {car.endPrice}</span>
                    <span>Пробег: {car.mileage}км</span>
                    <span className='link' onClick={buy}>Купить</span>
                </div>
            </div>
        </div>
    );

}

export default MarketItem;