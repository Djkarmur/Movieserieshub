import axios from "axios";
import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useEffect } from "react";
import { noPicture, img_300 } from "../config/Config";
import "./carousel.css";
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media, id }) => {
  const [carouse, setcarouse] = useState([]);
  const items = carouse.map((c) => (
    <div className="carouselitem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        className="carouseimage"
        alt="jh"
        onDragStart={handleDragStart}
      />
      <strong className="carousetext">{c?.name}</strong>
    
    </div>
  ));
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  const fetchcarousel = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=d383eb3c30b1a01f8a1c2a47ca1c4286&language=en-US`
    );
    console.log(data);
    const dataArray = [];
    // data.cast.map(ele=>{
    //     dataArray.push(ele.profile_path)
    // })
    setcarouse(data.cast);
  };
  useEffect(() => {
    fetchcarousel();
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      responsive={responsive}
      infinite
      disableButtonsControls
      disableDotsControls
      autoPlay={true}
      items={items}
    />
  );
};

export default Carousel;
