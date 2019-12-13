import React, { useState } from 'react';

export default function Item(props) {
    const [query, setQuery] = useState("");

    return (
        <td>
            <div className="item">
                <img src={props.image} alt={props.name} />
                <div>
                    <h3>{props.name}</h3>
                    <div>{props.price} kr</div>
                </div>
            </div>
        </td>
    );
}