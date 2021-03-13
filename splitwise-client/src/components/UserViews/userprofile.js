/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import UserHeader from '../Dashboard/UserHeader';
import * as userActions from '../../redux/actions/UserAction';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      default_currency: '',
      lang: '',
      timezone: '',
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      phone: this.props.user.phone,
      default_currency: this.props.user.default_currency,
      lang: this.props.user.lang,
      timezone: this.props.user.timezone,
    });
  }

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    // this.onFileUpload();
  };

  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('myFile', this.state.selectedFile);

    // Details of the uploaded file

    // Request made to the backend api
    // Send formData object
    // axios.post('api/uploadfile', formData);
  };

  fileData = () => {
    if (this.state.selectedFile) {
      this.onFileUpload();
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
      name: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  phoneChangeHandler = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  nameFieldChangeHandler = (e) => {
    e.preventDefault();
    document.getElementById('name').disabled = !document.getElementById('name').disabled;
  };

  emailFieldChangeHandler = (e) => {
    e.preventDefault();
    document.getElementById('email').disabled = !document.getElementById('name').disabled;
  };

  phoneFieldChangeHandler = (e) => {
    e.preventDefault();
    document.getElementById('phone').disabled = !document.getElementById('name').disabled;
  };

  handleCurrencySelect = (e) => {
    this.setState({
      default_currency: e.target.value,
    });
  };

  handleLanguageSelect = (e) => {
    this.setState({
      language: e.target.value,
    });
  };

  handleTimezoneSelect = (e) => {
    this.setState({
      timezone: e.target.value,
    });
  };

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
      username: this.props.user.username,
    };
    this.props.updateUserProfile(data);
  };

  render() {
    return (
      <>
        <UserHeader />
        <div>
          <div className="container">
            {this.props.alert.message !== '' && this.props.alert.message !== undefined ? (
              <div className="alert alert-success" role="alert">
                {this.props.alert.message}
              </div>
            ) : null}
            {this.props.alert.message && this.props.alert.message.response !== undefined ? (
              <div className="alert alert-danger" role="alert">
                {this.props.alert.message.response.data.message}
              </div>
            ) : null}
            <div className="row">
              <div className="col-3">
                {this.state.selectedFile === null ? (
                  <img
                    src={this.state.selectedFile}
                    width="150"
                    height="150"
                    className="img-fluid"
                    alt=""
                    onChange={this.imageUpload}
                  />
                ) : (
                  <img src="" width="150" height="150" className="img-fluid" alt="" />
                )}
                <div>
                  <input id="" onSubmit={this.onFileChange} type="file" />
                  <button type="button" onClick={this.onFileUpload}>
                    Upload!
                  </button>
                </div>
              </div>

              <div className="col-3">
                <form className="form-signin" onSubmit={this.handleLogin}>
                  <div className="form-label-group">
                    <Typography>Your Name</Typography>
                    <input
                      type="name"
                      id="name"
                      onChange={this.nameChangeHandler}
                      className="form-control"
                      placeholder="Name"
                      value={this.state.name}
                      required
                      disabled
                    />
                    <a href="/#" onClick={this.nameFieldChangeHandler}>
                      Edit
                    </a>
                  </div>
                  <div className="form-label-group">
                    <Typography>Your email</Typography>
                    <input
                      type="email"
                      id="email"
                      onChange={this.emailChangeHandler}
                      className="form-control"
                      placeholder="Email"
                      value={this.state.email}
                      required
                      disabled
                    />
                    <a href="/#" onClick={this.emailFieldChangeHandler}>
                      Edit
                    </a>
                  </div>
                  <div className="form-label-group">
                    <Typography>Your phone number</Typography>
                    <input
                      type="phone"
                      id="phone"
                      onChange={this.phoneChangeHandler}
                      className="form-control"
                      placeholder="phone"
                      value={this.state.phone}
                      required
                      disabled
                    />
                    <a href="/#" onClick={this.phoneFieldChangeHandler}>
                      Edit
                    </a>
                  </div>
                </form>
              </div>
              <div className="col-3">
                <form className="form-signin" onSubmit={this.handleSave}>
                  <div className="form-label-group">
                    <Typography>Your Default Currency</Typography>
                    <div>
                      <medium className="text-muted">(For new expenses)</medium>
                    </div>

                    <select
                      onChange={this.handleCurrencySelect}
                      value={this.state.default_currency}
                      className="form-control"
                      id="sel2"
                    >
                      <option value="USD">USD</option>
                      <option value="KWD">KWD</option>
                      <option value="BHBHD">BHD</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                  <div className="form-label-group">
                    <Typography>Your timezone</Typography>
                    <select
                      onChange={this.handleTimezoneSelect}
                      value={this.state.timezone}
                      className="form-control"
                      id="sel2"
                    >
                      <option value="GMT">(GMT)GMT(Greenwich Mean Time)</option>
                      <option value="IST">(IST)GMT+5:30(Indian Standard Time)</option>
                      <option value="PST">(PST)GMT-8:00(Pacific Standard Time)</option>
                      <option value="MST">(MST)GMT-7:00(Mountain Standard Time)</option>
                      <option value="EST">(EST)GMT-5:00(Eastern Standard Time)</option>
                    </select>
                  </div>
                  <div className="form-label-group">
                    <Typography>Language</Typography>
                    <select
                      onChange={this.handleLanguageSelect}
                      value={this.state.lang}
                      className="form-control"
                      id="sel2"
                    >
                      <option value="ENGLISH">English</option>
                      <option value="CHINESE">Mandarin Chinese</option>
                      <option value="HINDI">Hindi</option>
                      <option value="SPANISH">Spanish</option>
                      <option value="FRENCH"> French</option>
                    </select>
                  </div>
                  <div>
                    <button
                      className="btn btn-lg btn-success btn-block text-uppercase"
                      type="submit"
                      id="location"
                      style={{ float: 'left', 'background-color': '#ff652f' }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
UserProfile.propTypes = {
  alert: PropTypes.objectOf.isRequired,
  user: PropTypes.objectOf.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
  };
};
const mapDispatchToProps = {
  updateUserProfile: userActions.updateUserProfile,
};
export default connect(mapStatetoProps, mapDispatchToProps)(UserProfile);
