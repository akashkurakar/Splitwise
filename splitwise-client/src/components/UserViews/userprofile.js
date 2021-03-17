/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import UserHeader from '../Dashboard/UserHeader';
import * as userActions from '../../redux/actions/UserAction';
import constants from '../../constants/Constants';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      phone: this.props.user.phone,
      default_currency: this.props.user.default_currency,
      lang: this.props.user.lang,
      timezone: this.props.user.timezone,
      selectedFile: '',
      image_path: this.props.user.image_path,
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.user.id).then(() => {
      this.setState({
        name: this.props.user.name,
        email: this.props.user.email,
        phone: this.props.user.phone,
        default_currency: this.props.user.default_currency,
        lang: this.props.user.lang,
        timezone: this.props.user.timezone,
      });
    });
  }

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event }, () => {
      this.onFileUpload();
    });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append('userprofile', this.state.selectedFile);
    axios
      .put(
        `${constants.baseUrl}/api/uploadfile/?user=${this.props.user.name}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        { responseType: 'blob' }
      )
      .then((res) => {
        this.setState({ image_path: res.data.Location });
      })
      .catch((error) => {
        return error;
      });
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
      lang: e.target.value,
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
      id: this.props.user.id,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      default_currency: this.state.default_currency,
      lang: this.state.lang,
      timezone: this.state.timezone,
      image_path: this.state.image_path,
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
                <form onSubmit={this.onFileUpload} encType="multipart/form-data">
                  {this.state.image_path !== '' ? (
                    <img
                      src={this.state.image_path}
                      width="150"
                      height="150"
                      className="img-fluid"
                      alt=""
                      onChange={this.onFileChange}
                    />
                  ) : (
                    <img
                      width="250"
                      height="250"
                      className="img-fluid"
                      alt=""
                      src={this.props.user.image_path}
                    />
                  )}
                  <div>
                    <input
                      id=""
                      onChange={(e) => this.onFileChange(e.target.files[0])}
                      type="file"
                    />
                  </div>
                </form>
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
                      disabled
                      pattern="^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                      required
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
                      <option value="BHD">BHD</option>
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
  getUser: PropTypes.func.isRequired,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
  };
};
const mapDispatchToProps = {
  updateUserProfile: userActions.updateUserProfile,
  getUser: userActions.getUser,
};
export default connect(mapStatetoProps, mapDispatchToProps)(UserProfile);
