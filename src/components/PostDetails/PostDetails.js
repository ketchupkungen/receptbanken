import React, { useEffect, useState, useCallback } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button, Backdrop, Fade, Grid, FormControlLabel, Checkbox, Box, Portal, IconButton, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Collapse } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleIcon from '@material-ui/icons/People';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';

import { Modal, ModalContents, ModalOpenButton } from "./Modal";

import clsx from 'clsx';

import Rating from '@material-ui/lab/Rating';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

import { likePost, deletePost } from '../../actions/posts';

import Form from '../Form/Form';
//import useStyles from './styles';






const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
  iframeContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%', /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  },
  iframeResponsive: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  imageSection: {
    padding:'0px'
  },
  content: {
    whiteSpace: 'pre-line',
    minHeight: '100px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'
  },
  mediaMain: {
    height:'100%',
    //paddingTop: '56.25%', // 16:9
    width:'100%'
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperTips: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [currentId, setCurrentId] = useState(0);

 

  //const query = useQuery();
  //const page = query.get('page') || 1;
  //const searchQuery = query.get('searchQuery');

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //const userId = user?.result.googleId || user?.result?._id;
  //const hasLikedPost = post.likes.find((like) => like === userId);

  // Rating start
  const [value, setValue] = React.useState(2);
  // Rating stop

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToTop= () => {
    window.scrollTo({
      bottom: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  /*const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };*/

  /*const Favorites = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><FavoriteIcon style={{color:'red'}} />&nbsp;{likes.length > 2 ? `${likes.length - 1}` : `${likes.length} ${likes.length > 1 ? '' : ''}` }</>
        ) : (
          <><FavoriteIconBorder />&nbsp;{likes.length} {likes.length === 1}</>
        );
    }

    return <><FavoriteIconBorder /></>;
  };
*/
  if (!post) return null;

  const openPost = (_id) => {
    history.push(`/posts/${_id}`);

    window.scrollTo({
      bottom: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id); // Möjligt att det går att ta sig runt begränsningen genom att göra en modul av det, som för Post/Posts och ListPost/ListPosts ?

  return (
    <div>
      <div style={{margin: '70px'}}>

      </div>
      {/*<button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
        style={{
          position: 'fixed',
          padding: '1rem 2rem',
          fontSize: '20px',
          bottom: '40px',
          right: '40px',
          backgroundColor: '#0C9',
          color: '#fff',
          textAlign: 'center',
        }}
      ></button>*/}
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.imageSection} style={{padding:'0px'}}>
          <Grid className={classes.imageSection} item md={8} xs={12} style={{padding:'0px'}}>
              {/*<div className={classes.imageSection}>
                <img style={{width:'100%'}} className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
              </div>*/}
              <img
                className={classes.mediaMain}
                src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                //title={`${post.title}`}
              />
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.paper}>
              <Typography variant="h5" style={{color:'#ffb400', textShadow:'1px 5px 5px black'}}>{post.title}</Typography>
            
              <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Rating
                      style={{padding:'9px 9px 9px 0px'}}
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                </Grid>
                <Grid item xs={6}>
                  {/*<IconButton aria-label="add to favorites" disabled={!user?.result} onClick={handleLike}>
                    <Favorites />
                    </IconButton>*/}
                  <FormControlLabel
                    style={{color:'white'}}
                    control={<Checkbox icon={<FavoriteIconBorder />} checkedIcon={<FavoriteIcon />} name="checkedH" />}
                    label="Favorit"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                    <Typography style={{display: 'flex', alignItems: 'center', color:'white'}} variant="subtitle1">
                    <PeopleIcon />{post.portions}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{display: 'flex', alignItems: 'center', color:'white'}} variant="subtitle1">
                      <ScheduleIcon />{post.time}
                    </Typography>
                </Grid>
              </Grid>
              <Divider style={{background:'gray', marginTop:'10px', marginBottom:'10px'}} />
              <Typography style={{whiteSpace: 'pre-line', color:'white'}} gutterBottom variant="body1" component="p">{post.message}</Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.paper} style={{padding:'0px 16px'}}>
              {post.tags.map((tag) => (
                <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#A52A2A' }}>
                  {` #${tag} `}
                </Link>
              ))}
            </div>
          </Grid>
          
          <Grid item sm={4} xs={12}>
            <div className={classes.paper}>
              <Typography style={{whiteSpace: 'pre-line', color:'rgb(255, 222, 89)'}} gutterBottom variant="h6" component="p">Ingredienser</Typography>
              <Typography style={{whiteSpace: 'pre-line', color:'white'}} gutterBottom variant="body1" component="p">{post.ingr}</Typography>
            </div>
          </Grid>
          <Grid item sm={8} xs={12}>
            <div className={classes.paper}>
              <Typography style={{whiteSpace: 'pre-line', color:'rgb(255, 222, 89)'}} gutterBottom variant="h6" component="p">Moment</Typography>
              <Typography style={{whiteSpace: 'pre-line', color:'white'}} gutterBottom variant="body1" component="p">{post.step}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{whiteSpace: 'pre-wrap'}} className={classes.paper}>
              <Typography style={{whiteSpace: 'pre-line', color:'rgb(255, 222, 89)'}} gutterBottom variant="h6" component="h6">Tips och övrigt</Typography>
              <Typography style={{whiteSpace: 'pre-line', color:'white'}} gutterBottom variant="body1" component="p">{post.more}</Typography>
            </div>
          </Grid>
          
          <Grid item xs={12}>
            <div className={classes.paper} style={{padding:'0px 16px'}}>
              <Typography style={{color:'rgb(255, 222, 89)'}} variant="h6">Youtube</Typography>
            </div>
          </Grid>
          {/* Tillfällig tills Youtube klipp fungerar som det ska */}
          {/*<Grid item xs={12}>
            <div className={classes.paper}>{post.media}</div>
              </Grid>*/}
          {/* Tillfällig tills Youtube klipp fungerar som det ska */}
          <Grid item md={6} xs={12} style={{padding:'0px'}}>
           { isLoading ? <CircularProgress /> : (
              <div className={classes.iframeContainer}>
                {/* Modul för youtube klipp. Se över. If blank => display:none, eller dylikt */}
                <iframe className={classes.iframeResponsive} allowFullScreen="allowFullScreen" src={`${post.media || 'https://www.youtube.com/embed/RXZiMZSkPeY'}`} style={{border:'none'}}></iframe>
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography style={{whiteSpace: 'pre-line', color:'rgb(255, 222, 89)'}} gutterBottom variant="h6" component="h6">Skapat av</Typography>
              <div style={{display:'inline-flex'}}>
                <Button style={{background:'black', color:'white'}} component={Link} to={`/creators/${post.name}`}>
                {` ${post.name}`}
                </Button>
                <p style={{textAlign:'center', paddingLeft:'10px', fontSize:'10px'}}>{moment(post.createdAt).format("YYYY-MM-DD")}</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}><CommentSection post={post} /></Paper>
          </Grid>
          {!!recommendedPosts.length && (
          <Grid item xs={12}>
              <Typography style={{color:'rgb(255, 222, 89)'}} gutterBottom variant="h6">Andra recept du kanske gillar</Typography>
              <Divider style={{background:'gray', marginTop:'10px', marginBottom:'10px'}} />
              <Grid className={classes.container} container alignItems="stretch" /*spacing={3}*/>
                {recommendedPosts.map(({ title, name, message, createdAt, ingr, likes, selectedFile, _id }) => (
                  <Grid item xs={12} md={6} lg={3} >
                    <div className={classes.recommendedPosts}>
                      <div style={{ margin: '20px' }} >
                        <Card className='card'>
                        {/*<Typography gutterBottom variant="h6">{title}</Typography>
                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                        <Typography gutterBottom variant="subtitle1">Favorit: {likes.length}</Typography>
                            <img src={selectedFile} width="200px" />*/}
                          <CardHeader
                            avatar={
                              <Avatar aria-label="recipe" className={classes.avatar}>
                                B
                              </Avatar>
                            }
                            
                            title={`${title}`}
                            //subheader={`${moment(post.createdAt).format("YYYY-MM-DD")}`}
                          />
                          <CardMedia
                            className={classes.media}
                            image={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                            title={`${title}`}
                            onClick={() => openPost(_id)} key={_id}
                          />
                          <CardContent>
                            <Typography className={classes.content} variant="body2" color="textSecondary" component="p">
                              {message.split(' ').splice(0, 20).join(' ')}...
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites" disabled>
                              <Typography gutterBottom variant="subtitle1"><FavoriteIcon />{likes.length}</Typography>
                            </IconButton>
                            <IconButton aria-label="share" onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}>
                              <ShareIcon />
                            </IconButton>
                            <IconButton
                              style={{color:'white'}}
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </CardActions>
                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                              <Typography paragraph>Ingredienser:</Typography>
                              <Typography style={{whiteSpace: 'pre-line'}} paragraph>
                                {ingr}
                              </Typography>
                            </CardContent>
                          </Collapse>
                        </Card>
                      </div>
                    </div>
                  </Grid>
                            ))}
              </Grid>
          </Grid>
          )}
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography gutterBottom variant="h6">Vill du redigera ditt recept?</Typography>
                <Grid container>
                  {/* Sektion redigering */}
                  <Grid item xs={6}>
                    <Modal>
                      <ModalOpenButton>
                        <Button size="small" style={{color:'yellow'}} onClick={(e) => {
                          e.stopPropagation();
                          setCurrentId(post._id);
                        }}>
                          <EditIcon fontSize="small" /> &nbsp; Redigera recept
                        </Button>
                      </ModalOpenButton>
                      <ModalContents>
                      <Form currentId={currentId} setCurrentId={setCurrentId} />
                      </ModalContents>
                    </Modal>
                  </Grid>
                  {/* Sektion radering */}
                  <Grid item xs={6}>
                    <Modal>
                      <ModalOpenButton>
                        <Button size="small" color="secondary">
                          <DeleteIcon fontSize="small" /> &nbsp; Ta bort
                        </Button>
                      </ModalOpenButton>
                      <ModalContents>
                        <Typography style={{color:'rgb(255, 222, 89)'}} gutterBottom variant="h6">Vill du ta bort receptet?</Typography>
                        <Typography gutterBottom variant="body1">{post.title}</Typography>
                        <Typography gutterBottom variant="caption">{post.message}</Typography>
                        <Divider />
                        <Button style={{paddingTop:'10px'}} size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))} component={Link} to='/'>
                          <DeleteIcon fontSize="small" /> &nbsp; Ja, ta bort
                        </Button>
                      </ModalContents>
                    </Modal>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default PostDetails;
