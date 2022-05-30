import axios from "axios";
import React, { useState, useEffect } from "react";
import CustPagination from "../../components/pagination/CustPagination";
import Single from "../../Single/Single";
import Genres from "./Genres";
import useGenre from "../../hiiks/useGenre";

const Movies = () => {
  const [content, setcontent] = useState([]);
  const [page, setpage] = useState(1);
  const [genres, setgenres] = useState([]);
  const [selectedgenres, setselectedgenres] = useState([]);
  const [numofpage,setnumofpage]=useState();
  const genreforURL = useGenre(selectedgenres);

  const fetchmovie = async () => {
    const { data } = await axios.get(
     ` https://api.themoviedb.org/3/discover/movie?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_monetization_types=flatrate`
    );
    console.log(data)
    setcontent(data.results);
    setnumofpage(data.total_pages);
  };

  useEffect(() => {
    fetchmovie();
    window.scroll(0,0);
  }, [page,genreforURL]);

  return (
    <>
      <div className="pagetitle">
        <Genres
          setgenres={setgenres}
          genres={genres}
          setselectedgenres={setselectedgenres}
          selectedgenres={selectedgenres}
          setpage={setpage}
          type="movie"
        />
        <div className="trend">
          {content &&
            content.map((c) => (
              <Single
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media={"movie"}
                vote={c.vote_average}
              />
            ))}
        </div>
        <CustPagination setpage={setpage} numofpage={numofpage} />
      </div>
    </>
  );
};

export default Movies;
