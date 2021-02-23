
import React from "react"
class DashboardMiddle extends React.Component{

    render(){
        return( 
            <>
               <div className="row">
        <div style={{ "background-color": "#eeeeee",width:"100%" }} className="card" >
        <div className="card-body">
            <table style={{width:"100%"}}>
                <tr>
                    <td style={{width:"50%"}}>
                        <h5>Dashboard</h5>
                        </td>
                        <td style={{width:"50%",float:'right'}}>
                        <button style={{'background-color':'#5bc5a7','border-color':'#5bc5a7'}} class="btn btn-2 btn-success pull-right text-uppercase" type="submit" id="location">Settle Up</button>
                    </td>
                </tr>
            </table>
            <table style={{width:"100%"}}>
                <tr>
                    <td style={{width:"33%"}}>
                    <small class="text-muted">Total Balance</small>
                        <h6 style={{color:"green"}}>$0.0</h6>
                        </td>
                        <td style={{width:"34%"}}>
                        <small class="text-muted">You Owe</small>
                        <h6 style={{color:"red"}}>$0.0</h6>
                    </td>
                    <td style={{width:"33%"}}>
                    <small class="text-muted">You are Owed</small>
                    <h6 style={{color:"green"}}>$0.0</h6>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </div>
    <div className="row">
    <div className="card" style={{width:"100%"}}>
        <div className="card-body"></div>
        </div>
        </div></>)
    }
}
export default DashboardMiddle;