import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCoin = ( label, initialState, options ) => {

    // State de nuestro custom hook
    const [ state, setState ] = useState(initialState);

    const SelectCoin = () =>(
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => setState(e.target.value) }
                value={state}
            >
                <option value="">-- Seleccione una moneda --</option>
                {options.map( option => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                ))}
            </Select>
        </Fragment>
    );

    // Retornar State, intefaz y función que modifica el state
    return [ state, SelectCoin, setState ];
}
 
export default useCoin;
