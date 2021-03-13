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
      image: {
        review: '',
        raw: '',
      },
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

  imageUpload = (e) => {
    const file = e.target.files[0];
    this.getBase64(file).then((url) =>
      this.setState({
        imgUrl: url,
      })
    );
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new global.FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
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
      user: this.state.user.name,
      users: this.state.members,
      imgPath: this.state.imgUrl,
    };
    axios.defaults.withCredentials = true;
    axios
      .post('http://localhost:3001/api/group/create', data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message === 'Group Created Successfully!') {
            this.props.getGroups(this.props.user.name);
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
                    {this.state.image.preview ? (
                      <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
                    ) : (
                      <img
                        src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                        width="150"
                        height="150"
                        className="img-fluid"
                        alt=""
                        onChange={this.handleChange}
                      />
                    )}
                    <div>
                      <input id="" onChange={this.imageUpload} name="" type="file" />
                    </div>
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
