import React from 'react';
import Header from "../header"

class Home extends React.Component{
    render(){
    return( <>
    <Header/>
    <div maxWidth="xl" id="home">
    <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
                <div id="card-body" className="card-body">
                    <h5 className="card-title text-center">Hi there! Sign me up!</h5>
                    <form className="form-signin">
                        <div>
                        <a className="btn btn-lg btn-success btn-block text-uppercase" href="/signup">Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

</>
    );
}
}
export default Home;