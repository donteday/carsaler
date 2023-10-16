import './WorkItem.css';
import { useSelector, useDispatch } from 'react-redux'
import { workUp, incrementMoney } from '../../../redux/store/store'


const WorkItem = ({ item, index }) => {
    let itemPrice = Math.pow((item.amount + 1),2)*(index+1)*100
    const dispatch = useDispatch();
    const money = useSelector(state => state.counter.money);
    function workItemHendler() {
        if (money - itemPrice < 0) return;
        dispatch(workUp({ 'index': index, 'amount': 1 }))
        dispatch(incrementMoney(-itemPrice))
    }
    function roundThousend(amount) {
        if (amount > 1000000) return (amount / 1000000).toFixed(1) + 'м';
        if (amount > 1000) return (amount / 1000).toFixed(1) + 'т';
        return amount.toFixed(0);
    }
    return (
        <div className="work-item__container">
            <div className='work-item__img'>

            </div>
            <div className='work-item__info'>
                {item.name}
                <div>{Math.pow(item.amount,(index+1))*(index+1)}</div>
            </div>
            <div className='link' onClick={workItemHendler}>
                качать {roundThousend(itemPrice)}
            </div>
        </div>
    );
}

export default WorkItem;