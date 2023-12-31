import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../redux/store/store'
import Repair from '../Repair/Repair';
import Seller from '../Seller/Seller';

const GarageCar = ({ car, index }) => {
    const dispatch = useDispatch();
    const thisRef = useRef();
    const repairRef = useRef();
    const blackRef = useRef();
    const sellerRef = useRef();
    const dmg = useSelector(state => state.counter.garage[index].damage);
    const seller = useSelector(state => state.counter.seller);
    // const saleDuration = car.mileage / 5 + car.ratio * 100;
    function sell() {
        sellerRef.current.style.display = 'flex';
        dispatch(update({ name: 'seller', source: true }));

        // if (car.status) return;
        // dispatch(carStatus(index));
        // setTimeout(() => {
        //     dispatch(addExp(car.endPrice));
        //     dispatch(incrementMoney(car.endPrice));
        //     dispatch(sellCar(index));
        // }, saleDuration);
    }
    function onRepair() {
        if (car.damage >= 100) return;
        repairRef.current.style.display = 'flex';
        blackRef.current.style.display = 'block';
    }

    return (
        <div className='car__container car__container-garage'>
            {/* <div className="seller__container" ref={sellerRef} >
                <Seller car={car} />

            </div> */}

            <div className='garage__car-info'>
                <span>{car.name}</span>
                <span>Состояние: {car.damage}</span>
                <span>Цена: {car.endPrice}</span>
                <span>Пробег: {car.mileage}км</span>
                {/* <span style={car.status ? { color: `yellowgreen` } : { color: `red` }}>{car.status ? 'В продаже' : 'Не продается'}</span> */}
                {/* <span>{car.status ? `Время продажи: ${(saleDuration / 1000).toFixed(0)}сек` : ''}</span> */}
            </div>
            <div className="garage_car" ref={thisRef}>

                <div className='garage_car-title'>
                    {
                        seller === false ?
                            <div className='garage__car-buttons'>
                                <span className='link' onClick={sell}>Продать</span>
                                <span className='link' onClick={onRepair}>Починить</span>
                            </div>
                            :
                            ''
                    }

                </div>
                <img className="garage_car-img" src={require(`../../img/shadow.png`)} alt="" style={{ filter: `sepia(${100 - dmg}%)` }} />
                <img className="garage_car-img" src={require(`../../img/${car.img}`)} alt="" style={{ filter: `sepia(${100 - dmg}%)` }} />

            </div>
            <Seller sellerRef={sellerRef} car={car} />
            <Repair repairRef={repairRef} blackRef={blackRef} car={car} index={index} />
            <div className="black" ref={blackRef}></div>
        </div>
    );
}

export default GarageCar;