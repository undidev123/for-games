import { useEffect, useState } from "react";
import "./index.css";
import TopBar from "./components/top_bar";

interface GameData {
  id: number;
  name: string;
  background_image: string;
  released: string;
  metacritic: number | null;
  description_raw: string;

  developers: {
    id: number;
    name: string;
  }[];

  ratings: {
    id: number;
    title: string;
    percent: number;
  }[];

  platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
}

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchGame: (value?: string) => void;
  htmlToText: (html: string) => string;
  changedValue: (value: string) => void;
}

const Game = ({ query, setQuery, searchGame, changedValue }: Props) => {
  const [data, setData] = useState<GameData | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_API_KEY}`,
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
      />

      <div className="game-page">
        <div className="game-header">
          <img
            src={data.background_image}
            alt={data.name}
            className="game-image"
          />

          <div className="game-info">
            <h1>{data.name}</h1>

            <p>Developer: {data.developers[0]?.name}</p>

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
                <p key={platform.platform.id}>{platform.platform.name}</p>
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
