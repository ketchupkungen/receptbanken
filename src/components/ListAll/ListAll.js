import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, InputBase, IconButton, Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import ListPosts from '../ListPosts/ListPosts';
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
const ListAll = () => {
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
        <Grow in className='mobileSearchCreate'>
            <Container style={{ marginTop: '0px'}} maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12}>
                    <ListPosts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item lg={3} xs={0}></Grid>
                <Grid item lg={6} xs={12} className='paginationBottom'>
                    {(!searchQuery && !tags.length) && (
                    <Paper className='bottomCard' elevation={6}>
                        <Pagination page={page} />
                    </Paper>
                    )}
                </Grid>
                <Grid item lg={3} xs={0}></Grid>
                </Grid>
            </Container>
        </Grow>
    </div>
  );
};

export default ListAll;
