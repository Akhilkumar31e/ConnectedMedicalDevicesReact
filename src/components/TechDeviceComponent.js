import React , {Component} from 'react';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';
import DeviceService from '../services/device.service';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom';
import {  Button} from 'reactstrap';

class TechDevice extends Component{
    constructor(props){
        super(props);

        this.state={
            isLoading : true,
            deviceInfo: null,
            deviceFound: true,
            isModalOpen:false
        }
        
        
        
        this.handleUpdateDevice=this.handleUpdateDevice.bind(this);
    }
    handleUpdateDevice(){
        var data = {
            
            deviceStatus: 'Working', 
            batteryLevel: '100',
            operatingTime:0
        }
        console.log(data);

        DeviceService.updateStatus(this.props.id,data)
        .then(response => {
           alert('Action Succesful');
           
            
            console.log(response.data);
            window.location.reload();
        })
        .catch(e=> {
            console.log(e);
        });
    }





    componentDidMount(){
        DeviceService.get(this.props.id)
        .then(res => {
            console.log(res);
            this.setState({
                deviceInfo:res.data,
                isLoading:false
            });
        })
        .catch(e=> {
            console.log("Error");
            this.setState({
                deviceFound:false
            })
        });
    }

    render(){
        
        return(
            <React.Fragment>
                {!this.state.deviceFound && <Redirect to="/technician" />}
                <HomeHeader />
                <div className="container">
                    <div className="row pad-row">
                        <div className="col-12">
                    <Breadcrumb>
                        <BreadcrumbItem><span className="fa fa-arrow-left">    .</span><Link to="/technician">Technician</Link></BreadcrumbItem>
                        
                        <BreadcrumbItem active>{this.state.isLoading ? <Loading /> : this.state.deviceInfo.deviceName}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    </div>
                </div>
               
                {this.state.isLoading ? <Loading /> : <div className="main">
                    <div className="container">
                        <div className="row user-row">
                            {this.state.isLoading ? <Loading /> : <h2>{this.state.deviceInfo.deviceName}</h2>}
                        </div>
                    </div>
                    <div className="container">
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Device ID : </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.deviceInfo.deviceID} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Device Name : </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.deviceInfo.deviceName} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Device Status :</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.deviceInfo.deviceStatus} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Service Period : </h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4> {this.state.deviceInfo.servicePeriod} </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Issued Date :</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4>{new Intl.DateTimeFormat('en-US', { year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(Date.parse(this.state.deviceInfo.receivedDate)))}  </h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Battery Level :</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h4><span className="badge badge-pill badge-success">{this.state.deviceInfo.batteryLevel}% </span></h4>
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Last Updated :</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            {this.state.deviceInfo.lastUpdated ==null ? <p>NA</p> :<h4> {new Intl.DateTimeFormat('en-US', { year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(Date.parse(this.state.deviceInfo.lastUpdated)))} </h4>}
                        </div>
                    </div>
                    <div className="row row-display row-edu">
                        <div className="col-12 col-sm-4">
                            <h4>Last Service :</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            {this.state.lastService ==null ? <p>NA</p> : <h4> {this.state.deviceInfo.lastService} </h4>}
                        </div>
                    </div>
                    <div className="row user-row">
                       
                        {this.state.deviceInfo.deviceStatus.localeCompare('Working')!==0 ? <Button onClick={this.handleUpdateDevice} className="btn btn-sm btn-warning">{this.state.deviceInfo.deviceStatus} </Button> : <p></p>}
                    </div>
                </div>
                </div>}
            </React.Fragment>
        );
    }


}

export default TechDevice;