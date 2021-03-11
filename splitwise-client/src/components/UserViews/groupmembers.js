/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

class GroupMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: ['0', '1', '2', '3'],
      members: [],
      users: [],
      user: this.props.user,
      isLoggedIn: false,
    };
    this.onAddMember = this.onAddMember.bind(this);
  }

  componentDidMount() {
    if (this.props.user === undefined) {
      this.setState({ isLoggedIn: false });
    }
    this.getUser();
  }

  handleName = (name, e) => {
    e.preventDefault();
    const { members } = this.state;
    if (members[e.target.id] === undefined) {
      members.push({ name, email: '' });
    } else {
      members[e.target.id].name = name;
    }
    this.setState({
      members,
    });
  };

  getUser = () => {
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3001/api/users/`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          users: data,
        });
      } else {
        // error
      }
    });
  };

  handleEmail = (e) => {
    e.preventDefault();
    const members = this.state.members;
    if (members[e.target.id] === undefined) {
      members.push({ name: '', email: e.target.value });
    } else {
      members[e.target.id].email = e.target.value;
    }
    this.setState({
      members,
    });
  };

  onAddMember = (e) => {
    e.preventDefault();
    const members = this.state.members;
    this.props.onAddMember(members);
  };

  addMember = (e) => {
    e.preventDefault();
    const { rows } = this.state;
    rows.push('new row');
    this.setState({ rows });
  };

  render() {
    return (
      <>
        {this.state.isLoggedIn === false && <login />}
        <div>
          <div className="dropdown-divider" />
          <Typography className="header-label">Group Members</Typography>
          <form className="form-signin" onSubmit={this.handleLogin}>
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
                  <Typography>{this.state.user.name}</Typography>
                </td>
              </tr>
              {this.state.rows.map(() => (
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
                      id="free-solo-2-demo"
                      disableClearable
                      value={this.props.user}
                      options={this.state.users.map((option) => option.name)}
                      onChange={(event, value) => this.handleName(value, event)}
                      renderInput={(params) => (
                        <TextField
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...params}
                          label="Name"
                          margin="normal"
                          InputProps={{ ...params.InputProps, type: 'search' }}
                          style={{ width: 200 }}
                          onBlur={this.onAddMember}
                        />
                      )}
                    />
                  </td>
                  <td>&nbsp;</td>
                  <td>
                    <TextField
                      label="Email Address"
                      margin="normal"
                      style={{ width: 200 }}
                      onChange={this.handleEmail}
                      onBlur={this.onAddMember}
                    />
                  </td>
                </tr>
              ))}
            </table>

            <a href="/#" onClick={this.addMember}>
              +Add Member
            </a>
          </form>
        </div>
      </>
    );
  }
}
GroupMembers.propTypes = {
  onAddMember: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStatetoProps)(GroupMembers);
