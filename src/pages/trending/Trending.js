import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Single from '../../Single/Single';
import "../../Single/single.css"
import '../../App.css';
import CustPagination from '../../components/pagination/CustPagination';

const Trending = () => {
   
  
  const [content,setcontent] = useState([]);
  const [numofpage,setnumofpage] = useState();
  
  const fetchtrend = async(page=1) =>{
    
   const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&page=${page}`);
   
   setcontent(data.results);
   console.log(content);
   
  }

  useEffect(() => {
    fetchtrend();
      
  }, [])
  
  return (
    <div className='pagetitle'>
      <div className='trend'>
        
        {
          content && content.map((c)=>(
            <Single key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title||c.name}
              date={c.first_air_date||c.release_date}
              media={c.media_type}
              vote={c.vote_average}
             
               /> 
              
          ))
          
        }
      </div>
        <CustPagination setpage={fetchtrend} numofpage={10}  />
        
        

    </div>
  )
}

export default Trending;