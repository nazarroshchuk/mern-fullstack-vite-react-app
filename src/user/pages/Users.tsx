import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        { id: '1', name: 'Alice Johnson', placeCount: 3 },
                { id: '2', name: 'Bob Smith', placeCount: 1 },
    { id: '3', name: 'Charlie Brown', placeCount: 0 },
    { id: '4', name: 'Diana Prince', placeCount: 2 },
    { id: '5', name: 'Ethan Hunt', placeCount: 5 },]
    return <div>
        <UsersList items={USERS}/>
    </div>;
}

export default Users;