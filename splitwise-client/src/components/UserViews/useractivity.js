import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import cookie from 'react-cookies';
import Row from 'react-bootstrap/Row';
import axios from "axios";

import {connect} from "react-redux";
class UserActivity extends React.Component {
    constructor(props){
        super(props);
        this.state={
            transactions:[]
        }
    }
    componentDidMount(){
        this.getTransactionByUser();
    }
    getTransactionByUser=()=>{
        let userId = this.props.user.name;
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/api/transactions/?user=${userId}`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    this.setState({
                        transactions: data
                    })
                } else {
    
                }
            });
    }
    render() {
        let userId = cookie.load('cookie');
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
                    <div style={{ "background-color": "#eeeeee", width: "100%" }} className="card">
                        <div className="card-body">
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <h4>Recent Activity</h4>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Row>
                <Row>

                    <List dense className={classes.root}>
                        {this.state.transactions.length > 0 ? this.state.transactions.filter(transaction => transaction.owed_name === userId && transaction.paid_by !== userId).map(trans => (
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${1}`}
                                        src={`/static/images/avatar/${1}.jpg`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id="item1" primary={trans.paid_by} />
                                <ListItemSecondaryAction>

                                </ListItemSecondaryAction>
                            </ListItem>)): <ListItem button>
           
           <ListItemText id="item1" primary='No Transactions' />
           <ListItemSecondaryAction>
             
           </ListItemSecondaryAction>
         </ListItem>}
          </List>
                </Row>
            </>)
    }
}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
 }
export default  connect(mapStatetoProps)(UserActivity)