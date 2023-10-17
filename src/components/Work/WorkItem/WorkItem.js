import './WorkItem.css';
import { useSelector, useDispatch } from 'react-redux'
import { workUp, incrementMoney } from '../../../redux/store/store'


const WorkItem = ({ item, index }) => {
    let itemPrice = Math.pow((item.amount + 1), 2) * Math.pow(10, (index + 1))
    const dispatch = useDispatch();
    const money = useSelector(state => state.counter.money);
    const lvl = useSelector(state => state.counter.lvl);

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
        <div >
            {index <= lvl - 1 ?
                <div className="work-item__container">
                    <div className=''>
                        <img className="work-item__img" src={require(`../../../img/work${index}.png`)} alt="" />

                    </div>
                    <div className='work-item__info'>
                        {item.name}
                        <div>{roundThousend(Math.pow(item.amount, (index + 1)) * (index + 1))}/сек</div>
                    </div>
                    <div className='link' onClick={workItemHendler}>
                        + {roundThousend(itemPrice)}
                    </div>
                </div>
                :
                <div className="work-item__container">{index+1} уровень</div>
            }

        </div>


    );
}

export default WorkItem;