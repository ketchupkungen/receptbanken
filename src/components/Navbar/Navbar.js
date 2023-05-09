import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import { AppBar, Typography, Toolbar, Avatar, Button, Icon, Switch, FormGroup, FormControlLabel, IconButton, MenuItem, Menu } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import './styles.css';

//import memoriesLogo from '../../images/memoriesLogo.png';
import logo from '../../images/logo.png';
import * as actionType from '../../constants/actionTypes';
//import useStyles from './styles';

/*const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navbar: {
    //background: '#A52A2A',
    background: '#556B2F',
    background-image:
    linearGradient: "(toBottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),url('images/background.jpg')"
    //background: '#556B2F',
    //background: '#556B2F',
    position: 'fixed',
    boxShadow: "0px 2px 10px #000000",
     
  navbarTitle: {
    left: '200px',
    padding:'50px',
    textDecoration: 'none',
  }
  },
  burgerMenu: {
    height: '40px',
    position: 'fixed',

  }
}));*/

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  //const classes = useStyles();
  
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx('list', {
        ['fullList']: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      {user?.result ? (
        <List className=''>
        <div className='profile'>
          <ListItem button>
            <ListItemIcon>
              <Avatar className='sidebar-item' alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText className='sidebar-item' variant="h6">{user?.result.name}</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/'>
            <ListItemIcon>
              <DashboardIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Alla recept</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/list-posts'>
            <ListItemIcon>
              <ListIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Alla recept - skrivbord</ListItemText>
          </ListItem>
          {/*<ListItem button component={Link} to='/'>
            <ListItemIcon>
              <CropSquareIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Kategorier</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/'>
            <ListItemIcon>
              <PeopleIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Användare</ListItemText>
          </ListItem>*/}
          <ListItem button component={Link} to='/skapa'>
            <ListItemIcon>
              <NoteAddIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Ladda upp recept</ListItemText>
          </ListItem>
          {/*<Divider />
          <ListItem button component={Link} to='/mina-recept'>
            <ListItemIcon>
              <FileCopyIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Mina recept</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/'>
            <ListItemIcon>
              <FavoriteIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Mina favoriter</ListItemText>
          </ListItem>*/}
        </div>
        </List>
      ) : (
        <List>
          <ListItem button component={Link} to='/'>
            <ListItemIcon>
              <DashboardIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Alla recept</ListItemText>
          </ListItem>
          <ListItem button component={Link} to='/list-posts'>
            <ListItemIcon>
              <ListIcon className='sidebar-item' />
            </ListItemIcon>
            <ListItemText className='sidebar-item'>Alla recept - skrivbord</ListItemText>
          </ListItem>
        </List>
      )}
    </div>
  );

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');
    setAnchorEl(null);
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div>
      {user?.result ? (
      <div>
        {['left'].map((anchor) => (
        <AppBar className='navbar' position="fixed" key={anchor}>
          <Toolbar>
            <IconButton edge="start" className='menuButton' color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className='title'>
              <Link to='/' style={{ textDecoration: 'none', color: '#FFDE59'}}>
              <img style={{ paddingLeft: '0px', verticalAlign:'middle' }} component={Link} to="/" src={logo} alt="icon" height="45px" /> Receptbanken
              </Link>
            </Typography>
              <div>
                <IconButton
                  aria-label="Användarens konto"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar style={{background:'#A52A2A', color:'#FFDE59'}} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0).toUpperCase()}{user?.result.name.split(' ').splice(1, 1).join(' ').charAt(0).toUpperCase()}</Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'right',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'right',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profil</MenuItem>
                  <MenuItem onClick={logout}>Logga ut</MenuItem>
                </Menu>
              </div>
          </Toolbar>
          <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}

            {/*<Divider />
            <FormControlLabel
              style={{padding:'16px 8px', margin:'0px'}}
              value="darkMode"
              control={<Switch color="primary" />}
              label="Dark mode"
              labelPlacement="darkMode"
                />*/}
          </SwipeableDrawer>
        </AppBar>
        ))}
      </div>

      ) : (
        <div className='root'>
          {['left'].map((anchor) => (
            <AppBar className='navbar' position="fixed" key={anchor}>
              <Toolbar>
                <IconButton style={{marginRight:'0px'}} edge="start" className='menuButton' color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className='title'>
                  <Link to='/' style={{ textDecoration: 'none', color: '#FFDE59'}}>
                  <img style={{ paddingLeft: '0px', verticalAlign:'middle' }} component={Link} to="/" src={logo} alt="icon" height="45px" /> Receptbanken
                  </Link>
                </Typography>
                  <div style={{width:'50px'}}>
                    <IconButton
                      aria-label="Gäst"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <Avatar className='purple' alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'right',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'right',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem component={Link} to="/auth" onClick={handleClose}><p>Logga in</p></MenuItem>
                    </Menu>
                  </div>
              </Toolbar>
              <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}

                {/*<Divider />
                <FormControlLabel
                  style={{padding:'16px 8px', margin:'0px'}}
                  value="darkMode"
                  control={<Switch color="primary" />}
                  label="Dark mode"
                  labelPlacement="darkMode"
                    />*/}
              </SwipeableDrawer>
            </AppBar>
          ))}

          {/*<AppBar position="fixed">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Link to='/' style={{ textDecoration: 'none', color: '#FFDE59'}}>
                  Vad blir det för mat?
                </Link>
              </Typography>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem component={Link} to="/auth" onClick={handleClose}>Logga in</MenuItem>
                  </Menu>
                </div>
            </Toolbar>
                  </AppBar>*/}
        </div>
      )}
      
      {/*<div className={classes.navbar}>
        {[''].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button style={{ left: 0, top: '5px', position: 'fixed'}} onClick={toggleDrawer(anchor, true)}>{anchor}
              <MenuIcon style={{ fontSize: 50, color:'white'}}/>
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}

          <Link to="/"  className={classes.navbarTitle}>
            <img style={{ paddingLeft: '50px'}} component={Link} to="/" src={logo} alt="icon" height="45px" />
            <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
          </Link>
        </div>*/}
    </div>
  );
};

export default Navbar;