import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { connect } from "react-redux";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
class AddExpenseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            user: this.props.user
        }
    }
    handleDescription = (e) => {
        this.setState({
            description: e.target.value,

        })
        this.handleClose = this.handleClose.bind(this);
    }

    handleAmount = (e) => {
        this.setState({
            amount: e.target.value
        })
    }
    handleClose = () => {
        this.props.show(false);
    }
    handleAddExpenses = () => {
        axios.defaults.withCredentials = true;
        const data = {
            user: this.state.user.name,
            grpName: this.props.grp_name,
            description: this.state.description,
            amount: this.state.amount
        }
        axios.post(`http://localhost:3001/api/transactions`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    this.setState({
                        transactions: data
                    })
                    this.setState({
                        show:false
                    }
                    )
                } else {
                    this.setState({
                        show:true
                    }
                    )
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
                <Modal.Title style={{ 'color': 'white' }}>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>With you and:<Chip
                        avatar={<Avatar></Avatar>}
                        label={this.props.grp_name}
                        variant="outlined"
                    /></label>
                </div>


                <Dropdown.Divider />
                <Container>
                    <Row>
                        <Col md={3}>
                            <img src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" width="100" height="100" className="img-fluid" alt="" />
                        </Col>
                        <Col md={8}>
                            <div className="clearfix">
                                <input type="description" id="description" className="form-control" placeholder="Enter Description" required onChange={this.handleDescription} />
                            </div>
                            <div className="clearfix">
                                <input type="amount" id="amount" onChange={this.handleAmount} className="form-control" placeholder="Amount" required />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Cancel
</Button>
                <Button variant="primary" style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }} onClick={this.handleAddExpenses}>Add</Button>
            </Modal.Footer>
        </Modal>)
    }
}
const mapStatetoProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStatetoProps)(AddExpenseModal);
