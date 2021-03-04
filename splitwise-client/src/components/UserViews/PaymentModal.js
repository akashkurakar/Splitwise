
import React from "react";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Avatar from '@material-ui/core/Avatar';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImageIcon from '@material-ui/icons/Image';
import cookie from 'react-cookies';
import axios from 'axios';
import {connect} from "react-redux";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

class PaymentModal extends React.Component {
constructor(props){
    super(props);
    this.state={
        show:this.props.show,
        owe:this.props.oweData,
        owed:this.props.owedData,
        users:[],
        userPayee:""
    }
this.handleAddExpenses = this.handleAddExpenses.bind(this);
}
handleClose=()=>{
    this.props.show(false);
}
componentDidMount=()=>{
    let userConn=[];
    this.getUsers();
    // this.state.owe.forEach(element => {
    //     userConn.push(element.paidBy)
    // });
    // this.state.owed.forEach(element => {
    //     userConn.push(element.owed_name)
    // });
}
getUsers=()=>{
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3001/api/users/`)
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                this.setState({
                    users: data
                })
            } else {

            }
        });
}
handleUser=(e)=>{
e.preventDefault();
this.setState({
    userPayee:e.target.value
})

}
handleAddExpenses=(e)=>{
    e.preventDefault();
        const data = {
            user1: this.props.user.name,
            user2: this.props.data.user
        }
        console.log(data)
       
        axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:3001/api/transactions/settle', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    if (response.data === "Successful Login") {
                        this.setState({
                            authFlag: true,
                        })
                    }
                    else if (response.data === "Invalid Credentials!") {
                        this.setState({
                            authFlag: false,
                            errorMessage: true
                        })
                    }
                }
            });
}
    render() {
        return (<Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header style={{ 'background-color': '#5bc5a7' }} closeButton>
                <Modal.Title style={{ 'color': 'white' }}>Add Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                    <Col md={4}> <Chip
                        avatar={<Avatar></Avatar>}
                        label={this.props.user.name}
                        variant="outlined"
                    /></Col>
                        <Col md={2}>
                           <ArrowForwardIcon /> 
                           </Col>
                           <Col md={5}><Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        value={this.props.data.user}
        options={this.state.users.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search User"
            margin="normal"
          
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      /></Col>

                        
                    </Row>
                    <Row> <Col md={3}>
                    
                    </Col>  <Col md={4}><TextField id="standard-basic" label="$" value={this.props.data.amount} /></Col></Row>
                </Container>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Cancel
  </Button>
                <Button variant="primary" style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }} onClick={this.handleAddExpenses}>Pay</Button>
            </Modal.Footer>
        </Modal>)
    }

}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
 }
export default connect(mapStatetoProps)(PaymentModal);