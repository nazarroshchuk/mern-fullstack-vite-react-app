import * as React from "react";

import type { UserType } from "../../types";
import Avatar from "../../shared/components/UI/Avatar";
import Card from "../../shared/components/UI/Card";

import {Link} from "react-router-dom";

interface UserItemProps {
    item: UserType
}
import './UserItem.css'

const UserItem: React.FC<UserItemProps> = ({
    item,
}) => {
    const { imageUrl, name, placeCount } = item;

    return <li className="user-item">
        <Card className="user-item__content">
            <Link to={`/${item.id}/places`}>
                <div className="user-item__image">
                    <Avatar image={imageUrl} alt={name} />
                </div>
                <div className="user-item__info">
                    <h2>{name}</h2>
                    <h3>{placeCount} {placeCount === 1 ? "Place" : "Places"}</h3>
                </div>
                <div className="user-item__hover-content">
                    <h2>
                        Card Component
                    </h2>
                    <p>This is a reusable card component.</p>
                </div>
            </Link>
        </Card>
    </li>;
}

export default UserItem;