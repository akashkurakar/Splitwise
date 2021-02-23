import React from "react";

class GroupMembers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            grpName:""
        }
        this.grpNameChangeHandler= this.grpNameChangeHandler.bind(this)
       
    }
    
    render(){
        return(
            <>
            <div>
            <form className="form-signin" onSubmit={this.handleLogin}>
                                    <div className="form-label-group">
                                        <label for="email">Name</label>
                                        <input type="text" id="name" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Name" required />
                                        <input type="email" id="email" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="form-label-group">
                                        <label for="email">Name</label>
                                        <input type="text" id="name" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Name" required />
                                        <input type="email" id="email" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="form-label-group">
                                        <label for="email">Name</label>
                                        <input type="text" id="name" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Name" required />
                                        <input type="email" id="email" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="form-label-group">
                                        <label for="email">Name</label>
                                        <input type="text" id="name" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Name" required />
                                        <input type="email" id="email" onChange={this.grpNameChangeHandler} className="form-control" placeholder="Email" required />
                                    </div>
                                </form>
            </div>
            </>
        )
    }
}

export default GroupMembers;