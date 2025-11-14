import { useEffect } from 'react';

import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import UsersList from '../components/UserComponents/UsersList';
import { useQueryHook } from '../hooks/useQueryHook';
import { QUERY_KEYS } from '../services/react-query';
import { userServices } from '../services/users.services';

const Users = () => {
  const { data, isFetching } = useQueryHook(
    [QUERY_KEYS.users],
    userServices.getUser,
    {
      refetchOnMount: 'always', // Ensures data is refetched on remount
    }
  );

  console.log('Users page rendered', data);

  useEffect(() => {
    console.log('Mounting Users component');

    return () => {
      console.log('Users component unmounted');
    };
  }, []);

  if (isFetching) {
    return (
      <Card>
        <LoadingSpinner asOverlay={true} />
      </Card>
    );
  }
  console.log('Users data:', data.users);

  return (
    <div>
      <UsersList items={data.users} />
    </div>
  );
};

export default Users;
