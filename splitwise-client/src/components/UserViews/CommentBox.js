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
import constants from '../../constants/Constants';
import { convertDate } from '../../constants/CommonService';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      comment: '',
    };
  }

  componentDidMount = () => {
    this.getComments();
  };

  handleComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  addComment = () => {
    axios.defaults.withCredentials = true;
    const data = {
      user: this.props.user._id,
      group: this.props.group,
      comment: this.state.comment,
      transaction_id: this.props.transaction,
    };
    axios.post(`${constants.baseUrl}/api/comment/post`, data).then((response) => {
      if (response.status === 200) {
        const res = response.data;
        if (res.message === 'Comment added successfully!') {
          this.getComments();
          this.state.comment = '';
        }
      } else {
        // error
      }
    });
  };

  getComments = () => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${constants.baseUrl}/api/comments/?id=${this.props.transaction}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.setState({
            comments: data.data,
          });
        } else {
          // error
        }
      });
  };

  removeComments = (e, index) => {
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/api/comment/delete?id=${index}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          comments: data.data,
        });
        this.getComments();
      } else {
        // error
      }
    });
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
            {this.state.comments.length > 0 ? (
              this.state.comments.map((c) => (
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

                  <CloseIcon
                    style={{ fontSize: 15, color: 'red' }}
                    onClick={(event) => this.removeComments(event, c._id)}
                  />

                  <Divider />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No Comments" />
              </ListItem>
            )}
          </List>
          <TextareaAutosize
            rowsMax={4}
            aria-label="maximum height"
            placeholder=""
            defaultValue=""
            value={this.state.value}
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
              onClick={() => this.addComment()}
            >
              POST
            </Button>
          </div>
        </Col>
      </>
    );
  }
}

CommentBox.propTypes = {
  user: PropTypes.objectOf.isRequired,
  users: PropTypes.objectOf.isRequired,
  group: PropTypes.string.isRequired,
  transaction: PropTypes.string.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  };
};

export default connect(mapStatetoProps)(CommentBox);
