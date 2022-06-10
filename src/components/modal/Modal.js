import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable } from '../../config/Config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './modal.css';
import Carousel from '../Carousel';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
   
  },
}));

export default function Modalcontent({children,media,id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content,setcontent] =useState();
  const [video,setvideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchmodal = async() =>{
      const {data} = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&language=en-US`) 
      setcontent(data);
  }

  const fetchvideo = async() =>{
      const {data} =  await axios.get(`https://api.themoviedb.org/3/${media}/${id}/videos?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&language=en-US`)
      setvideo(data.results[0]?.key);
  }
const [loading,setLoading]=useState(false)
  useEffect(() => {
    if(open){
      (async()=>{
        try {
          setLoading(true)
        
      await   fetchmodal();

       await  fetchvideo()
      } catch (error) {
          
      }finally{
        setLoading(false)
      }
      })()
      ;}
  }, [open])
  
   if(loading){
     return <div> Loading...</div>
   }
  return (
    <div>
      <div type="button" onClick={handleOpen} className='media'>
       {children} 
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }} 
      >
        <Fade in={open}>
          { content && ( 
          <div className={classes.paper}>
             <div className='modal'>
                  <img
                  alt={ content.name || content.title}
                  className="content_por"
                  src={
                    `${content.poster_path} `? `${img_500}${content.poster_path} `: unavailable
                  }
                  />

                 <img
                  alt={ content.name || content.title}
                  className="content_land"
                  src={
                    `${content.backdrop_path} `? `${img_500}${content.backdrop_path} `: unavailable
                  }
                  />
                  <div className='contentabout'>
                    <span className='content_title'>
                      {content.name || content.title}(
                        {
                          (content.first_air_date || content.release_date || "___"
                        ).substring(0,4)}
                      )
                    </span>
                    {
                      content.tagline && (
                        <i className='tagline'>{content.tagline}</i>
                      )
                    }
                    <span className='content_dis'>
                      {content.overview}
                    </span>
                    <div>
                      <Carousel media={media} id={id}/>
                    </div>
                    <Button
                     variant='contained'
                     startIcon={<YouTubeIcon/>}
                     color="secondary"
                     target="_blank"
                     href={`https://www.youtube.com/watch?v=${video}`} >
                       Watch the Trailer
                     </Button>
                  </div>
             </div>
           
          </div> )}
        </Fade>
      </Modal>
    </div>
  );
}
