import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
class UserGroups extends React.Component{
 
    render(){
        const classes=makeStyles((theme) => ({
            root: {
              width: '100%',
              maxWidth: 360,
              backgroundColor: theme.palette.background.paper,
            },
          }));
        return(
            <>
             <div className="row">
        <div style={{ "background-color": "#eeeeee",width:"100%" }} className="card" >
        <div className="card-body">
            <table style={{width:"100%"}}>
                <tr>
                    <td style={{width:"50%"}}>
                        <h5>All Groups</h5>
                        </td>
                        
                </tr>
            </table>
        </div>
    </div>
    </div>
    <div className="row">
    <List component="nav" className={classes.root} style={{width:"100%" }}>
    {this.props.groups.length>0?this.props.groups.map((r) => ( <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={r.grp_name} secondary="" />
      </ListItem>
  )):<ListItem>
        <ListItemText primary="No groups available" />
      </ListItem>}
  </List>
 
    </div>
       
            </>
        )
    }
}
export default UserGroups;