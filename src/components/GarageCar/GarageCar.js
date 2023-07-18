import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, sellCar, carRepair, carStatus, addExp } from '../../redux/store/store'



const GarageCar = ({ car, index }) => {
    const dispatch = useDispatch();
    const thisRef = useRef();
    const repairRef = useRef();
    const engineRef = useRef();
    const blackRef = useRef();
    const dmg = useSelector(state => state.counter.garage[index].damage);
    const saleDuration = car.mileage / 5 + car.ratio * 100;
    function sell() {
        console.log(car.status);
        if (car.status) return;
        dispatch(carStatus(index));
        setTimeout(() => {
            dispatch(addExp(car.endPrice));
            dispatch(incrementMoney(car.endPrice));
            dispatch(sellCar(index));
        }, saleDuration);
    }
    function onRepair() {
        if (car.damage >= 100) return;
        repairRef.current.style.display = 'flex';
        blackRef.current.style.display = 'block';
    }
    function engineScale() {
        if (car.damage >= 99) {
            repairRef.current.style.display = 'none';
            blackRef.current.style.display = 'none';
        }
        engineRef.current.style.transform = 'scale(1.05)';
        dispatch(addExp(250));
        dispatch(carRepair(index));
    }
    function engineUnScale() {
        engineRef.current.style.transform = 'scale(1)'
    }

    return (
        <div className='car__container car__container-garage'>
            <div className="garage_car" ref={thisRef}>
                <div className='garage_car-title'>
                    <div className='garage__car-info'>
                        <span>{car.name}</span>
                        <span>Состояние: {car.damage}</span>
                        <span>Цена: {car.endPrice}</span>
                        <span>Пробег: {car.mileage}км</span>
                        <span style={car.status ? { color: `yellowgreen` } : { color: `red` }}>{car.status ? 'В продаже' : 'Не продается'}</span>
                        <span>{car.status ? `Время продажи: ${(saleDuration / 1000).toFixed(0)}сек` : ''}</span>
                    </div>
                    <div className='garage__car-buttons'>
                        <span className='link' onClick={sell}>Продать</span>
                        <span className='link' onClick={onRepair}>Починить</span>
                    </div>
                </div>
                <img className="garage_car-img" src={require(`../../img/shadow.png`)} alt="" style={{ filter: `sepia(${100 - dmg}%)` }} />
                <img className="garage_car-img" src={require(`../../img/${car.img}`)} alt="" style={{ filter: `sepia(${100 - dmg}%)` }} />

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
            <div className="black" ref={blackRef}></div>
        </div>
    );
}

export default GarageCar;