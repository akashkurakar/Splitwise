import React from "react";
import { connect } from "react-redux";
import UserHeader from "../Dashboard/UserHeader"
import * as userActions from "../../redux/actions/userAction";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            default_currency: "",
            lang: "",
            timezone: "",
            image_path: "",
            username: "",
            user: this.props.user,
            alert: this.props.alert,
            errorMessage: false,
            selectedFile: null
        }

    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            phone: this.props.user.phone,
            default_currency: this.props.user.default_currency,
            lang: this.props.user.lang,
            timezone: this.props.user.timezone,
            image_path: this.props.user.image_path,
            username: this.props.user.username
        })

    }
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
//this.onFileUpload();
    };
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
       // axios.post("api/uploadfile", formData);
    };
    fileData = () => {

        if (this.state.selectedFile) {
            this.onFileUpload()
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    nameFieldChangeHandler = (e) => {
        e.preventDefault();
        document.getElementById('name').disabled = !document.getElementById('name').disabled;
    }

    emailFieldChangeHandler = (e) => {
        e.preventDefault();
        document.getElementById('email').disabled = !document.getElementById('name').disabled;
    }

    phoneFieldChangeHandler = (e) => {
        e.preventDefault();
        document.getElementById('phone').disabled = !document.getElementById('name').disabled;
    }
    handleCurrencySelect = (e) => {
        console.log("Inside currency")
        this.setState({
            default_currency: e.target.value
        })
    }
    handleLanguageSelect = (e) => {
        this.setState({
            language: e.target.value
        })
    }
    handleTimezoneSelect = (e) => {
        this.setState({
            timezone: e.target.value
        })
    }
    handleSave = (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            default_currency: this.state.default_currency,
            lang: this.state.language,
            timezone: this.state.timezone,
            image_path: this.props.user.image_path,
            username: this.props.user.username
        }
        this.props.updateUserProfile(data);
    }
    render() {
        return (<>
            <UserHeader />
            <div>
                <div className="container">
                    {this.props.alert.message !== "" && (<div class="alert alert-success" role="alert">{this.props.alert.message}</div>)}
                    {(this.props.alert.message && this.props.alert.message.response !== undefined) ? (<div class="alert alert-danger" role="alert">{this.props.alert.message.response.data.message}</div>) : null}
                    <div className="row">

                        <div className="col-3">
                           {this.state.selectedFile===null ? <img src={this.state.selectedFile} width="150" height="150" className="img-fluid" alt="" />:<img src="" width="150" height="150" className="img-fluid" alt="" />}
                            <div>
                                <input id="" onSubmit={this.onFileChange} type="file" />
                                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
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
                                    <select onChange={this.handleLanguageSelect} value={this.state.lang} class="form-control" id="sel2">
                                        <option value="ENGLISH">English</option>
                                        <option value="CHINESE">Mandarin Chinese</option>
                                        <option value="HINDI">Hindi</option>
                                        <option value="SPANISH">Spanish</option>
                                        <option value="FRENCH"> French</option>
                                    </select>
                                </div>
                                <div>
                                    <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit" id="location" style={{ float: 'left', 'background-color': '#ff652f' }}>Save</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>)
    }
}
const mapStatetoProps = (state) => {
    return {
        user: state.user,
        alert: state.alert
    }
}
const mapDispatchToProps = {
    updateUserProfile: userActions.updateUserProfile,
}
export default connect(mapStatetoProps, mapDispatchToProps)(UserProfile);