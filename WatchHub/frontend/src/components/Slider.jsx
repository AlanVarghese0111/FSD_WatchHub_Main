import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
// import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.direction === 'left' ? '10px' : 'unset')};
  right: ${props => (props.direction === 'right' ? '10px' : 'unset')};
  margin: auto;
  cursor: pointer;
  z-index: 2;
  opacity: 0.5;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 0.5s ease;
  z-index: 1;
`;

const Slide = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = 4;
//   const navigate = useNavigate();

  const handleArrowClick = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : totalSlides - 1);
    } else {
      setSlideIndex(slideIndex < totalSlides - 1 ? slideIndex + 1 : 0);
    }
  };

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex(current => (current === totalSlides - 1 ? 0 : current + 1));
  };

//   const redirectToProductPage = () => {
//     navigate('/product');
//   };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleArrowClick('left')}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper style={{ transform: `translateX(-${slideIndex * 100}vw)` }}>
        <Slide>
          <ImgContainer>
            <Image
              src={require('./assets/slider1.jpg')}
              alt="Slide 1"
            />
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src={require('./assets/slider2.webp')}
              alt="Slide 2"
            />
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src={require('./assets/slider4.jpg')}
              alt="Slide 4"
            />
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src={require('./assets/slider5.jpg')}
              alt="Slide 5"
            />
          </ImgContainer>
        </Slide>
        
      </Wrapper>
      <Arrow direction="right" onClick={() => handleArrowClick('right')}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
