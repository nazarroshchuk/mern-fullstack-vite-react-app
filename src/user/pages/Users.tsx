import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        { id: 'u1', name: 'Alice Johnson', placeCount: 3 },
                { id: 'u2', name: 'Bob Smith', placeCount: 1 },
    { id: 'u3', name: 'Charlie Brown', placeCount: 0 },
    { id: 'u4', name: 'Diana Prince', placeCount: 2 },
    { id: 'u5', name: 'Ethan Hunt', placeCount: 5 },]
    return <div>
        <UsersList items={USERS}/>
    </div>;
}

export default Users;