
import React from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import PaymentModal from "./PaymentModal";
import photo from "../../static/images/avatar/person.png";
import Typography from '@material-ui/core/Typography';
import converter from "../../constants/currency";
import {connect} from "react-redux";
import axios from "axios";
import {Redirect} from 'react-router';

class DashboardMiddle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            useStyles: makeStyles((theme) => ({
                root: {
                    '& .MuiTextField-root': {
                        margin: theme.spacing(1),
                        width: '25ch',
                    }, '& > *': {
                        margin: theme.spacing(1),
                        width: '25ch',
                    },
                    width: '100%',
                    maxWidth: '36ch',
                    backgroundColor: theme.palette.background.paper,
                    inline: {
                        display: 'inline',
                    },
                },
            })),
            transactions: [],
            balances: [],
            user:[],
            dashboard:[],
            show: false,
            oweData:[],
            owedData:[],
            modalData:{
                user:"",
                amount:""
            }
        }
    }
    handleModal = (e) => {
        if(this.state.oweData.length>0){
            this.setState({
                modalData:{
                    user:this.state.oweData[0].owed_name,
                    amount:this.state.oweData[0].total_amt
                }
            })
            this.setState({ show: e });
        }else if(this.state.owedData.length>0){
            this.setState({
                modalData:{
                    user:this.state.owedData[0].paid_by,
                    amount:this.state.owedData[0].total_amt
                }
        })
        this.setState({ show: e });
        }else{
            this.setState({ show: false });
        }
        
    }
    handleClose = () => {
        this.setState({ show: false })
    }

    componentDidMount = () => {
        this.getBalances();
            this.getTotalTransactionByUser();
    }
    getBalances=()=>{
        let userId = this.props.user.name;
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/api/balances/?user=${userId}`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    this.setState({
                        balances: data
                    })
                } else {
    
                }
            });
    }
    getTotalTransactionByUser=()=>{
        let userId = this.props.user.name;
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/api/transactions/data/?user=${userId}`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    this.setState({
                        oweData: data.oweData,
                        owedData:data.owedData
                    })
                } else {
    
                }
            });
    }
    render() {
        const classes = this.state.useStyles;
        return (
            <>
                <Row>
                    <Card style={{ "background-color": "#eeeeee", width: "100%" }} className="card" >
                        <Card.Body>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <h2>Dashboard</h2>
                                    </td>
                                    <td style={{ width: "50%", float: 'right' }}>
                                        <Button style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }} type="submit" id="location" onClick={this.handleModal}>Settle Up</Button>
                                    </td>
                                </tr>
                            </table>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ width: "33%" }}>
                                        <small class="text-muted">Total Balance</small>
                                        <h6 style={{ color: "green" }}>{converter(this.props.user.default_currency).format(this.state.balances.balance)}</h6>
                                    </td>

                                    <td style={{ width: "34%" }}>
                                        <small class="text-muted">You Owe</small>
                                        <h6 style={{ color: "red" }}>{converter(this.props.user.default_currency).format(this.state.balances.paidAmount)}</h6>
                                    </td>
                                    <td style={{ width: "33%" }}>
                                        <small class="text-muted">You are Owed</small>
                                        <h6 style={{ color: "green" }}>{converter(this.props.user.default_currency).format(this.state.balances.owedAmount)}</h6>
                                    </td>
                                </tr>
                            </table>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Col style={{ 'background-color': '#ffffff' }} md={6}>
                        <List dense className={classes.root}>
                            {this.state.owedData.length > 0 ? this.state.owedData.map(trans => (
                                <ListItem button>
                                    <ListItemAvatar>
                                    <Avatar
                                            alt={`Avatar n°${1}`}
                                            src={photo}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id="item1" primary={trans.paid_by} secondary={<Typography component="span" variant="body2" className={classes.inline} color="textPrimary">You owe {converter(this.props.user.default_currency).format(trans.total_amt)}</Typography>}/>
                                    <Divider light />
                                    <ListItemSecondaryAction>
                                    </ListItemSecondaryAction>
                                    
                                </ListItem>)) : <ListItem>

                                    <ListItemText id="item1" primary='No Transactions' />
                                   
                                    <ListItemSecondaryAction>

                                    </ListItemSecondaryAction>
                                </ListItem>}
                        </List>
                    </Col>
                    <Divider orientation="vertical" flexItem />
                    <Col style={{ 'background-color': '#ffffff' }} md={5.5}>
                        <List dense className={classes.root}>
                            {this.state.oweData.length > 0 ? this.state.oweData.map(trans => (

                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${1}`}
                                            src={photo}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id="item1" primary={trans.owed_name} secondary={<Typography component="span" variant="body2" className={classes.inline} color="textPrimary">Owes you {converter(this.props.user.default_currency).format(trans.total_amt)}</Typography>}/>
                                    <Divider/>
                                    <ListItemSecondaryAction>

</ListItemSecondaryAction>
                                </ListItem>)) :
                                <ListItem>

                                    <ListItemText id="item1" primary='No Transactions' />
                                    <ListItemSecondaryAction>

                                    </ListItemSecondaryAction>
                                </ListItem>}
                        </List>
                    </Col>
                </Row>
                {this.state.show && <PaymentModal show={this.handleModal.bind(this)} data={this.state.modalData}/>}

            </>)

    }
}
const mapStatetoProps=(state)=>{
    return {
     user : state.user,
     //dashboard:state.dashboard
    }
 }
 const mapDispatchToProps ={
   // getTotalBalances : dashboardActions.getTotalBalances
}
//Export The Main Component
export default connect(mapStatetoProps,mapDispatchToProps)(DashboardMiddle);

