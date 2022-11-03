import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Search.scss";

const Search = () => {
  return (
    <form className="search-container" action="//llamaswill.tumblr.com/search">
      <input id="search-box" type="text" className="search-box" name="q" />
      <label for="search-box">
        <span className="glyphicon glyphicon-search search-icon">
          <AiOutlineSearch   />
        </span>
      </label>
      <input type="submit" id="search-submit" />
    </form>
  );
};

export default Search;
