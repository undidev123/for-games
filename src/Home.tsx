import Games from "./components/games";
import TopBar from "./components/top_bar";
import "./Top_bar.css";
import "./game.css";

interface Game {
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

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredGames: Game[];
  searchGame: (value?: string) => void;
  changedValue: (value: string) => void;
}

const Home = ({ query, setQuery, filteredGames, changedValue }: Props) => {
  return (
    <>
      <TopBar query={query} setQuery={setQuery} changedValue={changedValue} />

      <div className="games-grid">
        {filteredGames.map((game) => (
          <Games
            title={game.name}
            image={game.background_image}
            id={game.id}
            key={game.id}
          >
            Developer: {game.developers?.[0]?.name}
            <br />
            Platforms:{" "}
            {game.platforms?.map((item) => item.platform.name).join(", ")}
            <br />
            Released: {game.released} | Score: {game.metacritic}
          </Games>
        ))}
      </div>

      {filteredGames.length === 0 && query !== "" && <p>Loading...</p>}
    </>
  );
};

export default Home;
