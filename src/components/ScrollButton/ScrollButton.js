import React, {useState} from 'react';
//import {FaArrowCircleUp} from 'react-icons/fa';
import useStyles from './styles';
import { Button } from '@material-ui/core/';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
  
const ScrollButton = () =>{
    const classes = useStyles();

  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 2000){
      setVisible(true)
    } 
    else if (scrolled <= 2000){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <Button onClick={scrollToTop} className='ScrollButton' style={{display: visible ? 'inline' : 'none'}}>
        <DoubleArrowIcon className='ScrollButtonIcon' />
    </Button>
  );
}
  
export default ScrollButton;