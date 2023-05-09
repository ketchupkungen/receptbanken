import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

import { createTag } from '../../actions/tags';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [tagData, setTagData] = useState({ title: '', selectedFile: '' });
  const tag = useSelector((state) => (currentId ? state.tags.tags.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setTagData({ title: '', selectedFile: '' });
  };

  useEffect(() => {
    if (!tag?.title) clear();
    if (tag) setTagData(tag);
  }, [tag]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createTag({ ...tagData, name: user?.result?.name }, history));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Logga in för att skapa nya taggar
        </Typography>
      </Paper>
    );
  }

  return (
    <div>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${tag?.title}"` : 'Ladda upp recept'}</Typography>
        <TextField style={{ margin:'20px 0px 10px 0px'}} name="title" variant="outlined" label="Titel" fullWidth value={tagData.title} onChange={(e) => setTagData({ ...tagData, title: e.target.value })} />
        <div className={classes.fileInput}>
        <FileBase type="file" accept="image/*" multiple={false} maxSize={5000000} onDone={({ base64 }) => setTagData({ ...tagData, selectedFile: base64 })} /></div>
        
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth disabled={!(tagData.title).length}>Skicka</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Rensa</Button>
      </form>
    </div>
  );
};

export default Form;
