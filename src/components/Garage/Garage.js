import { useSelector } from 'react-redux'
import GarageCar from '../GarageCar/GarageCar';


const Garage = () => {
    const garage = useSelector(state => state.counter.garage);

    return (<>
    Гараж
        {garage.map((e, index) =>
            <GarageCar
                car={e}
                key={index}
                index={index} />)}
    </>);
}

export default Garage;