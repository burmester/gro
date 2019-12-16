import React from 'react';

export default function Item(props) {
    return (
        <td>
            <div className={props.isSelected ? "item selected" : "item"}>
                <button onClick={props.selectItem}>
                    <img src={props.image} alt={props.name} />
                    {props.isSelected && (<i class="material-icons">check_circle</i>)}
                </button>
                <div>
                    <h3>{props.name}</h3>
                    <div>{props.price} kr</div>
                </div>
            </div>
        </td>
    );
}