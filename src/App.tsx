import "./App.css";
import Home from "./Home";
import Game from "./Game";
import "./game.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./About";

interface GameData {
  id: number;
  name: string;
  background_image: string;
  released: string;
  metacritic: number | null;
  description: string;

  developers: {
    id: number;
    name: string;
  }[];

  platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
}

const urlParams = new URLSearchParams(window.location.search);
const search_info = urlParams.get("search");

const API_KEY = import.meta.env.VITE_API_KEY;

function htmlToText(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
}

function App() {
  const [originalData, setOriginalData] = useState<GameData[]>([]);
  const [data, setData] = useState<GameData[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`)
      .then((res) => res.json())
      .then(async (data) => {
        const games = await Promise.all(
          data.results.map(async (game: GameData) => {
            const res = await fetch(
              `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`,
            );

            const details = await res.json();

            return {
              ...game,
              description: details.description,
              developers: details.developers,
              platforms: details.platforms,
            };
          }),
        );

        setData(games);
        setOriginalData(games);
      });
  }, []);

  const filteredGames = data.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase()),
  );

  async function searchGame(value = query) {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}&page_size=20`,
    );

    const data = await res.json();

    const games = await Promise.all(
      data.results.map(async (game: GameData) => {
        const res = await fetch(
          `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`,
        );

        const details = await res.json();

        return {
          ...game,
          description: details.description,
          developers: details.developers,
          platforms: details.platforms,
        };
      }),
    );

    setData(games);
  }

  function changedValue(value: string) {
    console.log("valor:", value);

    if (value.length >= 4) {
      searchGame(value);
    } else if (value === "") {
      setData(originalData);
    }
  }

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (window.location.pathname === "/game") {
          const params = new URLSearchParams();

          params.set("search", query);

          window.location.href = `/?${params.toString()}`;
        }
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [query]);

  useEffect(() => {
    if (window.location.pathname === "/" && search_info != null) {
      setQuery(search_info);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          query={query}
          setQuery={setQuery}
          data={data}
          filteredGames={filteredGames}
          searchGame={searchGame}
          htmlToText={htmlToText}
          changedValue={changedValue}
        />
      ),
    },
    {
      path: "/game",
      element: (
        <Game
          query={query}
          setQuery={setQuery}
          searchGame={searchGame}
          htmlToText={htmlToText}
          changedValue={changedValue}
        />
      ),
    },
    {
      path: "/about",
      element: (
        <About
          query={query}
          setQuery={setQuery}
          searchGame={searchGame}
          changedValue={changedValue}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
