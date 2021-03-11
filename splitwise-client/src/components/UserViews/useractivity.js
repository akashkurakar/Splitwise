/* eslint-disable arrow-body-style */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Row from "react-bootstrap/Row";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UserActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }

  componentDidMount() {
    this.getActivitiesByUser();
  }

  getActivitiesByUser = () => {
    const userId = this.props.user.name;
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3001/api/activities/?user=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.setState({
            activities: data,
          });
        } else {
          // error
        }
      });
  };

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));
    return (
      <>
        <Row>
          <div
            style={{ "background-color": "#eeeeee", width: "100%" }}
            className="card"
          >
            <div className="card-body">
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "50%" }}>
                    <h4>Recent Activity</h4>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </Row>
        <Row>
          <List dense className={classes.root}>
            {this.state.activities.length > 0 ? (
              this.state.activities.map((trans) => (
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${1}`}
                      src={`/static/images/avatar/${1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id="item1" primary={trans.description} />
                  <ListItemSecondaryAction />
                </ListItem>
              ))
            ) : (
              <ListItem button>
                <ListItemText id="item1" primary="No Transactions" />
                <ListItemSecondaryAction />
              </ListItem>
            )}
          </List>
        </Row>
      </>
    );
  }
}
UserActivity.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStatetoProps)(UserActivity);
