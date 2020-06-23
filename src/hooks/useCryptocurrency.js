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

const useCryptocurrency = ( label, initialState, options ) => {

    // console.log(options);
    // options.map( option => (
    //     console.log(option.CoinInfo.Id)
    // ));

    // State de nuestro custom hook
    const [ state, setState ] = useState(initialState);

    const SelectCrypto = () =>(
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => setState(e.target.value) }
                value={state}
            >
                <option value="">-- Seleccione una moneda --</option>
                {options.map( option => (
                    <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>{option.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    // Retornar State, intefaz y función que modifica el state
    return [ state, SelectCrypto, setState ];
}
 
export default useCryptocurrency;

