import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, sellCar, carRepair } from '../../redux/store/store'



const GarageCar = ({ car, index }) => {
    const dispatch = useDispatch();
    const thisRef = useRef();
    const repairRef = useRef();
    const engineRef = useRef();
    const dmg = useSelector(state => state.counter.garage[index].damage);

    function sell() {
        dispatch(incrementMoney(car.endPrice));
        dispatch(sellCar(index));
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
            <div className="market__car" ref={thisRef}>
                <div className='market__car-title'>
                    <span>{car.name}</span>
                    <img className="market__car-img" src={require(`../../img/${car.img}`)} alt="" style={{filter: `sepia(${100-dmg}%)`}}/>
                </div>
                <div className='market__car-info'>
                    <span>Состояние: {car.damage}</span>
                    <span>Цена: {car.endPrice}</span>
                    <span>Пробег: {car.mileage}км</span>
                    <span className='link' onClick={sell}>Продать</span>
                    <span className='link' onClick={onRepair}>Починить</span>
                </div>
            </div>
            <div className='car__repair' ref={repairRef}>
                <span>{car.damage}</span>
                <img className="car__engine" src={require('../../img/engine.png')} alt="" ref={engineRef}
                onTouchStart={engineScale}
                // onMouseDown={engineScale}
                onMouseUp={engineUnScale} />
            </div>
        </div>
    );
}

export default GarageCar;