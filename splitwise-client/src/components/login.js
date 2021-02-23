import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Footer from "../footer"
import Header from "../header"
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag:false
        }
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
    
    handleLogin = (e)=>{
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/api/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    if (response.data === "Valid credentials") {
                        this.setState({
                            authFlag: true,
                        })

                    }
                    else if (response.data === "Invalid credentials") {
                        this.setState({
                            authFlag: false,
                            errorMessage: true
                        })
                    }
                }
            });
    }
render() {
    const { errorMessage } = this.state;
    const{authFlag} = this.state;
    return (
        <>
          <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div id="card-body" className="card-body">
                                <h5 className="card-title text-center">Please login!</h5>
                                <form className="form-signin" onSubmit={this.handleLogin}>
                                    {errorMessage && <p>User already present! Please sign in</p>}
                                    <div className="form-label-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" onChange={this.emailChangeHandler} className="form-control" placeholder="email" required />
                                    </div>
                                    <label for="address">Password</label>
                                    <input type="password" id="password" onChange={this.passwordChangeHandler} className="form-control" placeholder="Password" required />
                                    <div>
                                        <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit" id="location">Sign me up!</button>
                                    </div>
                                    {authFlag && <Redirect to="/dashboard" />}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
}
export default Login;