import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Dia from "./Dia";
import Footer from "./layout/Footer";
import Container from "./layout/Container";

function TelaSessoes() {
  const {filmeId} = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`;
    const promise = axios.get(URL);
    promise.then((response) => {
      const {data} = response;
      setFilme(data);
    });
    promise.catch(err => alert(err.response.statusText));
  },[]);

  function montarSessoesPorDia() {
    if(filme !== null) {
      return filme.days.map(dia => {
        const {weekday, date, showtimes, id} = dia;
        return <Dia key={id} dia={weekday} data={date} sessoes={showtimes} />
      });
    } 

    return <p>Carregando...</p>;
  }

  function montarFooter() {
    if(filme !== null) {
      const {posterURL, title} = filme;
      return (
        <>
          <img src={posterURL} alt={title} />
          <h1>{title}</h1>
        </>
      )
    }

    return <></>;
  }


  const sessoesPorDia = montarSessoesPorDia();
  const footer = montarFooter();
  return (
    <Container>
      <h1>Selecione o horário</h1>
      <Dias>{sessoesPorDia}</Dias>
      <Footer>{footer}</Footer>
    </Container>
  )
}

export default TelaSessoes;

const Dias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
