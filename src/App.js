import React from 'react';
import styled from 'styled-components'
import Navbar from './components/Navbar/Navbar';
import Routers from './routers'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import UserController from './components/UserController/UserController';
import Footer from './components/Footer/Footer';
import Category from './components/Category/Category';
import ImgSlider from './components/ImgSlider/ImgSlider';
import { Fade } from 'react-awesome-reveal';

function App() {
  return (
    <div className="App">
      <Router>
        <UserController />
        <Navbar />
        <ImgSlider />
        <Container>
          <CategoryWrapper>
            <Category />
          </CategoryWrapper>
          <RouterWrapper>
            <Routers />
          </RouterWrapper>
        </Container>
        <Fade
          delay={500}
          direction = 'left'
        >
          <Footer />
        </Fade>
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  margin-top: 110px;
  padding: 0 100px;
  display: flex;
  align-items: flex-start;
`

const CategoryWrapper = styled.div`
  flex: 1;
  margin-right: 50px;
`

const RouterWrapper = styled.div`
  flex: 5;
`
