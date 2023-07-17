import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, sellCar, carRepair, carStatus } from '../../redux/store/store'



const GarageCar = ({ car, index }) => {
    const dispatch = useDispatch();
    const thisRef = useRef();
    const repairRef = useRef();
    const engineRef = useRef();
    const dmg = useSelector(state => state.counter.garage[index].damage);
    const saleDuration = car.mileage;
    function sell() {
        console.log(car.status);
        if (car.status) return;
        dispatch(carStatus(index));
        setTimeout(() => {
            dispatch(incrementMoney(car.endPrice));
            dispatch(sellCar(index));
        }, saleDuration);
    }
    function onRepair() {
        if (car.damage >= 100) return;
        repairRef.current.style.display = 'flex';
    }
    function engineScale() {
        if (car.damage >= 99) {
            repairRef.current.style.display = 'none';
        }
        engineRef.current.style.transform = 'scale(1.05)';
        dispatch(carRepair(index));
    }
    function engineUnScale() {
        engineRef.current.style.transform = 'scale(1)'
    }

    return (
        <div className='car__container'>
            <div className="market__car garage_car" ref={thisRef}>
                <div className='market__car-title'>
                    <span>{car.name}</span>
                    <img className="market__car-img" src={require(`../../img/${car.img}`)} alt="" style={{ filter: `sepia(${100 - dmg}%)` }} />
                    <span>{car.status ? `Время продажи: ${saleDuration/1000}сек` : ''}</span>

                </div>
                <div className='market__car-info'>
                    <span style={car.status ? { color: `yellowgreen` } : { color: `red` }}>{car.status ? 'В продаже' : 'Не продается'}</span>
                    <span>Состояние: {car.damage}</span>
                    <span>Цена: {car.endPrice}</span>
                    <span>Пробег: {car.mileage}км</span>
                    <span className='link' onClick={sell}>Продать</span>
                    <span className='link' onClick={onRepair}>Починить</span>
                </div>
            </div>
            <div className='car__repair' ref={repairRef}>
                <img className="car__lift" src={require(`../../img/lift_1.png`)} alt="" />
                <img className="car__repair-c" src={require(`../../img/${car.img}`)} alt="" style={{ filter: `sepia(${100 - dmg}%)` }} />
                <img className="car__lift" src={require(`../../img/lift_2.png`)} alt="" />
                <div className='car__repair-bar'>
                    <span>{car.damage}</span>

                    <img className="car__repair-icon" src={require('../../img/key.png')} alt="" ref={engineRef}
                        onTouchStart={engineScale}
                        onMouseUp={engineUnScale} />
                </div>
            </div>
        </div>
    );
}

export default GarageCar;