import React, { useState, Fragment } from 'react';

export default function Search(props) {
    const [query, setQuery] = useState("");
    return (
        <Fragment>
            <label>
                <input type="text" placeholder="Lägg till vara" onChange={e => setQuery(e.target.value)} value={query}/>
            </label>
            <button onClick={e => {
                props.addItem(query)
                setQuery("")
            }}>Lägg till</button>
        </Fragment>
    );
}