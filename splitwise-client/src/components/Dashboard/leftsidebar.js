import React from 'react';
class LeftSideBar extends React.Component {

    constructor(props) {
        super(props);
        this.loadActivity = this.loadActivity.bind(this);
        this.loadDashboard = this.loadDashboard.bind(this);
    }
    loadActivity = (e) => {
        let step = 2;
        this.props.getStep(step)
        e.preventDefault();
    }
    loadDashboard = (e) => {
        console.log(this.props);
        let step = 1;
        this.props.getStep(step);
        e.preventDefault();
    }
    loadAllActivity = (e) => {
        let step = 3;
        this.props.getStep(step)
        e.preventDefault();
    }
    loadCreateGroup = (e) => {
        let step = 4;
        this.props.getStep(step)
        e.preventDefault();
    }
    render() {
        return (

            <nav id="sidebar" style={{ width: "fit-content" }}>
                <div className="sidebar-header">
                    <ul className="list-unstyled components">
                        <li className="active">
                            <img src="./public/icon.png" width="15" height="15" className="d-inline-block align-top" alt=""></img>
                            <a href="/#" data-toggle="collapse" onClick={this.loadDashboard} aria-expanded="false">Dashboard</a>
                        </li>
                        <li className="active">
                            <img src="./public/icon.png" width="15" height="15" className="d-inline-block align-top" alt=""></img>
                            <a href="/#" data-toggle="collapse" aria-expanded="false" onClick={this.loadActivity}>Recent Activity</a>
                        </li>

                        <li className="active">
                            <form class="navbar-form" role="search">
                                <div class="input-group">
                                    <input type="text" class="form-control input-sm" placeholder="Search" name="srch-term" id="inputsm" />
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </li>
                        <li className="active">
                            <img src="./public/icon.png" width="15" height="15" className="d-inline-block align-top" alt=""></img>
                            <a href="/#" data-toggle="collapse" aria-expanded="false" onClick={this.loadAllActivity}>All Activities</a>
                        </li>

                        <li className="active">
                            <div style={{  width: "100%" }} className="card" >
                                <div className="card-body">
                                    <table style={{width:'100%'}}>
                                        <tr>
                                            <td>
                                                <label>Groups</label>
                                                </td>
                                                <td>
                                                <img src="./public/icon.png" width="15" height="15" className="d-inline-block align-top" alt=""></img>
                                                <a href="/creategroup">Add Group</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                        </li>
                    </ul>

                </div>


            </nav>)
    }
}
export default LeftSideBar; 