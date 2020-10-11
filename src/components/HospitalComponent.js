import React , {Component} from 'react';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';
import HospitalService from '../services/hospital.service';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom';
import AuthService from '../services/auth.service';

class Hospital extends Component{
    constructor(props){
        super(props);
        const user= AuthService.getCurrentUser();
        this.state={
            isLoading : true,
            hospitalInfo: null,
            hospitalFound: true,
            showManagerBoard: user.roles.includes("SERVICE_MANAGER"),
            showAdminBoard: user.roles.includes("SYSTEM_ADMINISTRATOR"),
                
        }
        
    }
    componentDidMount(){
        HospitalService.get(this.props.id)
        .then(res => {
            console.log(res);
            this.setState({
                hospitalInfo:res.data,
                isLoading:false
            });
        })
        .catch(e=> {
            console.log("Error");
            this.setState({
                hospitalFound:false
            })
        });
    }

    render(){
        
        return(
            <React.Fragment>
                {!this.state.hospitalFound && <Redirect to="/manager" />}
                <HomeHeader />
                <div className="container">
                    <div className="row pad-row">
                        <div className="col-12">
                    <Breadcrumb>
                        {this.state.showManagerBoard && <BreadcrumbItem><span className="fa fa-arrow-left">    .</span><Link to="/manager">Manager</Link></BreadcrumbItem>}
                        {this.state.showAdminBoard && <BreadcrumbItem><span className="fa fa-arrow-left">    .</span><Link to="/admin">Admin</Link></BreadcrumbItem>}
                        
                        <BreadcrumbItem active>{this.state.isLoading ? <Loading /> : this.state.hospitalInfo.hospitalName}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    </div>
                </div>
               
                {this.state.isLoading ? <Loading /> : <div className="main">
                    <div className="container">
                        <div className="row user-row">
                            {this.state.isLoading ? <Loading /> : <h2>{this.state.hospitalInfo.hospitalName}</h2>}
                        </div>
                    </div>
                    <div className="container">
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Hospital ID : </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.hospitalInfo.hospitalID} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Hospital Name : </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.hospitalInfo.hospitalName} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Locality:</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.hospitalInfo.locality} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>City: </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.hospitalInfo.city} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Pincode</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4>{this.state.hospitalInfo.pincode}</h4>
                        </div>
                    </div>
                </div>
                </div>}
            </React.Fragment>
        );
    }


}

export default Hospital;