import React from "react";
import TopBar from "./components/top_bar";
import "./index.css";

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchGame: (value?: string) => void;
  changedValue: (value: string) => void;
}
const About = ({ query, setQuery, changedValue }: Props) => {
  return (
    <div>
      <TopBar
        query={query}
        setQuery={setQuery}
        changedValue={changedValue}
      ></TopBar>
      <p>
        Hello, my name is Gabriel Nunes, and I created this project to hone my
        React.js skills. In fact, this was the first React.js project I ever
        published. This is FORGAMES, a gaming site that allows you to search for
        various types of games across different genres and platforms. It was
        built using Vite, TypeScript, and React Router DOM (and is hosted on
        Vercel). Thank you very much for reading this.
      </p>
    </div>
  );
};

export default About;
