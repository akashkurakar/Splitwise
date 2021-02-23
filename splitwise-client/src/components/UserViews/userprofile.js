    import React from "react";
    import UserHeader from "../Dashboard/userheader"
    import Footer from "../../footer"
    import axios from "axios";
    import cookie from 'react-cookies';

    class UserProfile extends React.Component {
        constructor(){
            super();
            this.state={
                name:"",
                email:"",
                phone:"",
                default_currency:"",
                language:"",
                timezone:"",
                errorMessage:false

            }
        }
        componentDidMount(){
            let userId =cookie.load('cookie');
            axios.defaults.withCredentials = true;
            //make a post request with the user data
             axios.get(`http://localhost:3001/api/user?id=${userId}`)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        const data = response.data;
                        console.log(data)
                            this.setState({
                                name:data.name,
                                email:data.email,
                                phone:data.phone,
                                default_currency:data.default_currency,
                                language:data.lang,
                                timezone:data.timezone
                            })
                      
                    }else{

                    }
                });
        }
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
       
        phoneChangeHandler = (e) => {
            this.setState({
                phone : e.target.value
            })
        }

        nameFieldChangeHandler=(e)=>{
            e.preventDefault();
            document.getElementById('name').disabled=false;
        }

        emailFieldChangeHandler=(e)=>{
            e.preventDefault();
            document.getElementById('email').disabled=false;
        }

        phoneFieldChangeHandler=(e)=>{
            e.preventDefault();
            document.getElementById('phone').disabled=false;
        }
        handleCurrencySelect=(e)=>{
            console.log("Inside currency")
            this.setState({
                default_currency : e.target.value
            })
        }
        handleLanguageSelect=(e)=>{
            this.setState({
                language : e.target.value
            })
        }
        handleTimezoneSelect=(e)=>{
            this.setState({
                timezone : e.target.value
            })
        }
        handleSave=(e)=>{
            e.preventDefault();
            const data = {
                name:this.state.name,
                email:this.state.email,
                phone:this.state.phone,
                default_currency:this.state.default_currency,
                language:this.state.language,
                timezone:this.state.timezone
            }
            axios.defaults.withCredentials = true;
            //make a post request with the user data
             axios.post(`http://localhost:3001/api/user/update`,data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        const data = response.data;
                        console.log(data)
                            this.setState({
                                name:data.name,
                                email:data.email,
                                phone:data.phone,
                                default_currency:data.default_currency,
                                language:data.lang,
                                timezone:data.timezone
                            })
                      
                    }else{

                    }
                });
        }
        render() {
            return (<>
            <UserHeader/>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <img src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" width="150" height="150" className="img-fluid" alt="" />
                                <div>
                                    <input id="" name="" type="file" />
                                </div>
                            </div>

                            <div className="col-3">
                                <form className="form-signin" onSubmit={this.handleLogin}>

                                    <div className="form-label-group">
                                        <label for="name">Your Name</label>
                                        <input type="name" id="name" onChange={this.nameChangeHandler} className="form-control" placeholder="Name" value={this.state.name} required disabled />
                                        <a href="/#" onClick={this.nameFieldChangeHandler}>Edit</a>
                                    </div>
                                    <div className="form-label-group">
                                        <label for="address">Your email</label>
                                        <input type="email" id="email" onChange={this.emailChangeHandler} className="form-control" placeholder="Email" value={this.state.email} required disabled />
                                        <a href="/#" onClick={this.emailFieldChangeHandler}>Edit</a>
                                    </div>
                                    <div className="form-label-group">
                                        <label for="address">Your phone number</label>
                                        <input type="phone" id="phone" onChange={this.phoneChangeHandler} className="form-control" placeholder="phone" value={this.state.phone} required disabled />
                                        <a href="/#" onClick={this.phoneFieldChangeHandler}>Edit</a>
                                    </div>


                                </form>
                            </div>
                            <div className="col-3">
                                <form className="form-signin" onSubmit={this.handleSave}>

                                    <div className="form-label-group">
                                    <label for="sel1">Your Default Currency</label>
                                            <select onChange={this.handleCurrencySelect} value={this.state.default_currency} class="form-control" id="sel2">
                                                <option value="USD">USD</option>
                                                <option value="KWD">KWD</option>
                                                <option value="BSD">BSD</option>
                                                <option value="GBP">GBP</option>
                                                <option value="CAD">CAD</option>
                                            </select>
                                    </div>
                                    <div className="form-label-group">
                                        <label for="sel1">Your timezone</label>
                                            <select onChange={this.handleTimezoneSelect} value={this.state.timezone} class="form-control" id="sel2">
                                                <option value="GMT">(GMT)GMT(Greenwich Mean Time)</option>
                                                <option value="IST">(IST)GMT+5:30(Indian Standard Time)</option>
                                                <option value="PST">(PST)GMT-8:00(Pacific Standard Time)</option>
                                                <option value="MST">(MST)GMT-7:00(Mountain Standard Time)</option>
                                                <option value="EST">(EST)GMT-5:00(Eastern Standard Time)</option>
                                            </select>
                                    </div>
                                    <div className="form-label-group">
                                        <label for="sel1">Language</label>
                                            <select onChange={this.handleLanguageSelect} value={this.state.language} class="form-control" id="sel2">
                                                <option value="ENGLISH">English</option>
                                                <option value="CHINESE">Mandarin Chinese</option>
                                                <option value="HINDI">Hindi</option>
                                                <option value="SPANISH">Spanish</option>
                                                <option value="FRENCH"> French</option>
                                            </select>
                                    </div>
                                    <div>
                                        <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit" id="location">Save</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>)
        }
    }
    export default UserProfile;