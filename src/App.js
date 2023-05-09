import React, { useState, useEffect} from 'react';
import { Container, Button } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import ListAll from './components/ListAll/ListAll';

//import TagArea from './components/TagArea/TagArea';

import AddRecepie from './components/AddRecepie/AddRecepie';
//import MyPostsList from './components/MyPostsList/MyPostsList';


import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
//import CreatorOrTagAll from './components/CreatorOrTagAll/CreatorOrTagAll';

import ScrollButton from './components/ScrollButton/ScrollButton';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  /*const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
*/
  return (
    <BrowserRouter>
      <Container className='fullscreen-div' maxWidth="xl"  style={{padding:'0px'}}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />

          {/*WIP*/}
          <Route path="/profil" exact component={Home} />
          <Route path="/kategori" exact component={Home} />
          <Route path="/skapa" exact component={AddRecepie} /> {/** Funkar bra */}
          {/*<Route path="/mina-recept" exact component={MyPostsList} />*/}
          <Route path="/mina-favoriter" exact component={Home} />
          <Route path="/list-posts" exact component={ListAll} />
          <Route path="/list-posts/search" exact component={ListAll} />
          {/*<Route path="/tags" exact component={TagArea} />*/}
          {/*<Route path={['/creators', '/tags']} component={CreatorOrTagAll} />*/}

          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
          {/*<div className="top-to-btm">
              {" "}
              {showTopBtn && (
                  <Button
                    className="icon-position icon-style"
                    onClick={goToTop}
                    >
                      Upp
                    </Button>
              )}{" "}
              </div>*/}
            {/*{" "}*/}
            {/*
            {showTopBtn && (
              <Button style={{color:'white', background:'#A52A2A'}} onClick={goToTop} className='scrollToTop' variant="contained">Upp</Button>
            )}{" "}*/}
            <ScrollButton />
          </Container>
    </BrowserRouter>
  );
};

export default App;
