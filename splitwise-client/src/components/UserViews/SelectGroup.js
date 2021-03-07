import React from "react";
import Button from 'react-bootstrap/Button';
import cookie from 'react-cookies';
import {connect} from "react-redux";
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import AddExpenseModal from "./AddExpenseModal"
import Row from 'react-bootstrap/Row';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Col from 'react-bootstrap/Col';
import { Typography } from "@material-ui/core";
import converter from "../../constants/currency";


class SelectGroup extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false,
            description: "",
            amount: "",
            transactions: "",
            users: "",
           
        }
    }
    handleModal = (modal) => {
        this.setState({ show: modal });
        this.getTransaction();
    }


    componentDidMount = () => {
        // this.getUser();
        this.getTransaction();
    }
    handleLeaveGroup=(e)=>{
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const data = {
            user:this.props.user.name,
            group:this.props.selectedGroup
        }
    axios.post(`http://localhost:3001/api/group/leave`,data)
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                if(data==="Success"){
                    window.location.href="./dashboard";
                }
            } else {

            }
        });
    }
    getUser = () => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/api/users/`)
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
    getTransaction = () => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/api/transactions/?id=${this.props.selectedGroup}`)
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
                           <Row>
                              <Col md={2}>
                                  
                                        <img src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" width="80" height="80" className="img-fluid" alt="" />
                                        <div>
                                            <Fab
                                                color="secondary"
                                                size="small"
                                                component="span"
                                                aria-label="add"
                                                variant="extended"
                                            > <AddIcon size="small" />
                                            </Fab>
                                        </div>
                                   </Col>
                                    <Col md={2}>
                                        <h2>{this.props.selectedGroup}</h2>
                                        </Col>
                                        <Col  md={2.5}>
                                        <Button variant="primary" style={{ 'background-color': '#ff652f', 'border-color': '#5bc5a7' }} onClick={this.handleLeaveGroup} >Leave Group</Button>
                                    </Col>
                                    <Col  md={2.5}>
                                        <Button variant="primary" style={{ 'background-color': '#ff652f', 'border-color': '#5bc5a7' }} class="btn btn-2 btn-success pull-right text-uppercase" type="submit" id="location" onClick={this.handleModal}>Add Expenses</Button>
                                    </Col>
                                  
                                    <Col  md={2}>
                                        <Button variant="primary" style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }} >Settle Up</Button>
                                    </Col>
                                    
                                    </Row>
                        </div></div>
                    
                    <Col md={12}>
                        <List component="nav" className={classes.root} style={{ width: "100%" }}>
                            {this.state.transactions.length > 0 ? this.state.transactions.map((r) => (<ListItem style={{ width: "100%" }}>
                               <Col md={1.5}>
                                <ListItemAvatar>
                                    <div class="date">
                                        <img src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" width="100" height="100" className="img-fluid" alt="" />
                                    </div>
                                </ListItemAvatar>
                                </Col>
                                <Col md={6}>
                                <ListItemText primary={r.tran_name} secondary={<Typography>Created on:{r.created_on}</Typography>} />
                                </Col>
                                <Col md={5} style={{'text-align':'end'}}>
                                {r.status==='settled' ? <ListItemText primary="" secondary={r.paid_by===this.props.user.name ? <Typography style={{'text-transform':'uppercase',color:'#5bc5a7'}}>you paid {converter(this.props.user.default_currency).format(r.bill_amt)}</Typography>:<Typography style={{'text-transform':'uppercase',color:'#ff652f'}}>{r.paid_by} paid {converter(this.props.user.default_currency).format(r.bill_amt)} <br></br>You lent {converter(this.props.user.default_currency).format(r.amount)}</Typography>}/>:<ListItemText primary={<Typography style={{'text-transform':'uppercase',color:'#5bc5a7'}}>{r.status}</Typography>} secondary={r.paid_by===this.props.user.name ? <Typography style={{'text-transform':'uppercase',color:'#5bc5a7'}}>you paid {converter(this.props.user.default_currency).format(r.bill_amt)}</Typography>:<Typography style={{'text-transform':'uppercase',color:'#ff652f'}}>{r.paid_by} paid {converter(this.props.user.default_currency).format(r.bill_amt)}</Typography>}/>}
                               
                                </Col>
                
                            </ListItem>
                            
                            )) : <ListItem>
                                    <ListItemText primary="No transactions!" />
                                </ListItem>}
                        </List>
                        </Col>
                    
                </Row>
                {this.state.show && <AddExpenseModal show={this.handleModal.bind(this)} grp_name={this.props.selectedGroup} />}
            </>
        )
    }
}
const mapStatetoProps=(state)=>{
    return {
        user : state.user,
        alert:state.alert
    }
 }
export default connect(mapStatetoProps)(SelectGroup);