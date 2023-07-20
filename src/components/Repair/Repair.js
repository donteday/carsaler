import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { carRepair, addExp, update, incrementMoney } from '../../redux/store/store'
import './Repair.css'


const Repair = ({ repairRef, blackRef, car, index }) => {
    const dispatch = useDispatch();
    const engineRef = useRef();
    const dmg = useSelector(state => state.counter.garage[index].damage);
    const repairRatio = useSelector(state => state.counter.repair);
    const money = useSelector(state => state.counter.money);
    const improveRepairPrice = repairRatio * 50000;

    function offRepair() {
        repairRef.current.style.display = 'none';
        blackRef.current.style.display = 'none';
    }
    function engineScale() {
        if (car.damage >= 99) {
            repairRef.current.style.display = 'none';
            blackRef.current.style.display = 'none';
        }
        dispatch(addExp(repairRatio * 500));
        dispatch(carRepair(index));
    }
    function engineScaleAnimation() {
        engineRef.current.style.transform = 'scale(1.05)';
    }
    function engineUnScale() {
        engineRef.current.style.transform = 'scale(1)'
    }
    function improveRepair() {
        if (money < improveRepairPrice + 15000) return;
        dispatch(update({ name: 'repair', source: repairRatio + 1 }));
        dispatch(incrementMoney(- improveRepairPrice));
    }

    return (
        <div className='car__repair' ref={repairRef}>
            <span className='car__repair-close' onClick={offRepair}>X</span>
            <img className="car__lift" src={require(`../../img/lift_1.png`)} alt="" />
            <img className="car__repair-c" src={require(`../../img/${car.img}`)} alt="" style={{ filter: `sepia(${100 - dmg}%)` }} />
            <img className="car__lift" src={require(`../../img/lift_2.png`)} alt="" />
            <div className='car__repair-bar'>
                <span>{car.damage}</span>
                <img className="car__repair-icon" src={require('../../img/key.png')} alt="" ref={engineRef}
                    onClick={engineScale}
                    onTouchStart={engineScaleAnimation}
                    onMouseDown={engineScaleAnimation}
                    onMouseUp={engineUnScale} />
            </div>
            <span className='link repair__button' onClick={improveRepair}>Улучшить инcтрумент за {improveRepairPrice}</span>
        </div>
    );
}

export default Repair;