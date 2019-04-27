import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Button from '@material-ui/core/Button';
// import {Link}from "react-router-dom";
import Navigation from "./OutterNav";
import {connect} from "react-redux";
import axios from "axios";
import { getProfile } from "../actions/getProfileAction";
import {accountDetailAction} from "../actions/accountDetailsAction";
//import AddAccountBar from "../FrameWorkUnity/AddAccountBar/AddAccountBar";


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

class OverViewPage extends React.Component{

    state = {};

    componentDidMount() {
        console.log("OverVIew Component Did Mount")
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get("/userinfo",{headers: req_headers})
            .then(response => {
                console.log(response);
                this.props.getProfile(response.data);
            }).catch (error => console.log(error.response.data.msg));

    }

    renderAccount() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return (
                <div>
                    <p> {this.props.myInfo.first}</p>
                    <p> {this.props.myInfo.last}</p>
                    <p> {this.props.myInfo.email}</p>
                    <p> {this.props.myInfo.username}</p>
                    <p> {this.props.myInfo.password}</p>
                </div>
            )
        }
        else { return (<div><p>nothing inside</p></div>)}

    }


    render() {
        const { classes } = this.props;
        console.log("I am in overview page");
        console.log(this.props.myInfo);

        return (
            <div >
                <Navigation/>
                {/*<Search/>*/}
                {/*<Container>*/}
                    {/*<div class="row">*/}
                        {/*<InnerNavigationBar active ={activeElement}/>*/}
                        {/*<AddAccountBar/>*/}
                    {/*</div>*/}
                    <div className={classes.root}>
                        {this.renderAccount()}
                    </div>
                {/*</Container>*/}
            </div>

        );
    }
}


const activeElement = {
    act1: "nav-link active",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}

OverViewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log(state);
    return state;
}




export default connect(mapStateToProps,{getProfile, accountDetailAction}) (withStyles(styles)(OverViewPage));

