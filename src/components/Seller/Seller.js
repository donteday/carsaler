import './Seller.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { incrementMoney, sellCar, update, addExp } from '../../redux/store/store'



const Seller = ({ car, sellerRef }) => {
    const dispatch = useDispatch();
    const garage = useSelector(state => state.counter.garage);
    const priceRef = useRef('');
    const endPriceRef = useRef(garage[0].endPrice);
    const [carPrice, setCarPrice] = useState(0);
    const [count, setCount] = useState(0);


    const [sellerSpeech, setSellerSpeech] = useState(`Куплю за ${endPriceRef.current} P`);
    useEffect(() => {
        console.log(123);
        priceRef.current = carPrice;
    }, [carPrice]);

    useEffect(() => {
        endPriceRef.current = garage[0].endPrice;
        setSellerSpeech(`Куплю за ${endPriceRef.current} P`);
    }, [garage]);
    function roundThousend(amount) {
        if (amount > 1000000) return (amount / 1000000).toFixed(1) + 'м';
        if (amount > 1000) return (amount / 1000).toFixed(1) + 'т';
        return amount.toFixed(0) || amount;
    }

    function sell() {
        console.log(carPrice);
        // if (car.status) return;
        // // dispatch(carStatus(index));
        dispatch(addExp(carPrice || garage[0].endPrice));
        dispatch(incrementMoney(carPrice || garage[0].endPrice));
        dispatch(sellCar(0));
        dispatch(update({ name: 'seller', source: false }));

    }
    function bargaining() {
        if (count < 3) {
            setSellerSpeech('Нужно подумать');
            setCarPrice(garage[0].endPrice + Math.random() * garage[0].ratio * 100 / 2 - Math.random() * garage[0].ratio * 100 / 3);
            setCount(count + 1);
            setTimeout(() => {
                setSellerSpeech(`Возьму за ${roundThousend(priceRef.current)}`);

            }, 2000)
        } else {
            setSellerSpeech(`Последняя цена ${roundThousend(priceRef.current)}!`);
        }
    }
    return (<div className='seller' ref={sellerRef}>
        <div className="seller__speech">
            <span>{sellerSpeech}</span>

        </div>
        <div className="seller__speech-btn">
            <span className='link' onClick={sell}>продать</span>
            <span className='link' onClick={bargaining}>торговаться</span>
        </div>
        {/* <img className="seller__speech" src={require(`../../img/speech_bubble.png`)} alt=""/> */}
        <img className="seller__man" src={require(`../../img/seller_man.png`)} alt="" />

    </div>);
}

export default Seller;