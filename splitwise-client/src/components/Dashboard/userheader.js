import React from "react";
import cookie from 'react-cookies';

class UserHeader extends React.Component {

    render() {
        let user = null;
        if (cookie.load("cookie")) {
            user = cookie.load("cookie");
        }
        return (
            <>
                <header style={{ 'max-height': '50px', 'background-color': '#5bc5a7' }}>
                    <div className="container mx-auto">
                        <nav className="navbar" style={{ 'max-height': '50px', 'align-content': 'center' }}>
                            <a className="navbar-brand" href="/">
                                <img src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg" width="150" height="150" className="d-inline-block align-top" alt="" />
                            </a>
                            <form className="form-inline my-2 my-lg-0">
                                <div>
                                    <a className="" href="/dashboard">Home</a>
                                </div>
                                <div>
                                    <div class="dropdown show">
                                        <a className="btn btn-secondary dropdown-toggle" href="/#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{'background-color': '#5bc5a7',border:'none'}}>{user}</a>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="/userprofile">Your Account</a>
                                            <a className="dropdown-item" href="/creategroup">Create Group</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/#">Logout</a>
                                        </div>
                                    </div>
                               </div>
                            </form>
                        </nav>
                    </div>
                </header>
            </>
        )
    }
}
export default UserHeader;