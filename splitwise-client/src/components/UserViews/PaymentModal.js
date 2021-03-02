
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
class PaymentModal extends React.Component {
constructor(props){
    super(props);
    this.state={
        show:this.props.show
    }
this.handleAddExpenses = this.handleAddExpenses.bind(this);
}
handleClose=()=>{
    this.props.show(false);
}
handleAddExpenses=(e)=>{
    this.props.show(false);
}
    render() {
        let userId = cookie.load('cookie');
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
                        <Col >

                        </Col>
                        <Col >
                            <Row>
                                <Col md={2}>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </Col>
                                <Col md={1}>
                                    <ArrowForwardIcon />
                                </Col>
                                <Col md={2}>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </Col>
                            </Row>
                        </Col>

                        <Col  >

                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <TextField id="standard-basic" label={userId} style={{ margin: '0', padding: "0", float: 'left' }}   /><TextField id="standard-basic"  style={{ margin: '0', padding: "0", float: 'right' }} />

                        </Col>
                    </Row>
                    <Row> <Col>

                    </Col>  <Col md={4}><TextField id="standard-basic" label="$" /></Col></Row>
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
export default PaymentModal;