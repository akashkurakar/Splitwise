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

class SelectGroup extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false,
            description: "",
            amount: "",
            transactions: "",
            users:""
        }
    }
    handleModal = (modal) => {
        this.setState({ show: modal });
    }


    componentDidMount = () => {
        this.getUser();
       this.getTransaction();
    }

    getUser=()=>{
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
    getTransaction=()=>{
        let userId = cookie.load('cookie');
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
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ width: "30%" }}>
                                        <h5>{this.props.selectedGroup}</h5>
                                    </td>
                                    <td style={{ width: "40%", float: 'right', }}>
                                        <Button variant="primary" style={{ 'background-color': '#ff652f', 'border-color': '#5bc5a7' }} class="btn btn-2 btn-success pull-right text-uppercase" type="submit" id="location" onClick={this.handleModal}>Add Expenses</Button>
                                    </td>
                                    <td style={{ width: "30%", float: 'right' }}>
                                        <Button variant="primary" style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }} >Settle Up</Button>
                                    </td>
                                </tr>
                            </table>
                        </div></div>
                    <div className="row">
                        <List component="nav" className={classes.root} style={{ width: "100%" }}>
                            {this.state.transactions.length > 0 ? this.state.transactions.map((r) => (<ListItem>
                                <ListItemAvatar>
                                    <div class="date">
                                    <img src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" width="100" height="100" className="img-fluid" alt="" />
                                    </div>
                                </ListItemAvatar>
                                <ListItemText primary={r.tran_name} secondary="" />
                            </ListItem>
                            )) : <ListItem>
                                    <ListItemText primary="No transactions!" />
                                </ListItem>}
                        </List>
                    </div>
                </Row>
                {this.state.show && <AddExpenseModal show={this.handleModal.bind(this)} />}
            </>
        )
    }
}

export default SelectGroup;