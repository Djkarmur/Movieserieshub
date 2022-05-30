import axios from "axios";
import React, { useState, useEffect } from "react";
import CustPagination from "../../components/pagination/CustPagination";
import Single from "../../Single/Single";
import Tvgenres from "../movies/Tvgenres";
import usetvgenre from "../../hiiks/usetvgenre";

const Tvseries = () => {
  const [content, setcontent] = useState([]);
  const [page, setpage] = useState(1);
  const [numofpage,setnumofpage]=useState();
  const [genres, setgenres] = useState([]);
  const [selectedgenres, setselectedgenres] = useState([]);
  const genreforURL =usetvgenre(selectedgenres);
   
  const fetchSeries = async () => {
    // with_genres=${'28'}&
   let url =`https://api.themoviedb.org/3/discover/tv?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=${genreforURL}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
   console.log({url})
    const { data } = await axios.get(
      url
    );
    setcontent(data.results);
    setnumofpage(data.total_pages);
    
    
  };

  useEffect(() => {
    fetchSeries();
    window.scroll(0,0);
  }, [page,genreforURL]);

  return (
    <>
      <div className="pagetitle">
        <Tvgenres
          setgenres={setgenres}
          genres={genres}
          setselectedgenres={setselectedgenres}
          selectedgenres={selectedgenres}
          setpage={setpage}
          type="Tvseries"
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
                media="tv"
                vote={c.vote_average}
              />
            ))}
        </div>
        <CustPagination setpage={setpage} numofpage={numofpage}/>
      </div>
    </>
  );
};

export default Tvseries;
