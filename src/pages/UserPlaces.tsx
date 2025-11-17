import { useParams } from 'react-router';

import PlaceList from '../components/PlaceComponents/PlaceList';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useQueryHook } from '../hooks/useQueryHook';
import { placeServices } from '../services/place-services';
import { QUERY_KEYS } from '../services/react-query';

const UserPlaces = () => {
  const params = useParams();
  const { data, isFetching } = useQueryHook(
    [QUERY_KEYS.places, `${params.userId!}`],
    () => placeServices.getPlaceByUserId(params.userId!),
    {
      refetchOnMount: 'always', // Ensures data is refetched on remount
    }
  );

  if (isFetching) {
    return (
      <Card>
        <LoadingSpinner asOverlay />
      </Card>
    );
  }

  return <PlaceList items={data.places} userId={params.userId} />;
};

export default UserPlaces;
