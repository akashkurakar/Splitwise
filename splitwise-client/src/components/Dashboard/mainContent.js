import React from 'react';
import LeftSideBar from './LeftSidebar';
import RightSideBar from './RightSidebar';
import Activity from "../UserViews/UserActivity";
import UserDashboard from "../UserViews/UserDashboard";
import CreateGroup from "../UserViews/CreateGroup";
import cookie from 'react-cookies';
import UserGroups from '../UserViews/UserGroups';
import axios from "axios";
import SelectGroup from '../UserViews/SelectGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from "react-redux";
import UserHeader from "../Dashboard/UserHeader"
import Notification from "../UserViews/Notifications"

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            groups: [],
            selectedGroup: "",
            transactions:[],
            balances:[],
            oweData:"",
            owedData:"",
            user:this.props.user
        }
        this.handleCallback = this.handleCallback.bind(this);
    }
    
    componentDidMount() {
        this.getGroups();
        this.getTransactionByUser();
        this.getBalances();
        this.getTotalTransactionByUser();
    }
    getTransactionByUser=()=>{
        let userId = this.state.user.name;
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
    getTotalTransactionByUser=()=>{
        let userId = this.state.user.name;
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
    getBalances=()=>{
        let userId = this.state.user.name;
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
    getGroups = () => {
        let userId = this.state.user.name;
        console.log("props"+userId)
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/api/groups/?id=${userId}`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    this.setState({
                        groups: data
                    })
                } else {

                }
            });
    }
    handleCallback = (childData) => {
        console.log(childData);
        this.setState({ step: childData })
    }
    handleSelectedGroup = (selectedGroup) => {
        console.log(selectedGroup);
        this.setState({ selectedGroup });
    }
    render() {
      
        console.log(cookie.load('cookie'))
        return (
            
            <> <UserHeader/>
                <div>
                    <Container>
                        <Row>
                            <Col style={{ 'background-color': '#ffffff' }} md={3}>
                                <LeftSideBar getStep={this.handleCallback.bind(this)} groups={this.state.groups} selectedGroup={this.handleSelectedGroup.bind(this)} />
                            </Col>
                            <Col md={6}>
                                {this.state.step === 1 ? <UserDashboard oweData={this.state.oweData} owedData={this.state.owedData} balances={this.state.balances}/> : null}
                                {this.state.step === 2 ? <Activity transactions={this.state.transactions}/> : null}
                                {this.state.step === 4 ? <CreateGroup /> : null}
                                {this.state.step === 5 ? <UserGroups groups={this.state.groups} /> : null}
                                {this.state.step === 6 ? <SelectGroup selectedGroup={this.state.selectedGroup} /> : null}
                                {this.state.step === 7 && <Notification/>}
                            </Col>
                            <Col style={{ 'background-color': '#ffffff' }} md={3}>
                                <RightSideBar />
                            </Col>
                        </Row>
                    </Container>
                    
                </div>
            </>
        )
    }
}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
 }
//Export The Main Component
export default connect(mapStatetoProps)(MainContent);