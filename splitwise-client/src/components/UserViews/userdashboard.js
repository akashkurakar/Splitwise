
import React from "react";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
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
import converter from "../../constants/currency"
import {connect} from "react-redux";
class DashboardMiddle extends React.Component {

    constructor() {
        super();
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
            show: false
        }
    }
    handleModal = (e) => {
        this.setState({ show: e });
    }
    handleClose = () => {
        this.setState({ show: false })
    }

    componentDidMount = () => {


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
                                        <h6 style={{ color: "green" }}>{converter(this.props.user.default_currency).format(this.props.balances.balance)}</h6>
                                    </td>

                                    <td style={{ width: "34%" }}>
                                        <small class="text-muted">You Owe</small>
                                        <h6 style={{ color: "red" }}>{converter(this.props.user.default_currency).format(this.props.balances.paidAmount)}</h6>
                                    </td>
                                    <td style={{ width: "33%" }}>
                                        <small class="text-muted">You are Owed</small>
                                        <h6 style={{ color: "green" }}>{converter(this.props.user.default_currency).format(this.props.balances.owedAmount)}</h6>
                                    </td>
                                </tr>
                            </table>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Col style={{ 'background-color': '#ffffff' }} md={6}>
                        <List dense className={classes.root}>
                            {this.props.owedData.length > 0 ? this.props.owedData.map(trans => (
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${1}`}
                                            src={`../static/images/avatar/avatar.png`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id="item1" primary={trans.paid_by} />
                                    <ListItemSecondaryAction>

                                    </ListItemSecondaryAction>
                                </ListItem>)) : <ListItem button>

                                    <ListItemText id="item1" primary='No Transactions' />
                                    <ListItemSecondaryAction>

                                    </ListItemSecondaryAction>
                                </ListItem>}
                        </List>
                    </Col>
                    <Divider orientation="vertical" flexItem />
                    <Col style={{ 'background-color': '#ffffff' }} md={5.5}>
                        <List dense className={classes.root}>
                            {this.props.oweData.length > 0 ? this.props.oweData.map(trans => (

                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${1}`}
                                            src={photo}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id="item1" primary={trans.owed_name} secondary={<Typography component="span" variant="body2" className={classes.inline} color="textPrimary">Owes you {converter(this.props.user.default_currency).format(trans.total_amt)}</Typography>}/>
                                    
                                </ListItem>)) :
                                <ListItem button>

                                    <ListItemText id="item1" primary='No Transactions' />
                                    <ListItemSecondaryAction>

                                    </ListItemSecondaryAction>
                                </ListItem>}
                        </List>
                    </Col>
                </Row>
                {this.state.show && <PaymentModal show={this.handleModal.bind(this)} />}

            </>)

    }
}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
 }
//Export The Main Component
export default connect(mapStatetoProps)(DashboardMiddle);

