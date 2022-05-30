import React, { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {  Button, createTheme, Paper, Tab, Tabs } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Single from '../../Single/Single';
import CustPagination from '../../components/pagination/CustPagination';


const Search = () => {
  const [type,settype] = useState(0);
  const [page,setpage] = useState(1);
  const [numofpage,setnumofpage] =useState();
  const [searchtext,setsearchtext]=useState('');
  const [content,setcontent]=useState([]);
  const darktheme = createTheme({
    palette:{
      type:"dark",
      primary:{
        main:"#fff",
      }
    }
  })
  
  const fetchsearch = async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&language=en-US&query=${searchtext}&page=${page}&include_adult=false`);
     
     setcontent(data.results);
     setnumofpage(data.total_pages);
  }
  
  useEffect(() => {
    window.scroll(0,0);
    fetchsearch();
    
  }, [page,type])
  
  return (
    <>

    <ThemeProvider theme={darktheme}>
    <div style={{display:"flex",width:"100%"}}>
      
       <TextField id="filled-basic" label="Search" variant="filled" style={{flex:1}} onChange={(e) =>(setsearchtext(e.target.value))} />
       <Button variant='contained' style={{marginLeft:'10px' }} onClick={fetchsearch} > <SearchIcon/> </Button>
      
    </div>
    
    
      <Tabs
        value={type}
         onChange={(e,newval)=>(
          settype(newval),
           setpage(1)
         )}
        indicatorColor="primary"
        textColor="primary"
        centered
        style={{marginTop:'20px'}}
      >
        <Tab style={{width:'50%'}} label="Search Movies" />
        <Tab  style={{width:'50%'}} label="Search TV Series" />
        
      </Tabs>
      </ThemeProvider>
      
      <div className='pagetitle'>
      <div className='trend'>
        
        {
          content && content.map((c)=>(
            <Single key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title||c.name}
              date={c.first_air_date||c.release_date}
              media={type ? "tv":'movie'}
              vote={c.vote_average}
               /> 
          ))
        }
        
        {
             content.length==0 &&( type? <h2>{searchtext? `No Series Found` :"Search Your Favourite Series"}</h2> : <h2>{searchtext?` No movies Found`:'Search Your Favourite Movies'}</h2>)
        }
      </div>
        <CustPagination numofpage={numofpage}  setpage={setpage} />
      </div>
    </>
  )
}

export default Search


function NoContent(type){
  return 
}