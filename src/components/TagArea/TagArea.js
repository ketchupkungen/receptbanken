import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, InputBase, IconButton, Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Tags from '../Tags/Tags';
import TagForm from '../TagForm/TagForm';
import Pagination from '../Pagination';
//import useStyles from './styles';

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
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const TagArea = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ marginTop: '100px'}} maxWidth="xl">
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
      
            
    <TagForm currentId={currentId} setCurrentId={setCurrentId} />
    <Grow in>
      <Container style={{ marginTop: '50px'}} maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Tags setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
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

export default TagArea;
