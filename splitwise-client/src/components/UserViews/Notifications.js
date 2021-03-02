import React from "react";
import Button from 'react-bootstrap/Button';
import cookie from 'react-cookies';
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import AddExpenseModal from "./AddExpenseModal"
import Row from 'react-bootstrap/Row';
import {connect} from "react-redux";
class Notifications extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false,
            description: "",
            amount: "",
            notifications: "",
            users:"",
            user:""
        }
    }
    handleModal = (modal) => {
        this.setState({ show: modal });
    }

    handleApprove=(e)=>{
        e.preventDefault();
        let value=e.target.value;
        this.approveRequest(value);
    }
    approveRequest=grpId=>{
        axios.defaults.withCredentials = true;
        const data={
            user:this.props.user.name,
            grp_id:grpId
        }
        axios.post(`http://localhost:3001/api/groups/request`,data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    this.setState({
                        notifications: data
                    })
                } else {

                }
            });
    }

    componentDidMount = () => {
        this.setState({
            user : this.props.user
           })
        this.getNotifications();
    }

    getNotifications=()=>{
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/api/notifications/?user=${this.props.user.name}`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    this.setState({
                        notifications: data
                    })
                } else {

                }
            });
    }
    
    render() {
        const classes = makeStyles((theme) => ({
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: theme.palette.background.paper,
            },
        }));
        return (
            <>
                <Row>
                
                    <div style={{ "background-color": "#eeeeee", width: "100%" }} className="card" >
                        <div className="card-body">
                        <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <h2>Notifications</h2>
                                    </td>
                                </tr>
                            </table>
                        </div></div>
                    <div className="row" style={{width:'100%'}}>
                        <List component="nav" className={classes.root} style={{ width: "100%" }}>
                            {this.state.notifications.length > 0 ? this.state.notifications.map((r,index) => (<ListItem>
                                <ListItemAvatar>
                                    <div class="date">
                                    <img src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" width="100" height="100" className="img-fluid" alt="" />
                                    </div>
                                </ListItemAvatar>
                                <ListItemText primary={r.grp_name} secondary={r.created_by} style={{margin:'1rem'}}/>
                                <Button variant="primary" style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }} value={r.grp_name} onClick={this.handleApprove}>Accept</Button>
                            </ListItem>
                            )) : <ListItem>
                                    <ListItemText primary="No Notifications!" />
                                </ListItem>}
                        </List>
                    </div>
                </Row>
                {this.state.show && <AddExpenseModal show={this.handleModal.bind(this)} />}
            </>
        )
    }
}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
}
export default  connect(mapStatetoProps)(Notifications);