import { useEffect, useState } from "react";
import "./index.css";
import TopBar from "./components/top_bar";

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchGame: () => void;
  htmlToText: (html: string) => string;
  changedValue: () => void;
}

const Game = ({ query, setQuery, searchGame, changedValue }: Props) => {
  const [data, setData] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://api.rawg.io/api/games/${id}?key=14c2af2cd0d944cb83de6bbb922fcdb8`,
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [id]);

  if (!data) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <TopBar
        query={query}
        setQuery={setQuery}
        searchGame={searchGame}
        changedValue={changedValue}
      ></TopBar>
      <div className="game-page">
        <div className="game-header">
          <img
            src={data.background_image}
            alt={data.name}
            className="game-image"
          />

          <div className="game-info">
            <h1>{data.name}</h1>
            <p>Developer: {data.developers[0].name}</p>
            <p>
              Score: {data.metacritic ? data.metacritic : "It wasn't rated."}
            </p>
            <p>Release date: {data.released}</p>
            <div className="ratings">
              {data.ratings.map((rating) => (
                <p key={rating.id}>
                  {rating.title}: {rating.percent}%
                </p>
              ))}
            </div>
            <div className="ratings">
              <p>Plataformas:</p>
              {data.platforms.map((platform) => (
                <p key={platform.id}>{platform.platform.name} </p>
              ))}
            </div>
          </div>
        </div>

        <div className="game-description">
          <h2>Descrição</h2>
          <p>{data.description_raw}</p>
        </div>
      </div>
    </>
  );
};

export default Game;
