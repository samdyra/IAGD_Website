/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import style from "../styles/parallax.module.css";

const Header = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  window.addEventListener("mousemove", (e) => {
    return setOffsetY(e.clientY);
  });

  window.addEventListener("mousemove", (e) => {
    return setOffsetX(e.clientX);
  });

  const {
    headerWrapper,
    headerDesc,
    parallaxWrapper,
    headerContainer,
    laxImageOne,
    laxImageTwo,
    laxImageThree,
    laxImageFour,
    laxImageFive,
    laxImageSix,
  } = style;

  return (
    <div className={headerWrapper}>
      <div className={headerContainer}>
        <div className={headerDesc}>
          GD3206 Field Camp is part of Geodesy and Geomatics Engineering
          curriculum for third year students. This course provides an
          opportunity for students to implement skills that theyve acquired
          throughout the years, especially on geodesy and geomatics engineering.
        </div>
      </div>
      <div className={parallaxWrapper}>
        <img
          className={laxImageOne}
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          style={{
            transform: `translateX(-${offsetX * 0.01}px) translateY(-${
              offsetY * 0.01
            }px)`,
          }}
        ></img>
        <img
          className={laxImageTwo}
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          style={{
            transform: `translateX(-${offsetX * 0.018}px) translateY(-${
              offsetY * 0.018
            }px)`,
          }}
        ></img>
        <img
          className={laxImageThree}
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          style={{
            transform: `translateX(-${offsetX * 0.024}px) translateY(-${
              offsetY * 0.024
            }px)`,
          }}
        ></img>
        <img
          className={laxImageFour}
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          style={{
            transform: `translateX(${offsetX * 0.01}px) translateY(${
              offsetY * 0.01
            }px)`,
          }}
        ></img>
        <img
          className={laxImageFive}
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          style={{
            transform: `translateX(-${offsetX * 0.02}px) translateY(-${
              offsetY * 0.02
            }px)`,
          }}
        ></img>
        <img
          className={laxImageSix}
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          style={{
            transform: `translateX(${offsetX * 0.015}px) translateY( ${
              offsetY * 0.015
            }px)`,
          }}
        ></img>
      </div>
    </div>
  );
};

export default Header;
