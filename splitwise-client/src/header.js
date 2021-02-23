import React from "react";

class Header extends React.Component {

    render() {
        return (
            <>
            <header style={{'max-height':'50px','background-color':'#5bc5a7'}}>
                <div className="container mx-auto">
                    <nav className="navbar" style={{'max-height':'50px','align-content':'center'}}>
                        
                        <a className="navbar-brand" href="/">
                                <img src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg" width="150" height="150" className="d-inline-block align-top" alt="" />
                </a>
                        <form className="form-inline my-2 my-lg-0">
                            <div>
                            
                            <a class="dropdown-reveal text-teal px-4 block cursor-pointer font-mont font-semibold" style={{'font-color':'#5bc5a7'}} href="/login">Log in</a>
                               {/* <a className="btn btn-outline-success my-2 my-sm-0" href="/login">Login</a> */}
                            </div>
                            <div>
                            <a className="btn btn-lg  btn-block text-uppercase"  style={{'background-color':'#5bc5a7'}}href="/signup">Sign Up</a>
                            </div>
                        </form>
                    </nav>
                </div>
                </header>
            </>
        );
    }
}

export default Header;