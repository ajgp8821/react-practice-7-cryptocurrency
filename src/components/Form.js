import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import useCoin from '../hooks/useCoin';
import useCryptocurrency from '../hooks/useCryptocurrency';
import Error from './Error';

const Button = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Form = ({ setCoin, setCryptocurrency }) => {

    // State del listado de Cirptomonedas
    const [ cryptoList, setCryptoList] = useState([]);
    const [ error, setError ] = useState(false);

    const COINS = [
        { code: 'USD', name: 'Dollar USD' },
        { code: 'MXN', name: 'Peso Mexicano' },
        { code: 'ARS', name: 'Peso Argentino' },
        { code: 'VES', name: 'Bolívar Venezolano' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'Libra Esterlina' },
    ]

    // Utilizar useCoin
    const [ coin, SelectCoin ] = useCoin('Elige tu moneda', '', COINS);

    // Utilizar useCryptocurrency
    const [ cryptocurrency, SelectCrypto ] = useCryptocurrency('Elige tu criptomoneda', '', cryptoList);

    // Ejecutar llamado a la API
    useEffect(() => {
        const getApi = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const result = await axios.get(url);
            setCryptoList(result.data.Data);
        };
        getApi();
    }, []);

    // Cuando el usuario hace submit
    const quoteCurrency = e => {
        e.preventDefault();

        // Valida si ambos campos estan llenos
        if (coin === '' || cryptocurrency === ''){
            setError(true);
            return;
        }
        setError(false);

        // Pasar los datos al componente principal
        setCoin(coin);
        setCryptocurrency(cryptocurrency);
    }

    return (
        <form
            onSubmit={quoteCurrency}
        >
            {error ? <Error message="Todos los cambios son obligatorios" />: null}
            <SelectCoin />
            <SelectCrypto />
            <Button
                type="submit"
                value="Calcular"
            >Calcular</Button>
            
        </form>
    );
}

Form.propTypes = {
    setCoin: PropTypes.func.isRequired,
    setCryptocurrency: PropTypes.func.isRequired,
}
 
export default Form;
