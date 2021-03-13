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
      members: [
        { name: '', email: '' },
        { name: '', email: '' },
        { name: '', email: '' },
        { name: '', email: '' },
      ],
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

  handleName = (name, index) => {
    const rows = this.state.members;
    if (rows[index] === undefined) {
      rows.push({ name, email: '' });
    } else {
      rows[index].name = name;
    }
    this.setState({
      members: rows,
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

  handleEmail = (id, e) => {
    const members = this.state.members;
    if (this.state.members[id] === undefined) {
      members.push({ name: '', email: e.target.value });
    } else {
      members[id].email = e.target.value;
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
    const rows = this.state.members;
    rows.push({ name: '', email: '' });
    this.setState({ members: rows });
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
                      onChange={(event, value) => this.handleName(value, index)}
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
                      id={`email-${index}`}
                      value={r.email}
                      margin="normal"
                      style={{ width: 200 }}
                      onChange={(event) => this.handleEmail(index, event)}
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
