import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SelectGroup from "./SelectGroup";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router-dom";

class UserGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      groups: [],
      selectedGroup: "",
      redirect: null
    }
  }
  handleSelectedGroup = (e) => {
    console.log(e);
    this.props.selectedGroup(e);
  }
  componentDidMount() {
    console.log(this.state.groups)
    console.log(this.props.groups)
    this.setState({
      groups:this.props.groups
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const classes = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));
    return (
      <>
        <div className="row">
          <div style={{ "background-color": "#eeeeee", width: "100%" }} className="card" >
            <div className="card-body">
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "50%" }}>
                    <h2>All Groups</h2>
                  </td>

                </tr>
              </table>
            </div>

          </div>
        </div>
        <Row>

          <Col md={12}>   <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={this.state.groups.forEach((option) => option.grp_name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Group"
                margin="normal"

                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          /></Col>
        </Row>
        <Row>
          <Col md={12}>
            <List dense className={classes.root}>
              {this.state.groups.length > 0 ? this.state.groups.map((r) => (
                <ListItem button onClick={(event) => this.handleSelectedGroup(r.grp_name)}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={r.grp_name} secondary="Created by" />
                  { r.status === 'PENDING' && <Button variant="primary" style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }} value={r.grp_name} onClick={this.handleApprove}>Accept</Button>}
                </ListItem>
              )) : <ListItem>
                  <ListItemText primary="No groups available" />
                </ListItem>}
            </List>
          </Col>

        </Row>
        {this.state.navigate && <SelectGroup grp_name={this.state.selectedGroup} />}
      </>
    )
  }
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
    groups:state.groups
  }
}
export default connect(mapStatetoProps)(UserGroups);