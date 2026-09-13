interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  changedValue: (value: string) => void;
}

const TopBar = ({ query, setQuery, changedValue }: Props) => {
  return (
    <nav>
      <div className="logo">
        <a href="../">FORGAMES</a>
      </div>

      <ul className="nav-links">
        <li>
          <a href="../">Home</a>
          <a href="../About">About</a>
        </li>
      </ul>

      <input
        value={query}
        type="search"
        onChange={(e) => {
          setQuery(e.target.value);
          changedValue(e.target.value);
        }}
        className="search"
        placeholder="Search Games..."
      />
    </nav>
  );
};

export default TopBar;
