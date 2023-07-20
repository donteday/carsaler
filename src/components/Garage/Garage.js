import { useSelector } from 'react-redux'
// import { update, incrementMoney } from '../../redux/store/store'
import GarageCar from '../GarageCar/GarageCar';
import './Garage.css'


const Garage = () => {
    // const dispatch = useDispatch();
    const garage = useSelector(state => state.counter.garage);
    // const money = useSelector(state => state.counter.money);
    const garageSpaces = useSelector(state => state.counter.garageSpaces);
    // const placePrice = garageSpaces.length * garageSpaces.length * 100000;   

    // function buyGaragePlace() {
    //     if ((money - placePrice) <= 7000) return;
    //     dispatch(incrementMoney(-placePrice));
    //     dispatch(update({ name: 'garageSpaces', source: [...garageSpaces, garageSpaces.length] }))
    // }

    return (<>
        Гараж
        {garage?.map((e, index) =>
            <GarageCar
                car={e}
                key={index}
                index={index} />)}
        {garageSpaces.map((e, index) =>
            index < garageSpaces.length - garage?.length
                ? <div className='garage__place' key={index}>
                    <span className='empty'>Пусто</span>
                </div>
                : ''
        )}
        {/* <div className='garage__place'>
            <span className="link" onClick={buyGaragePlace}>Купить место {placePrice}</span>
        </div> */}
    </>);
}

export default Garage;