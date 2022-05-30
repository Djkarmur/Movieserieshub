import React from 'react'
import Modalcontent from '../components/modal/Modal';

import { img_300, unavailable } from '../config/Config';
import Badge from '@material-ui/core/Badge';

import './single.css';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  customBadge: {
    backgroundColor: "#00AFD7",
    color: "white"
  }
});
const Single = ({
    id,title,poster,date,media,vote
}) => {
  
  return (
    <Modalcontent id={id} media={media} > 
        <Badge badgeContent={vote} color={vote > 6 ? "primary": "secondary"}>
        </Badge>
        <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} />
        <b className='title'>{title}</b>
        <div className='major'>
        <span className='subtitle'>{ media==="tv" ?  "TV Series" : 'Movie'}</span>
        <span className='subtitle'>{date}</span>
        </div>
    </Modalcontent>
  )
}

export default Single