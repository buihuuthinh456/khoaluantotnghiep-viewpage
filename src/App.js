import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Routers from "./routers";
import { BrowserRouter } from "react-router-dom";
import UserController from "./components/UserController/UserController";
import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import ImgSlider from "./components/ImgSlider/ImgSlider";
import { Fade } from "react-awesome-reveal";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function App() {

  const handleScrolltoTop = () => {
    window.scrollTo(0,0)
  }

  const [gotoTop, setGotoTop] = useState(false)

  useEffect(()=>{
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setGotoTop(true)
      } else {
        setGotoTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  return (
    <div className="App">
      <BrowserRouter>
        <UserController />
        <Navbar />
        <SLiderContainer>
          <ImgSlider />
        </SLiderContainer>
        <Container>
          <CategoryWrapper>
            <Category />
          </CategoryWrapper>
          <RouterWrapper>
            <Routers />
          </RouterWrapper>
        </Container>
        <Fade delay={500} direction="left" triggerOnce={true}>
          <Footer />
        </Fade>
      </BrowserRouter>
      {gotoTop && 
        <GotoTop onClick={handleScrolltoTop}>
          <Arrow></Arrow>
        </GotoTop>
      }
      
    </div>
  );
}

export default App;

const Container = styled.div`
  margin-top: 60px;
  padding: 0 100px;
  display: flex;
  align-items: flex-start;
`;

const SLiderContainer = styled.div`
  margin-top: 150px;
`;

const CategoryWrapper = styled.div`
  flex: 1;
  margin-right: 50px;
`;

const RouterWrapper = styled.div`
  flex: 5;
`;

const GotoTop = styled.div`
  cursor: pointer;
  position: fixed;
  bottom:24px;
  right:24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1E90FF;
  display: flex;
  align-items:center;
  justify-content:center;
`

const Arrow = styled(ArrowUpwardIcon)`
  font-size: 2rem;
`
