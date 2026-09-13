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
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setOriginalData(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredGames = data.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase()),
  );

  async function searchGame(value = query) {
    const res = await fetch(`/api/games?search=${encodeURIComponent(value)}`);

    const data = await res.json();

    setData(data.results);
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
          filteredGames={filteredGames}
          searchGame={searchGame}
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
