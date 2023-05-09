import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, InputBase, IconButton, Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
//import useStyles from './styles';

const useStyles = makeStyles((theme) => ({
  
}));


const AddRecepie = () => {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(0);
  
  return (
    <div>
      <div style={{paddingTop:'70px'}}>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
};

export default AddRecepie;
