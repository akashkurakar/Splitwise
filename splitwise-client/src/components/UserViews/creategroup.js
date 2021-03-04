import React from "react"
import GroupMembers from "./GroupMembers";
import axios from 'axios';
    import UserHeader from "../Dashboard/UserHeader" ;
    import FormData from 'form-data'
    import {connect} from "react-redux";
class CreateGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            grpName: "",
            members:"",
            user:"",
            image:{
                review:"",
                raw:""
            },  
        }
        this.handleMembers = this.handleMembers.bind(this);
        
       
    }   
    handleChange = e => {
        if (e.target.files.length) {
          this.setState({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
        }
      };
      handleUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.image.raw);
    
        await axios.put('http://localhost:3001/api/group/create', formData, {
            headers: {
              'Content-Type': formData.type
            }
          });
      };
    grpNameChangeHandler = (e) => {

        this.setState({
            grpName: e.target.value
        })

    }
    handleMembers=(childData)=>{
        console.log(childData);
        this.setState({
            members:childData
        })

        
    }
    componentDidMount(){
       this.setState({
        user : this.props.user
       })
    }
   
    handleCreateGroup = async (e) => {
        e.preventDefault();
        const data = {
            grp_name: this.state.grpName,
            user: this.state.user.name,
            users: this.state.members
        }
        console.log(data)
       
        axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:3001/api/group/create', data)
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
        return (
            <><UserHeader/>
                        <div class="flex_container blank_page clearfix">
                            <div className="card">
                                <div className="row no-gutters">
                                <div className="container max-auto">
                                    <div class="row">
                                    <div className="col-3">
                                    </div>
                                    <div className="col-3">
                                    {this.state.image.preview ? ( <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
        ) : (<img  src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" width="150" height="150" className="img-fluid" alt="" onChange={this.handleChange}/>)}
                                        <div>
                                            <input id="" onChange={this.handleUpload} name="" type="file" />
                                        </div>
                                    </div>
                                    
                                    <div className="col-4">
                                        <div className="content-block">
                                            <form className="form-signin" onSubmit={this.handleCreateGroup}>

                                                <div className="form-label-group">
                                                    <label for="email">Group name shall be</label>
                                                    <input type="text" id="grp_name" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Group Name" required />
                                                </div>
                                                {this.state.grpName!=="" ? <GroupMembers onAddMember={this.handleMembers.bind(this)}/> : null}
                                                <div>
                                                    <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit" id="location">Create Group</button>
                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
    }

}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
}
export default  connect(mapStatetoProps)(CreateGroup)