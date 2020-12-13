import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import {
  DropdownButton,
  InputGroup,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

const SearchBar: React.FC = () => {
  const history = useHistory();
  const pathname = useLocation().pathname;
  const search = useLocation().search;
  const searchObj = new URLSearchParams(search);
  const q = searchObj.get("q");
  const [searchType, setSearchType] = useState<string>("album");
  const [inputVal, setInputVal] = useState<string>("");

  const clickHandler = (event: React.MouseEvent) => {
    const search = event.currentTarget.textContent;

    if (search === searchType) return;

    if (search !== null) {
      setSearchType(search);
      if (inputVal !== "") {
        history.push(
          `/search/${encodeURIComponent(search)}?q=${encodeURIComponent(
            inputVal
          )}&p=1`
        );
      }
    }
  };

  const searchHandler = () => {
    if (inputVal === "") return;

    history.push(
      `/search/${encodeURIComponent(searchType)}?q=${encodeURIComponent(
        inputVal
      )}&p=1`
    );
  };

  useEffect(() => {
    const typeMatch = pathname.match(/\/search\/([a-z]+)/);
    let type: string;
    if (typeMatch === null) {
      type = "album";
    } else {
      type = typeMatch[1];
    }

    if (q !== null) {
      setInputVal(q);
    }

    setSearchType(type);
  }, [pathname, search, q]);

  return (
    <>
      <InputGroup className="mb-3 search-bar">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="secondary"
          title={searchType}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item
            href="#"
            onClick={clickHandler}
            className="search-dropdown-item"
          >
            album
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            onClick={clickHandler}
            className="search-dropdown-item"
          >
            artist
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            onClick={clickHandler}
            className="search-dropdown-item"
          >
            playlist
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            onClick={clickHandler}
            className="search-dropdown-item"
          >
            track
          </Dropdown.Item>
        </DropdownButton>
        <FormControl
          aria-describedby="basic-addon1"
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              searchHandler();
            }
          }}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={searchHandler}
            className="search-button"
          >
            <ImSearch />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default SearchBar;
