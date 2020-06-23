import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const DivResult = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;

const Price = styled.p`
    font-size: 30px;

    span {
        font-weight: bold;
    }
`;

const Quotation = ({ result }) => {
    if (Object.keys(result).length === 0) return null;

    console.log(result);

    return (
        <DivResult>
            <Price>El precio es: <span>{result.PRICE}</span> </Price>
            <Info>Precio más alto del día: <span>{result.HIGHDAY}</span> </Info>
            <Info>Precio más bajo del día: <span>{result.LOWDAY}</span> </Info>
            <Info>Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span> </Info>
            <Info>Última actualización: <span>{result.LASTUPDATE}</span> </Info>
        </DivResult>
    );
}

Quotation.propTypes = {
    result: PropTypes.object.isRequired,
}
 
export default Quotation;
