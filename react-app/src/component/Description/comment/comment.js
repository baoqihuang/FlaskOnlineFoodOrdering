import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import logo from "../../images/ezgif-1-e382b6df9dbb.png"
import "./comment.css"

const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing.unit * 2,
    },
    subHeader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    inline: {
        display: 'inline',
    },
});

const messages = (props) =>{
    return props.review
};
    // {
    //     id: 1,
    //     primary: 'Brunch this week?',
    //     secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    //     person: 'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
    // },
    // {
    //     id: 2,
    //     primary: 'Birthday Gift',
    //     secondary: `Do you have a suggestion for a good present for John on his work
    //   anniversary. I am really confused & would love your thoughts on it.`,
    //     person: 'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
    // },
    // {
    //     id: 3,
    //     primary: 'Recipe to try',
    //     secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
    //     person: 'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
    // },
    // {
    //     id: 4,
    //     primary: 'Yes!',
    //     secondary: 'I have the tickets to the ReactConf for this year.',
    //     person: 'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
    // },
    // {
    //     id: 5,
    //     primary: "Doctor's Appointment",
    //     secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
    //     person: 'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
    // },
    // {
    //     id: 6,
    //     primary: 'Discussion',
    //     secondary: `Menus that are generated by the bottom app bar (such as a bottom
    //   navigation drawer or overflow menu) open as bottom sheets at a higher elevation
    //   than the bar.`,
    //     person: 'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
    // },
    // {
    //     id: 7,
    //     primary: 'Summer BBQ',
    //     secondary: `Who wants to have a cookout this weekend? I just got some furniture
    //   for my backyard and would love to fire up the grill.`,
    //     person: 'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
    // },


function BottomComment(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                    Comment
                </Typography>
                <List className={classes.list}>
                    {props.review.map((item, idx) => (
                        item.comment != "" &&
                        <Fragment key={idx}>
                            {/*{id === 1 && <ListSubheader className={classes.subHeader}>Today</ListSubheader>}*/}
                            {/*{id === 3 && <ListSubheader className={classes.subHeader}>Yesterday</ListSubheader>}*/}
                            <ListItem button>
                                <Avatar alt="Profile Picture" src={logo} />
                                {/*<p>{item.user_id} </p>*/}
                                <ListItemText primary={
                                    <React.Fragment>
                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                            {item.username}
                                        </Typography>
                                        <Typography component="span" className={classes.inline} color="textSecondary">
                                            {" - "+ item.reviewtime}
                                        </Typography>
                                    </React.Fragment>
                                }  secondary={item.comment}  />

                            </ListItem>
                        </Fragment>
                    ))}
                </List>
            </Paper>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton color="inherit" aria-label="Open drawer">

                    </IconButton>
                    <Fab color="secondary" aria-label="Add" className={classes.fabButton}>
                        Show
                    </Fab>
                    <div>
                        <IconButton color="inherit">

                        </IconButton>
                        <IconButton color="inherit">

                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

BottomComment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomComment);
