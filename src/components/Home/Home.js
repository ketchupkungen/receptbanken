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
import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    //width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  desktopSearchCreate: {

  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div>
      <div style={{ marginTop: '80px'}} maxWidth="xl">
      </div>
      {/*<Paper className={classes.root}>
        <InputBase
          name="search"
          className={classes.input}
          placeholder="Sök"
          inputProps={{ 'aria-label': 'Sök' }}
          onKeyDown={handleKeyPress}
          value={search} onChange={(e) => setSearch(e.target.value)}
          type='search'
          autoComplete='off'
        />
        <IconButton onClick={searchPost} type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <IconButton className={classes.modalButton} style={{ position: 'fixed', bottom: '50px', right:'10px', zIndex: '10', background: '#A52A2A', color: 'white'}} type='button' onClick={handleOpen}>
        <Add fontSize='Medium' />
  </IconButton>*/}
      {/*<AppBar className={classes.appBarSearch} position="static" color="inherit">
        <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Sök på recept" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
        */}{/*<ChipInput
          style={{ margin: '10px 0' }}
          value={tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
          label="Search Tags"
          variant="outlined"
  />*/}
      {/*</div>  <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
      </AppBar>*/}
      {/*<Form currentId={currentId} setCurrentId={setCurrentId} />*/}
      
      {/* <Posts setCurrentId={setCurrentId} />
      {(!searchQuery && !tags.length) && (
        <div className={classes.pagination} elevation={6}>
          <div style={{margin: '50px'}}></div>
          <Pagination page={page} />
        </div>
      )}*/}
      
    {/*<div className='mobileSearchCreate' style={{width:'100%', height:'400px', padding: '50px',background:'blue'}}></div>*/}      
          
    <Grow in className='mobileSearchCreate'>
      <Container style={{ marginTop: '0px'}} maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <div>
              <TextField className='textArea' autoComplete='off' onKeyDown={handleKeyPress} name="search" variant="outlined" label="Sök på recept" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
            
              <ChipInput
                className='textArea'
                style={{ margin: '10px 0', width:'100%' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Sök på tag"
                variant="outlined"
              />
              <Button style={{width:'100%', color:'white', background:'#A52A2A'}} onClick={searchPost} className={classes.searchButton} variant="contained">Sök</Button>
            {/*<Form currentId={currentId} setCurrentId={setCurrentId} />*/}
            {/*{(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}*/}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item lg={3} xs={0}></Grid>
          <Grid item lg={6} xs={12} className='paginationBottom'>
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className='bottomCard'>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
          <Grid item lg={3} xs={0}></Grid>
        </Grid>
      </Container>
    </Grow>

    {/*<Grow in className='desktopSearchCreate'>
      <Container style={{ marginTop: '50px'}} maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Sök på recept" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Sök på tag"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Sök</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
            </Grow>*/}
    {/* 
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
          <div className={classes.paper}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </Fade>
      </Modal>*/}
    </div>
  );
};

export default Home;
