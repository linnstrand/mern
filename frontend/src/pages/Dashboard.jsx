import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataForm from '../components/DataForm';
import DataItem from '../components/DataItem';
import Spinner from '../components/Spinner';
import { getData, reset } from '../features/data/dataSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { data, status, message } = useSelector((state) => state.data);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getData());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (status === 'isError') {
      console.log(message);
    }
  }, [message, status]);

  if (status === 'isLoading') {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user?.name}</h1>
        <p>Data Dashboard</p>
      </section>
      <DataForm />
      <section className="content">
        {data.length > 0 ? (
          <div className="data">
            {data.map((d) => (
              <DataItem key={d._id} data={d} />
            ))}
          </div>
        ) : (
          <h3>You have not set any data</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
