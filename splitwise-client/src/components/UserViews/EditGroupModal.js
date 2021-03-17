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
      members: [
        { name: '', email: '' },
        { name: '', email: '' },
        { name: '', email: '' },
        { name: '', email: '' },
      ],
      grp_id: this.props.group.grp_id,
      users: [],
      imgUrl: this.props.group.image_path,
      group: '',
      selectedFile: '',
      // group: '',
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.setState({ group: this.props.group });
    this.getUser();
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

  handleMembers = (childData) => {
    this.setState({
      members: childData,
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

  addMember = (e) => {
    e.preventDefault();
    const rows = this.state.members;
    rows.push({ name: '', email: '' });
    this.setState({ members: rows });
  };

  getUser = () => {
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/api/users/`).then((response) => {
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
      user: this.props.user.name,
      users: this.state.members,
      imgPath: this.state.imgUrl,
      grp_id: this.state.grp_id,
    };
    axios.defaults.withCredentials = true;
    axios
      .put(`${constants.baseUrl}/api/group/`, data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data === 'Group updated successfully!') {
            this.props.getGroups(this.props.user.name);
            this.setState({
              errorMessage: response.data,
              members: [
                { name: '', email: '' },
                { name: '', email: '' },
                { name: '', email: '' },
                { name: '', email: '' },
              ],
            });
            // window.location.href = './dashboard';
          } else {
            this.setState({
              errorMessage: response.data,
              members: [
                { name: '', email: '' },
                { name: '', email: '' },
                { name: '', email: '' },
                { name: '', email: '' },
              ],
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
                    {this.state.group.image_path !== '' ? (
                      <img
                        src={this.state.group.image_path}
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
                        value={this.state.grp_name}
                        required
                      />
                    </div>
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
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
    alert: state.alert,
    groups: state.groups,
  };
};

const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
  getGroups: groupsActions.getGroups,
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditGroupModal);
