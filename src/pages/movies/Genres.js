import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import useGenre from "../../hiiks/useGenre";
import _ from "lodash"
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const Genres = ({
  setgenres,
  genres,
  setselectedgenres,
  selectedgenres,
  setpage,
  type,
}) => {
  const fetchgenre = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&language=en-US"
    );
    // setgenres(data.genres);
    console.log(data);
    let selectedDefaultGenres = _.uniqBy([...selectedgenres,{id:28,name:"Action"}],"id")
    setselectedgenres(selectedDefaultGenres)
    return data.genres
    // setselectedgenres([...selectedgenres, ]);
    // let removedGenre = _.dele(_.cloneDeep(data.genres),{id:28})
    // setgenres(removedGenre)
    
    
  };
  useEffect(() => {
    fetchgenre().then((data)=>{
    let filteredGenres =   _.filter(data,(gen)=>gen.id!==28)
    setgenres(filteredGenres)
    })
  }, []);
  const genreforURL = useGenre(selectedgenres);

  const handleadd = (genre) => {
    setselectedgenres([...selectedgenres, genre]);
    setgenres(genres.filter((c) => c.id !== genre.id)); 
    setpage(1);
  };
  const handleremove =(genre)=>{
    setselectedgenres(selectedgenres.filter((c)=>(c.id !== genre.id)));
    setgenres([...genres,genre]);
   
  }

  return (
    <>
      {selectedgenres &&
        selectedgenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: "3px" }}
            clickable
            size="small"
            color="primary"
            onDelete={()=>handleremove(genre)}
            
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: "3px" }}
            clickable
            size="small"
            onClick={()=>handleadd(genre)}
          />
        ))}
    </>
  );
};

export default Genres;
