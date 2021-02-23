import React from "react"
import GroupMembers from "./groupmembers";
import axios from 'axios';
class CreateGroup extends React.Component {
    constructor(){
        super();
        this.state={
            grpName:"",
            user_name:"",
            show:false
        }
    }

    grpNameChangeHandler = (e)=>{
       
            this.setState({
                grpName:e.target.value  
        } )
        
    }
    handleCreateGroup = async (e) => {
        e.preventDefault();
        const data = {
            grp_name: this.state.grpName,
            user:this.state.user_name
        }
        console.log(data.grp_name)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
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
            <>
                <div class="row">
                    <div class="flex_container blank_page clearfix">
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-6">
                                    <img src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" width="150" height="150" className="img-fluid" alt="" />            		
                                        <div>
                                            <input id="" name=""  type="file" />
                                        </div>
                                      </div>
                            <div className="content-block">
                                <form className="form-signin" onSubmit={this.handleCreateGroup}>
                                    <div className="form-label-group">
                                        <label for="email">Group name shall be</label>
                                        <input type="text" id="grp_name" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Group Name" required />
                                    </div>
                                    <div>
                                        <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit" id="location">Create Group</button>
                                    </div>
                                    {this.state.show ? <GroupMembers/>:null}
                                </form>
                            </div>
                        </div>
                           

                    </div>
                </div>
            </div>
       
        </>)
    }

}
export default CreateGroup