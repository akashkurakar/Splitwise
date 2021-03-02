import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import login from "../login";
class GroupMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grpName: "",
            rows: ['0', '1', '2','3'],
            members:[],
            users:[],
            user:this.props.user,
            isLoggedIn:false
        }
        this.onAddMember = this.onAddMember.bind(this)
    }
    handleName=(e)=>{
        e.preventDefault();
        var members = this.state.members;
        if(members[e.target.id]===undefined){
            members.push({'name':e.target.value,'email':""});
        }else{
            members[e.target.id].name = e.target.value;
        }
        this.setState({
            members:members
        })
    }
    componentDidMount(){
        if(this.props.user===undefined){
            this.setState({isLoggedIn:false})
        }
        this.getUser();
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
                        users: data
                    })
                } else {

                }
            });
    }
    handleEmail=(e)=>{
        e.preventDefault();
        var members = this.state.members;
        console.log(e.target.value);
        if(members[e.target.id]===undefined){
            members.push({'name':"",'email':e.target.value});
        }else{
            members[e.target.id].email = e.target.value;
        }
        this.setState({
            members:members
        })
    }
    onAddMember = (e) => {
        e.preventDefault();
        let members = this.state.members;
        this.props.onAddMember(members);
    }
    addMember = (e) => {
        e.preventDefault();
        var rows = this.state.rows
        rows.push('new row')
        this.setState({ rows: rows })
    }
    render() {
        return (
            <>{this.state.isLoggedIn===false &&<login/>}
                <div>
                    <div class="dropdown-divider"></div>
                    <label>Group Members</label>
                    <form className="form-signin" onSubmit={this.handleLogin}>
                        <table>
                            <tr><td><img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png" width="30" height="30" className="img-fluid" alt="" /></td>
                                <td><label disabled>{this.state.user.name}</label></td>
                            </tr>
                            {this.state.rows.map((r) => (
                                <tr>
                                    <td><img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png" width="30" height="30" className="img-fluid" alt="" /></td>
                                    <td> <input type="name" id={r} onChange={this.handleName} onBlur={this.onAddMember}className="form-control" placeholder="Name" required list={this.state.users}/></td>
                                    {/* <td>  <input list={this.state.users} name="browser" id="browser"/>
                                    <select class="selectpicker" data-show-subtext="true" data-live-search="true">
                                    {this.state.users.map((r) => (
                                        <option data-subtext={r.name}>{r.name}</option>))
                                    }
                                    </select>
      
                                    <datalist id="browsers">
                                    {this.state.users.map((r) => (
                                        <option value={r.name} />))
                                    }
                                    </datalist></td> */}
                                    <td></td>
                                    <td> <input type="email" id={r} className="form-control" onChange={this.handleEmail} onBlur={this.onAddMember} placeholder="Email" required /></td>
                                </tr>
                            ))}
                        </table>

                        <a href="/#" onClick={this.addMember}>+Add Member</a>
                    </form>
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
export default connect(mapStatetoProps)(GroupMembers);