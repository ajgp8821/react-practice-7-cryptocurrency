import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import imagen from './cryptocurrency.png';
import Form from './components/Form';
import Quotation from './components/Quotation';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [ coin, setCoin ] = useState('');
  const [ cryptocurrency, setCryptocurrency ] = useState('');
  const [ result, setResult ] = useState({});
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {

    const quoteCryptocurrency = async () => {
      
      // Evitamos la ejecución la primera vez
      if (coin === '') return;

      // Consultar la API para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coin}`;

      const result = await axios.get(url);

      // Mostrar el spinner
      setLoading(true);

      // ocultar el spinner
      setTimeout(() => {

        // Cambiar el estado de loading
        setLoading(false);
        // Guardar cotización
        setResult(result.data.DISPLAY[cryptocurrency][coin]);
      }, 3000)
    };
    quoteCryptocurrency();
  }, [coin, cryptocurrency]);

  // Mostrar spinner o resultado
  const component = (loading) ? <Spinner />: <Quotation result={result} />;

  return (
    <Container>
      <div>
        <Image
          src={imagen}
          alt="Image Crypto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form 
          setCoin={setCoin}
          setCryptocurrency={setCryptocurrency}
        />
        {component}
      </div>
    </Container>
  );
}

export default App;
