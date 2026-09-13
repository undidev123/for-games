import React, { type ReactNode } from "react";
import "../index.css";

interface Props {
  title: string;
  children: ReactNode;
  image: string;
  id: number;
}

const Games = ({ title, children, image, id }: Props) => {
  return (
    <a href={`/game?id=${id}`} className="games_a">
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
