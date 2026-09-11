import React, { type ReactNode } from "react";
import button from "./button";
import TopBar from "./top_bar";
import "../index.css";
interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  children: ReactNode;
  image: string;
  button: string;
  id: number;
  searchGame: () => void;
  changedValue: () => void;
}

const Games = ({ title, children, image, button, id }: Props) => {
  return (
    <a href={`window.location.href = "/game?id=${id}"`} className="games_a">
      <div className="game-card">
        <img src={image} alt="" />
      </div>
      <div className="game-card-content">
        <h1>{title}</h1>
      </div>

      <div className="game-info">
        <p>{children}</p>
      </div>
    </a>
  );
};

export default Games;
