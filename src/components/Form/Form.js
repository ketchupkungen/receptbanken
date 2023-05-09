import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Tooltip } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'; // Kolla Youtube mern projekt kring auth, verkar finnas lösning där
import base64 from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId, props }) => {
  const [postData, setPostData] = useState({ title: '', message: '', ingr: '', step: '', media: '', more: '', portions: '', time: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', ingr: '', step: '', media: '', more: '', portions: '', time: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div>{/*}Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Logga in för att ladda upp nya recept
        </Typography>
    </Paper>*/}
    </div>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <div>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography style={{color:'rgb(255, 222, 89)'}} variant="h6">{currentId ? `Redigera "${post?.title}"?` : 'Ladda upp recept'}</Typography>
        <Tooltip disableFocusListener title="Obligatorisk, receptets titel">
          <TextField style={{ margin:'20px 0px 10px 0px', textTransform: 'capitalize'}} name="title" variant="outlined" label="Titel" fullWidth value={postData.title} required onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Obligatorisk, kort beskrivning/info om receptet">
          <TextField style={{ margin:'0px 0px 10px 0px'}} name="message" variant="outlined" label="Beskrivning" fullWidth multiline value={postData.message} required onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Obligatorisk, ingredienserna ex. - 2 Potatisar, - 1dl Mjölk etc. skriv rad för rad som recept skrivs">
          <TextField style={{ margin:'0px 0px 10px 0px'}} name="ingr" variant="outlined" label="Ingredienser" fullWidth multiline value={postData.ingr} required onChange={(e) => setPostData({ ...postData, ingr: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Obligatorisk, momenten/stegen i receptet. 1. Steg 1, 2. Steg 2. Skriv rad för rad som recept skrivs">
          <TextField style={{ margin:'0px 0px 10px 0px'}} name="step" variant="outlined" label="Moment" fullWidth multiline value={postData.step} required onChange={(e) => setPostData({ ...postData, step: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Valfri, lämna blank om osäker. Annars är det ex. Youtube klipp. Måste vara embedded länk ex:'https://www.youtube.com/embed/RXZiMZSkPeY'. Det hittas ex. på Youtube, klicka på 'Dela' och välj 'Bädda in', kopiera sedan den liknande länken och varken mer eller mindre">
          <TextField style={{ margin:'0px 0px 10px 0px'}} name="media" variant="outlined" label="Youtube" fullWidth value={postData.media} onChange={(e) => setPostData({ ...postData, media: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Valfri, ex. tips från kocken">
          <TextField style={{ margin:'0px 0px 10px 0px'}} name="more" variant="outlined" label="Tips och övrigt" fullWidth multiline value={postData.more} onChange={(e) => setPostData({ ...postData, more: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Obligatorisk, antalet portioner som receptet är gjort för. Skriv enbart i siffror. Ex: '5'">
          <TextField style={{ margin:'0px 0px 10px 0px'}} name="portions" variant="outlined" label="Portioner" fullWidth value={postData.portions} required onChange={(e) => setPostData({ ...postData, portions: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Obligatorisk, tidsåtgång för tillagning. Ex: '15 min', '60 min' '2 dagar'">
          <TextField style={{ margin:'0px 0px 10px 0px'}} name="time" variant="outlined" label="Tidsåtgång" fullWidth value={postData.time} required onChange={(e) => setPostData({ ...postData, time: e.target.value })} />
        </Tooltip>
        <Tooltip disableFocusListener title="Obligatorisk, Ange en eller flera taggar som hjälper att koppla ihop recept och fungera som kategorier vid sökning. Ange som följande och avsluta med antingen 'Enter knapp' eller ',' - 'Kyckling', 'Indiskt', 'Curry', 'Ris', 'Julmat', 'Snabbmat'">
          <ChipInput
            name="tags"
            variant="outlined"
            label="Taggar"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
            required
          />
        </Tooltip>
        <div className={classes.fileInput}>
          {/*<input
            type="file"
            accept="image/*"
            multiple={false}
            maxSize={5000000} 
            onDone={({File}) => setPostData({ ...postData, selectedFile: File })}
  />*/}
        <Typography variant="body1" style={{color:'white', paddingBottom:'4px', paddingLeft:'4px', textAlign:'left'}}>Välj en bild</Typography>
        <FileBase type="file" multiple={false} onChange='' onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} accept="image/*" maxSize={5000000}/>
        </div>
        
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth disabled={!(postData.title, postData.message, postData.ingr, postData.step, postData.portions, postData.time, postData.tags).length}>{currentId ? 'Redigera' : 'Skapa'}</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Rensa</Button>
      </form>
    {/*<Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>*/}
    </div>
  );
};

export default Form;
