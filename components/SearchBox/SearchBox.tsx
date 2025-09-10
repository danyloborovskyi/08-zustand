import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (newSearch: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearch}
    />
  );
}
