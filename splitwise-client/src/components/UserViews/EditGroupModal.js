/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
/* eslint-disable arrow-body-style */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import * as transactionActions from '../../redux/actions/TransactionAction';
import * as groupsActions from '../../redux/actions/GroupsActions';
import constants from '../../constants/Constants';

class EditGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: this.props.showEdit,
      errorMessage: '',
      grp_name: this.props.group.grp_name,
      members: [{ name: '', email: '' }],
      users: [],
      grp_id: this.props.group.grp_id,

      imgUrl: this.props.group.image_path,
      group: '',
      selectedFile: '',
      // group: '',
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.setState({ group: this.props.group });
    //  this.getUser();
  }

  handleClose = () => {
    this.props.showEdit(false);
  };

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
      grp_name: e.target.value,
    });
  };

  handleName = (e) => {
    this.getNames(e.target.value);
  };

  handleEmail = (e, id) => {
    this.getEmail(e.target.value, id);
  };

  addName = (name, index) => {
    this.setState((prevState) => {
      const rows = prevState.members;
      const email = this.state.users.filter((user) => user.name === name.target.value)[0].email;
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
      const members = prevState.members;
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

  handleMembers = (childData) => {
    this.setState({
      members: childData,
    });
  };

  addMember = (e) => {
    e.preventDefault();
    const rows = this.state.members;
    rows.push({ name: '', email: '' });
    this.setState({ members: rows });
  };

  removeMember = (e, index) => {
    this.setState((prevState) => {
      const rows = prevState.members;
      rows.splice(index, 1);
      return { members: rows };
    });
  };

  handleEditGroup = async (e) => {
    e.preventDefault();
    if (this.state.members.length === 0) {
      this.setState({
        errorMessage: 'Please select at least one member',
      });
      return;
    }
    const data = {
      grp_name: this.state.grp_name,
      user: this.props.user._id,
      users: this.state.members,
      imgPath: this.state.imgUrl,
      grp_id: this.state.grp_id,
    };
    this.props.editGroup(data);
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

  render() {
    return (
      <Container style={{ 'min-height': '100vh', 'min-width': '250vh' }}>
        <Modal
          size="lg"
          show={this.state.showEdit}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header style={{ 'background-color': '#5bc5a7' }} closeButton>
            <Modal.Title style={{ color: 'white' }}>Edit Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={4}>
                  {' '}
                  <form onSubmit={this.onFileUpload} encType="multipart/form-data">
                    {this.state.group.image_path !== '' || this.state.imgUrl !== '' ? (
                      <img
                        src={this.state.imgUrl}
                        width="150"
                        height="150"
                        className="img-fluid"
                        alt=""
                        onChange={(e) => this.onFileChange(e.target.files[0])}
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
                </Col>
                <Col md={4}>
                  {' '}
                  <form className="form-signin" onSubmit={this.handleEditGroup}>
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
                        value={this.state.grp_name}
                        required
                      />
                    </div>
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
                                onChange={(event, value) => this.handleEmail(value, index)}
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
                                <CloseIcon onClick={(event) => this.removeMember(event, index)} />
                              </td>
                            )}
                          </tr>
                        ))}
                      </table>

                      <a href="/#" onClick={this.addMember}>
                        +Add Member
                      </a>
                    </div>
                    <div>
                      <button
                        className="nav-link button-green-submit text-uppercase"
                        type="submit"
                        id="location"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>]</Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

EditGroupModal.propTypes = {
  show: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  grp: PropTypes.string.isRequired,
  getTransaction: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  showEdit: PropTypes.func.isRequired,
  group: PropTypes.objectOf.isRequired,
  users: PropTypes.objectOf.isRequired,
  editGroup: PropTypes.func.isRequired,
  alert: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
    alert: state.alert,
    groups: state.groups.groups,
    users: state.users,
  };
};

const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
  getGroups: groupsActions.getGroups,
  editGroup: groupsActions.editGroup,
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditGroupModal);
