import React , {Component} from 'react';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';
import DeviceService from '../services/device.service';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import {  Button, Modal, ModalHeader, ModalBody,Label, Row, Col} from 'reactstrap';



class Device extends Component{
    constructor(props){
        super(props);

        this.state={
            isLoading : true,
            deviceInfo: null,
            deviceFound: true,
            isModalOpen:false
        }
        this.removeDevice = this.removeDevice.bind(this);
        
        this.toggleDeviceModal=this.toggleDeviceModal.bind(this);
        this.handleUpdateDevice=this.handleUpdateDevice.bind(this);
    }
    handleUpdateDevice(values){
        var data = {
            deviceName:values.deviceName,
            deviceStatus: values.status,
            servicePeriod: values.servicePeriod,
            batteryLevel: this.state.deviceInfo.batteryLevel,
            hospital : this.state.deviceInfo.hospital.hospitalID
        }
        console.log(data);

        DeviceService.update(this.props.id,data)
        .then(response => {
           alert('Device Succesfully Updated');
           
            this.toggleDeviceModal();
            console.log(response.data);
            window.location.reload();
        })
        .catch(e=> {
            console.log(e);
        });
    }


    removeDevice(){
        DeviceService.delete(this.props.id)
        .then(response => {
            
            window.location.reload();
            alert('Device deleted Succesfully');
           
            console.log(response);
        }
        )
        .catch(e => {
            console.log(e);
        })
    }

    toggleDeviceModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
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
                {!this.state.deviceFound && <Redirect to="/admin" />}
                <HomeHeader />
                <div className="container">
                    <div className="row pad-row">
                        <div className="col-12">
                    <Breadcrumb>
                        <BreadcrumbItem><span className="fa fa-arrow-left">    .</span><Link to="/admin">Admin</Link></BreadcrumbItem>
                        
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
                        <Button onClick={this.removeDevice} className="btn btn-sm btn-danger">Remove</Button>
                        <Button onClick={this.toggleDeviceModal} className="btn btn-sm btn-warning">Update</Button>
                    </div>
                </div>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleDeviceModal}>
                        <ModalHeader toggle={this.toggleDeviceModal}>
                            Update Device
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleUpdateDevice(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="deviceName" md={3}>Device Name</Label>
                                    <Col md={9}>
                                    <Control.text model=".deviceName" 
                                        id="deviceName" 
                                        placeholder="Enter Device Name" 
                                        className="form-control" 
                                        defaultValue={this.state.deviceInfo.deviceName}
                                        
                                        />
                                        
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="servicePeriod" md={3}>Service Period</Label>
                                    <Col md={9}>
                                    <Control.text model=".servicePeriod" 
                                        id="servicePeriod" 
                                        placeholder="Enter Service Period" 
                                        className="form-control" 
                                        defaultValue={this.state.deviceInfo.servicePeriod}
                                        
                                        />
                                        
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="status" md={3}>Status</Label>
                                    <Col md={9}>
                                    <Control.text model=".status" 
                                        id="status" 
                                        placeholder="Change Status" 
                                        className="form-control" 
                                        defaultValue={this.state.deviceInfo.deviceStatus}
                                        
                                        />
                                        
                                    </Col>
                                </Row>
                                
                                
                                <Row className="form-group">
                                <Col md={{size:6,offset:3}}>
                                    <Button type="submit" color="primary" block="true">
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
                </div>}
            </React.Fragment>
        );
    }


}

export default Device;