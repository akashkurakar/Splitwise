/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commentActions from '../../redux/actions/CommentAction';
import { convertDate } from '../../constants/CommonService';
import DeleteComment from './DeleteComment';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      show: false,
      index: '',
    };
  }

  componentDidMount = () => {
    this.getComments();
  };

  handleCommentModal = (e, index) => {
    const { show } = this.state;
    this.setState({ show: !show, index });
  };

  handleComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  addComment = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const data = {
      user: this.props.user._id,
      group: this.props.group,
      comment: this.state.comment,
      transaction_id: this.props.transaction,
    };
    await this.props.addComments(data);
    this.setState({ comment: '' });
  };

  getComments = async () => {
    await this.props.getComments(this.props.transaction);
  };

  removeComments = async (e, index) => {
    await this.props.removeComments(this.props.transaction, index);
  };

  render() {
    return (
      <>
        <Col md={5}>&nbsp;</Col>
        <Col md={7}>
          <Typography className="header-label">
            <ChatBubbleOutlineIcon style={{ fontSize: 20 }} />
            Notes and Comments
          </Typography>
          <List>
            {this.props.comments.length > 0 ? (
              this.props.comments.map((c) => (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography>
                        {this.props.users.filter((usr) => usr._id === c.comment_by)[0].name}
                        &nbsp;
                        <span className="header-label">{convertDate(c.createdAt)}</span>
                      </Typography>
                    }
                    secondary={c.comment}
                  />

                  {this.props.user._id === c.comment_by && (
                    <CloseIcon
                      style={{ fontSize: 15, color: 'red' }}
                      onClick={(event) => this.handleCommentModal(event, c._id)}
                    />
                  )}

                  <Divider />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No Comments" />
              </ListItem>
            )}
          </List>
          <form onSubmit={this.addComment} encType="multipart/form-data">
            <TextareaAutosize
              rowsMax={4}
              aria-label="maximum height"
              placeholder=""
              defaultValue=""
              value={this.state.comment}
              required
              onChange={this.handleComment}
            />
            <div>
              <Button
                variant="primary"
                style={{
                  'background-color': '#ff652f',
                  'border-color': '#5bc5a7',
                }}
                className="btn btn-2 btn-success pull-right text-uppercase"
                type="submit"
                id="location"
              >
                POST
              </Button>
            </div>
          </form>
        </Col>
        {this.state.show && (
          <DeleteComment
            show={this.handleCommentModal}
            transaction={this.props.transaction}
            index={this.state.index}
          />
        )}
      </>
    );
  }
}

CommentBox.propTypes = {
  user: PropTypes.objectOf.isRequired,
  users: PropTypes.objectOf.isRequired,
  group: PropTypes.string.isRequired,
  transaction: PropTypes.string.isRequired,
  addComments: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  removeComments: PropTypes.func.isRequired,
  comments: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    alert: state.alert,
    comments: state.comments,
  };
};
const mapDispatchToProps = {
  removeComments: commentActions.removeComments,
  getComments: commentActions.getComments,
  addComments: commentActions.addComments,
};

export default connect(mapStatetoProps, mapDispatchToProps)(CommentBox);
