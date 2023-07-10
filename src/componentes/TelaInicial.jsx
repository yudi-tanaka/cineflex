import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Filme from "./Filme";
import Container from "./layout/Container";

function TelaInicial() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";
    const promise = axios.get(URL);
    promise.then(({ data }) => setFilmes(data));
    promise.catch((err) => alert(err.response.statusText));
  }, []);

  function montarFilmesEmExibicao() {
    if (filmes.length > 0) {
      return filmes.map(({ posterURL, id }) => (
        <Filme key={id} id={id} poster={posterURL} />
      ));
    } else {
      return <p>Carregando filmes....</p>;
    }
  }

  const filmesEmExibicao = montarFilmesEmExibicao();
  return (
    <Container>
      <h1>Selecione o filme</h1>
      <Filmes>{filmesEmExibicao}</Filmes>
    </Container>
  );
}

const Filmes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default TelaInicial;
