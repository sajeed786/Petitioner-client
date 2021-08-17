import React, { useState, useEffect} from 'react';
import { useTheme, withStyles } from "@material-ui/core/styles";
import { Link, useLocation, withRouter } from 'react-router-dom';
import { AppBar, Typography, Avatar, Toolbar, Button, IconButton, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';

const Navbar = (props) => {

    const classes = useStyles();
    const  [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { history } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        //JWT auth

        if(token)
        {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    //for handling navigation links in the Appbar and also make it responsive
    
    //creating a custom button for navigation menu options
    const CustomButton = withStyles({
        root: {
            backgroundColor: "inherit",
            color: 'black',
            '&:hover': {
                backgroundColor: "inherit",
                color: '#fd0202'
            }
        },
        label: {
          textTransform: "none",
          fontFamily: 'Roboto Condensed',
          fontSize: isMedium?'1em':'1.5em'
        }
      })(props => <Button {...props} />);
    
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
      };
    
      const handleButtonClick = pageURL => {
        //console.log(pageURL);
        history.push(pageURL);
      };
    
      const menuItems = [
        {
          id: 1,
          menuTitle: "Start a petition",
          pageURL: "/start-a-petition"
        },
        {
          id: 2,
          menuTitle: "My petitions",
          pageURL: "/my-petition"
        },
        {
          id: 3,
          menuTitle: "Browse",
          pageURL: "/browse"
        },
        {
            id: 4,
            menuTitle: "Search",
            pageURL: "/search"
        },
        {
            id: 5,
            menuTitle: "Support Change.org India",
            pageURL: "/chip-in"
        }
      ];

      
    return (
        <div className={classes.root}>
        <AppBar position="static" color="inherit">

            <Toolbar className={classes.toolbar} variant="dense">
                <div className={classes.brandContainer} >
                    <Typography component={ Link } to="/" className={classes.heading} variant="h4" align="center">Petitioner.org</Typography>
                    <span className={classes.fistIcon}><i className={"fas fa-2x fa-fist-raised"}></i></span>
                </div>
                {isMobile ? (
                <>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                >
                    {
                        user && (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.resultData.name} src={user.resultData.imageUrl}>{user.resultData.name.charAt(0)}</Avatar>
                            </div>
                        )
                    }
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                >
                    {menuItems.map(menuItem => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                        <MenuItem key={menuItem.id} onClick={() => handleMenuClick(pageURL)}>
                        {menuTitle}
                        </MenuItem>
                    );
                    })}
                    {
                        user ? (
                            <>
                                <MenuItem style={{background: 'inherit', cursor: 'default'}}>
                                    {user.resultData.name}
                                </MenuItem>
                                <MenuItem>
                                    <Button variant="contained" className={classes.logout} color="secondary" onClick={ logout }>Log out</Button>
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem>
                                <Button component={Link} to="/auth" variant="contained" color="primary">Log in / Sign up</Button>
                            </MenuItem>    
                    )}
                    
                </Menu>
                </>
                ) : (
                    <div className={classes.menuOptions}>
                        <div className={classes.headerOptions}>
                            <CustomButton onClick={() => handleButtonClick("/start-a-petition")}>
                                Start a petition
                            </CustomButton>
                            <CustomButton onClick={() => handleButtonClick("/my-petition")}>
                                My petitions
                            </CustomButton>
                            <CustomButton onClick={() => handleButtonClick("/browse")}>
                                Browse
                            </CustomButton>
                            <CustomButton onClick={() => handleButtonClick("/chip-in")}>
                                Support Change.org India
                            </CustomButton>
                        </div>
                        <div className={classes.menuRight}>
                        <IconButton component={Link} to="/search" aria-label="search" color="inherit">
                            <SearchIcon />
                        </IconButton>
                        {
                            user ? (
                                <>
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton}
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={handleMenu}
                                    >
                                        <Avatar className={classes.purple} alt={user.resultData.name} src={user.resultData.imageUrl}>{user.resultData.name.charAt(0)}</Avatar>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center"
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                        }}
                                        open={open}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        <MenuItem onClick={() => handleMenuClick("")}>
                                            Settings
                                        </MenuItem>
                                        <MenuItem style={{background: 'inherit', cursor: 'default'}}>
                                            {user.resultData.name}
                                        </MenuItem>
                                        <MenuItem>
                                            <Button variant="contained" className={classes.logout} color="secondary" onClick={ logout }>Logout</Button>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button component={Link} to="/auth" variant="contained" color="primary">Log in</Button>
                            )
                        }
                        </div>
                    </div>
                )}

            </Toolbar>
        </AppBar>
        </div>
    );
};

export default withRouter(Navbar);
