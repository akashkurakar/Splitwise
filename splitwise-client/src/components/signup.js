import React from 'react';
import Footer from "../footer";
import {connect} from "react-redux";
import * as userActions from "../redux/actions/userAction"
import Header from "../header"
class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            user:""
        }
    }
      
    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    
    handleSignUp = async (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signupUser(data);
       
    }

    render() {
        const { errorMessage } = this.state;
        return (
            <>   <Header/>
                <div className="container"  style={{margin:'5%'}}>
                    <div className="row">
                    <div className="col-4">
                </div>
                            <div className="col-6">
                                <div id="card-body" className="card-body">
                                    <h5 className="card-title text-center">Hi there! Sign me up!</h5>
                                    <form className="form-signin" onSubmit={this.handleSignUp}>
                                        {errorMessage && <p>User already present! Please sign in</p>}
                                        <div className="form-label-group">
                                            <label for="inputEmail">My name is</label>
                                            <input type="name" onChange={this.nameChangeHandler} id="name" className="form-control" placeholder="Full Name" required
                                                autofocus />
                                        </div>
                                        <div className="form-label-group">
                                            <label for="email">Heres my email address</label>
                                            <input type="email" id="email" onChange={this.emailChangeHandler} className="form-control" placeholder="email" required />
                                        </div>
                                        <label for="address">And here's my password</label>
                                        <input type="password" id="password" onChange={this.passwordChangeHandler} className="form-control" placeholder="Password" required />
                                        <div>
                                            <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit" id="location">Sign me up!</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                   
                <Footer />
            </>
        );
    }
}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
 }
 const mapDispatchToProps ={
    signupUser : userActions.signupUser
 }

export default connect(mapStatetoProps,mapDispatchToProps)(SignUp);