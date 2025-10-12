import PlaceList from '../components/PlaceComponents/PlaceList';
import { useParams } from 'react-router';
import { DUMMY_PLACES } from '../constants/dummy-data';

const UserPlaces = () => {
  const params = useParams();

  return (
    <PlaceList items={DUMMY_PLACES.filter(item => item.id === params.userId)} />
  );
};

export default UserPlaces;
