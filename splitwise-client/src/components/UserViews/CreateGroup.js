/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import { Redirect } from 'react-router-dom';
import * as groupsActions from '../../redux/actions/GroupsActions';
import constants from '../../constants/Constants';
import UserHeader from '../Dashboard/UserHeader';

class CreateGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      grpName: '',
      members: [{ name: '', email: '' }],
      user: '',
      users: [],
      errorMessage: '',
      imgUrl: '',
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
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
        `${constants.baseUrl}/api/uploadfile/`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        { responseType: 'blob' }
      )
      .then((res) => {
        this.setState({
          imgUrl: res.data.Location,
        });
      })
      .catch((error) => {
        return error;
      });
  };

  grpNameChangeHandler = (e) => {
    this.setState({
      grpName: e.target.value,
    });
  };

  handleMembers = (childData) => {
    this.setState({
      members: childData,
    });
  };

  handleName = (e) => {
    this.getNames(e.target.value);
  };

  handleEmail = (e, id) => {
    this.getEmail(e.target.value, id);
  };

  getNames = (name) => {
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/api/users/?name=${name}`).then((response) => {
      if (response.status === 200) {
        const res = response.data.data;
        this.setState({
          users: res,
        });
      } else {
        // error
      }
    });
  };

  addName = (name, index) => {
    this.setState((prevState) => {
      const rows = prevState.members;
      let email = '';
      const data = prevState.users.filter((user) => user.name === name.target.value);
      if (data.length > 0) {
        email = data[0].email;
      }
      if (rows[index] === undefined) {
        rows.push({ name, email: '' });
      } else {
        rows[index].name = name.target.value;
        rows[index].email = email;
      }
      return {
        members: rows,
      };
    });
  };

  addEmail = (e, id) => {
    this.setState((prevState) => {
      const { members } = prevState;
      let name = '';
      if (e !== 0) {
        name = prevState.users.filter((user) => user.email === e)[0].name;
      }
      if (prevState.members[id] === undefined) {
        members.push({ name: '', email: e });
      } else {
        members[id].email = e;
        members[id].name = name;
      }
      return {
        members,
      };
    });
  };

  addMember = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      const { members } = prevState;
      members.push({ name: '', email: '' });
      return members;
    });
  };

  removeMember = (e, index) => {
    this.setState((prevState) => {
      const rows = prevState.members;
      rows.splice(index, 1);
      return { members: rows };
    });
  };

  handleCreateGroup = async (e) => {
    e.preventDefault();
    if (this.state.members.length === 0) {
      this.setState({
        errorMessage: 'Please select at least one member',
      });
      return;
    }
    this.setState({
      errorMessage: '',
    });

    const data = {
      grp_name: this.state.grpName,
      id: this.state.user._id,
      users: this.state.members,
      imgPath: this.state.imgUrl,
    };
    this.props.createGroups(data);
    this.props.getGroups(this.props.user._id);
  };

  render() {
    if (this.state.redirect) {
      <Redirect to="/dashboard" />;
    }
    return (
      <>
        <UserHeader />
        <div className="flex_container blank_page clearfix">
          <div className="card">
            <div className="row no-gutters">
              <div className="container max-auto">
                <div className="row">
                  <div className="col-3" />
                  <div className="col-3">
                    <form onSubmit={this.onFileUpload} encType="multipart/form-data">
                      {this.state.imgUrl !== '' ? (
                        <img
                          src={this.state.imgUrl}
                          width="150"
                          height="150"
                          className="img-fluid"
                          alt=""
                          onChange={this.onFileChange}
                        />
                      ) : (
                        <img
                          width="150"
                          height="150"
                          className="img-fluid"
                          alt=""
                          src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
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

                  <div className="col-4">
                    <div className="content-block">
                      <form className="form-signin" onSubmit={this.handleCreateGroup}>
                        <div className="form-label-group">
                          {this.props.alert.message && this.props.alert.message !== undefined ? (
                            <div className="alert alert-danger" role="alert">
                              {this.props.alert.message}
                            </div>
                          ) : null}
                          {this.state.errorMessage ? (
                            <div className="alert alert-danger" role="alert">
                              {this.state.errorMessage}
                            </div>
                          ) : null}
                          <Typography className="header-label">Group name shall be</Typography>
                          <input
                            type="text"
                            id="grp_name"
                            onChange={this.grpNameChangeHandler}
                            className="form-control"
                            placeholder="Group Name"
                            required
                          />
                        </div>
                        {this.state.grpName !== '' ? (
                          <div>
                            <div className="dropdown-divider" />
                            <Typography className="header-label">Group Members</Typography>
                            <table>
                              <tr>
                                <td>
                                  <img
                                    src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png"
                                    width="20"
                                    height="20"
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <Typography>{this.props.user.name}</Typography>
                                </td>
                              </tr>
                              {this.state.members.map((r, index) => (
                                <tr>
                                  <td>
                                    <img
                                      src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png"
                                      width="30"
                                      height="30"
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </td>
                                  <td>
                                    <Autocomplete
                                      freeSolo
                                      id={`name-${index}`}
                                      disableClearable
                                      value={r.name}
                                      options={this.state.users.map((option) => option.name)}
                                      onKeyPress={(event) => this.handleName(event, index)}
                                      renderInput={(params) => (
                                        <TextField
                                          // eslint-disable-next-line react/jsx-props-no-spreading
                                          {...params}
                                          label="Name"
                                          margin="normal"
                                          InputProps={{ ...params.InputProps, type: 'search' }}
                                          style={{ width: 200 }}
                                          onBlur={(event) => this.addName(event, index)}
                                          pattern="^\s*$"
                                          required
                                        />
                                      )}
                                    />
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>
                                    <Autocomplete
                                      freeSolo
                                      id={`name-${index}`}
                                      disableClearable
                                      value={r.email}
                                      options={this.state.users.map((option) => option.email)}
                                      onChange={(_event, value) => this.handleEmail(value, index)}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Email Address"
                                          value={r.email}
                                          margin="normal"
                                          style={{ width: 200 }}
                                          InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
                                          }}
                                          onChange={(event) => this.addEmail(event, index)}
                                          type="email"
                                        />
                                      )}
                                    />
                                  </td>
                                  {index > 0 && (
                                    <td>
                                      <CloseIcon
                                        onClick={(event) => this.removeMember(event, index)}
                                      />
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </table>

                            <a href="/#" onClick={this.addMember}>
                              +Add Member
                            </a>

                            <button
                              className="nav-link button-green-submit text-uppercase"
                              type="submit"
                              id="location"
                            >
                              Create Group
                            </button>
                          </div>
                        ) : null}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    groups: state.groups.groups,
    alert: state.alert,
  };
};
const mapDispatchToProps = {
  getGroups: groupsActions.getGroups,
  createGroups: groupsActions.createGroups,
};

CreateGroup.propTypes = {
  getGroups: PropTypes.func.isRequired,
  createGroups: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  alert: PropTypes.objectOf.isRequired,
};

export default connect(mapStatetoProps, mapDispatchToProps)(CreateGroup);
