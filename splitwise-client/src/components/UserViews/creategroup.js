/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as groupsActions from '../../redux/actions/GroupsActions';
import UserHeader from '../Dashboard/UserHeader';
import GroupMembers from './GroupMembers';

class CreateGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      grpName: '',
      members: '',
      user: '',
      errorMessage: '',
      imgUrl: '',
    };
    this.handleMembers = this.handleMembers.bind(this);
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
        `http://localhost:3001/api/uploadfile/`,
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

  handleCreateGroup = async (e) => {
    e.preventDefault();
    if (this.state.members.length === 0) {
      this.setState({
        errorMessage: 'Please select at least one member',
      });
      return;
    }
    const data = {
      grp_name: this.state.grpName,
      id: this.state.user.id,
      users: this.state.members,
      imgPath: this.state.imgUrl,
    };
    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:3001/api/group/create', data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message === 'Group Created Successfully!') {
            this.props.getGroups(this.props.user.id);
            this.setState({
              errorMessage: '',
            });

            window.location.href = './dashboard';
          } else {
            this.setState({
              errorMessage: response.data.message,
            });
          }
        }
      })
      .catch((res) => {
        this.setState({
          errorMessage: res.message,
        });
      });
  };

  render() {
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
                          {this.state.errorMessage !== '' && (
                            <div className="alert alert-danger" role="alert">
                              {this.state.errorMessage}
                            </div>
                          )}
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
                          <GroupMembers onAddMember={this.handleMembers} />
                        ) : null}
                        <div>
                          <button
                            className="nav-link button-green-submit text-uppercase"
                            type="submit"
                            id="location"
                          >
                            Create Group
                          </button>
                        </div>
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
    groups: state.groups,
  };
};
const mapDispatchToProps = {
  getGroups: groupsActions.getGroups,
};

CreateGroup.propTypes = {
  getGroups: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
};

export default connect(mapStatetoProps, mapDispatchToProps)(CreateGroup);
