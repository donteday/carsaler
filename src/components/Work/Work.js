import './Work.css';
import { useSelector } from 'react-redux'
import WorkItem from './WorkItem/WorkItem';

const Work = () => {
    const workArr = useSelector(state => state.counter.work);


    return (
        <div className="work__container">
            {workArr.map((e, index) =><WorkItem item={e} index={index} key={index}/>
            )}
        </div>
     );
}

export default Work;