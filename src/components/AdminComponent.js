import React,{Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {  Button, Modal, ModalHeader, ModalBody,Label, Row, Col} from 'reactstrap';
import DeviceService from '../services/device.service';
import HospitalService from '../services/hospital.service';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';
import {Link} from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class  RenderDevices extends Component{
    constructor(props){
        super(props);

        this.handelRemoveButton= this.handelRemoveButton.bind(this);
        
    }

    handelRemoveButton(id){
        this.props.removeDevice(id);
    }


    render(){
    if(this.props.isLoading){
        return(
            <Loading />
        );
    }
    else{
        if(this.props.devices.length===0){
            return(
                <div>No devices Found</div>

            );
        }
        else{
            const d=this.props.devices.map((device) => {
                return(
                    <div key={device.deviceID}>
                        <div className="container">
                            <div className="row user-row">
                                <div className="col-12 col-sm-6">
                                    <h5>{device.deviceName}</h5>
                                    <p>Issued Date : {new Intl.DateTimeFormat('en-US', { year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(Date.parse(device.receivedDate)))} </p>
                                    {device.hospital ? <h5>Hospital using :  {device.hospital.hospitalName}</h5> : <p>No hospital</p>}
                                    {device.lastUpdated ==null ? <p>Last Updated : NA</p> :<h6>Last Updated : {new Intl.DateTimeFormat('en-US', { year: 'numeric',month: 'short',day: '2-digit',hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(new Date(Date.parse(device.lastUpdated)))} </h6>}
                                </div>
                                <div className="col-12 col-sm-6">
                                    {/*<Button onClick={() => this.handelRemoveButton(device.deviceID)} className="btn btn-sm btn-danger">Remove</Button>  */}
                                    <Link  to = {`/device/${device.deviceID}`}>
                                        <span className = "fa fa-external-link"> View More</span> 
                                    </Link>
                                    {device.deviceStatus.localeCompare('service')===0 && <h4>
                                    <span class="badge badge-warning">Needs {device.deviceStatus}</span>
                                    </h4>}
                                    {device.deviceStatus.localeCompare('repair')===0 && <h4>
                                    <span class="badge badge-danger">Needs {device.deviceStatus}</span>
                                    </h4>}
                                    {device.deviceStatus.localeCompare('replace')===0 && <h4>
                                    <span class="badge badge-info">Needs to be {device.deviceStatus}d</span>
                                    </h4>}
                                    {device.deviceStatus.localeCompare('Working')===0 && <h4>
                                    <span class="badge badge-success"> {device.deviceStatus}</span>
                                    </h4>}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });

            return(
                <div>
                    {d}
                </div>
            );
        }
        
    }
}
}


class Admin extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen:false,
            devices : [],
            isLoading: true,
            hospitals :[],
            hModal : false
        }
        this.toggleDeviceModal=this.toggleDeviceModal.bind(this);
        this.toggleHospitalModal = this.toggleHospitalModal.bind(this);
        this.handleAddDevice=this.handleAddDevice.bind(this);
        this.getDevices = this.getDevices.bind(this);
        this.getHospitals = this.getHospitals.bind(this);
        this.removeDevice = this.removeDevice.bind(this);
        this.handleAddHospital = this.handleAddHospital.bind(this);
    }

    removeDevice(id){
        DeviceService.delete(id)
        .then(response => {
            alert('Device deleted Succesfully');
            this.getDevices();
            console.log(response);
        }
        )
        .catch(e => {
            console.log(e);
        })
    }

    

    getDevices(){
        DeviceService.getAll()
        .then(response => {
            this.setState({
                devices: response.data,
                isLoading: false
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    getHospitals(){
        HospitalService.getAll()
        .then(response => {
            this.setState({
                hospitals: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    toggleDeviceModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    toggleHospitalModal(){
        this.setState({
            hModal:!this.state.hModal
        });
    }

    handleAddDevice(values){
        var data = {
            deviceName:values.deviceName,
            deviceStatus: "Working",
            servicePeriod: values.servicePeriod,
            batteryLevel: "high",
            hospital : parseInt(values.hospital),
            assetNumber : values.assetNumber,
            modelNumber : values.modelNumber,
            operatingTIme : 0
        }
        console.log(data);

        DeviceService.create(data)
        .then(response => {
           alert('Device Succesfully added');
           this.getDevices();
            this.toggleDeviceModal();
            console.log(response.data);
        })
        .catch(e=> {
            console.log(e);
        });
    }
    handleAddHospital(values){
        var data = {
            hospitalName:values.hospitalName,
            locality: values.locality,
            city: values.city,
            pincode:  values.pincode
        }
        console.log(data);

        HospitalService.create(data)
        .then(response => {
           alert('Hospital Succesfully added');
           
            this.toggleHospitalModal();
            console.log(response.data);
        })
        .catch(e=> {
            console.log(e);
        });
    }

    componentDidMount(){
        this.getDevices();
        this.getHospitals();
    }

    render(){
        const hospitalList = this.state.hospitals.map((hospital) => {
            return(
                <option value={hospital.hospitalID}>{hospital.hospitalName}</option>
            );
        })

        return(
            <React.Fragment>
                <div className="main">
                <HomeHeader />
                
                <div className="container">
                    <div className="row pad-row">
                    <div className="co1-12 col-md-2">
                        <h2 className="text-bold">Devices</h2>
                    </div>
                    <div className="col-12 col-md-3 add-exp-button">
                        <Button onClick={this.toggleDeviceModal} className="btn bg-primary"><span className="fa fa-plus"></span> Add Device</Button>
                    </div>
                    <div className="col-12 col-md-3 add-exp-button">
                        <Button onClick={this.toggleHospitalModal} className="btn bg-primary"><span className="fa fa-plus"></span> Add Hospital</Button>
                    </div>
                    <div className="col-12 col-md-3 add-exp-button">
                        <Button  className="btn bg-primary"><Link className="bg-light" to="/allhospitals"> Show hospitals </Link></Button>
                    </div>
                    </div>
                </div>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleDeviceModal}>
                        <ModalHeader toggle={this.toggleDeviceModal}>
                            Add Device
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleAddDevice(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="deviceName" md={3}>Device Name</Label>
                                    <Col md={9}>
                                    <Control.text model=".deviceName" 
                                        id="deviceName" 
                                        placeholder="Enter Device Name" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".deviceName"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="assetNumber" md={3}>Asset Number</Label>
                                    <Col md={9}>
                                    <Control.text model=".assetNumber" 
                                        id="assetNumber" 
                                        placeholder="Asset Number" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".assetNumber"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="modelNumber" md={3}>Model Number</Label>
                                    <Col md={9}>
                                    <Control.text model=".modelNumber" 
                                        id="modelNumber" 
                                        placeholder="Model Number" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".modelNumber"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="servicePeriod" md={3}>Service Period</Label>
                                    <Col md={9}>
                                    <Control.text model=".servicePeriod" 
                                        id="servicePeriod" 
                                        placeholder="Enter Service Period in Months" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".servicePeriod"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="hospital" md={2}>Select Hospital</Label>
                                    <Col md={{size:6,offset:3}}>
                                        <Control.select model=".hospital" name="hospital" id="hospital"
                                        className="form-control">
                                            <option>Hospital</option>
                                            {hospitalList}
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                <Col md={{size:6,offset:3}}>
                                    <Button type="submit" color="primary" block="true">
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
                <Modal isOpen={this.state.hModal} toggle={this.toggleHospitalModal}>
                        <ModalHeader toggle={this.toggleHospitalModal}>
                            Add Hospital
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleAddHospital(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="hospitalName" md={3}>Hospital Name</Label>
                                    <Col md={9}>
                                    <Control.text model=".hospitalName" 
                                        id="hospitalName" 
                                        placeholder="Enter Hospital Name" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".hospitalName"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="locality" md={3}>Hospital Locality</Label>
                                    <Col md={9}>
                                    <Control.text model=".locality" 
                                        id="locality" 
                                        placeholder="Enter Hospital Locality" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".locality"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="city" md={3}>Hospital City</Label>
                                    <Col md={9}>
                                    <Control.text model=".city" 
                                        id="city" 
                                        placeholder="Enter Hospital City" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".city"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="pincode" md={3}>Hospital Pincode</Label>
                                    <Col md={9}>
                                    <Control.text model=".pincode" 
                                        id="pincode" 
                                        placeholder="Enter Hospital Pincode" 
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(20)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".pincode"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 20 characters or less'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                
                                <Row className="form-group">
                                <Col md={{size:6,offset:3}}>
                                    <Button type="submit" color="primary" block="true">
                                        Add
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
                <RenderDevices isLoading={this.state.isLoading} devices={this.state.devices} removeDevice={this.removeDevice} />
                </div>
            </React.Fragment>
        );
    }

    
   

}

export default Admin;