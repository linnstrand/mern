import { useDispatch } from 'react-redux';
import { deleteData } from '../features/data/dataSlice';

function DataItem({ data }) {
  const dispatch = useDispatch();

  return (
    <div className="data">
      <div>{new Date(data.createdAt).toLocaleString('en-US')}</div>
      <h2>{data.text}</h2>
      <button onClick={() => dispatch(deleteData(data._id))} className="close">
        X
      </button>
    </div>
  );
}

export default DataItem;
