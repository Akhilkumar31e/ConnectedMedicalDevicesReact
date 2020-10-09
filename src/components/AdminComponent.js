import React,{Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {  Button, Modal, ModalHeader, ModalBody,Label, Row, Col} from 'reactstrap';
import DeviceService from '../services/device.service';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';

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
                                </div>
                                <div className="col-12 col-sm-6">
                                    <Button onClick={() => this.handelRemoveButton(device.deviceID)} className="btn btn-sm btn-danger">Remove</Button>
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
            isLoading: true
        }
        this.toggleDeviceModal=this.toggleDeviceModal.bind(this);
        this.handleAddDevice=this.handleAddDevice.bind(this);
        this.getDevices = this.getDevices.bind(this);
        this.removeDevice = this.removeDevice.bind(this);
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

    toggleDeviceModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    handleAddDevice(values){
        var data = {
            deviceName:values.deviceName,
            deviceStatus: "Working",
            servicePeriod: values.servicePeriod,
            batteryLevel: "100"
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

    componentDidMount(){
        this.getDevices();
    }

    render(){
        return(
            <React.Fragment>

                <HomeHeader />
                
                <div className="container">
                    <div className="row ">
                    <div className="co1-12 col-sm-2">
                        <h2 className="text-muted">Devices</h2>
                    </div>
                    <div className="col-12 col-sm-8 add-exp-button">
                        <Button onClick={this.toggleDeviceModal} className="btn bg-primary"><span className="fa fa-plus"></span> Add Device</Button>
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
                                    <Label htmlFor="servicePeriod" md={3}>Service Period</Label>
                                    <Col md={9}>
                                    <Control.text model=".servicePeriod" 
                                        id="servicePeriod" 
                                        placeholder="Enter Service Period" 
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
                
            </React.Fragment>
        );
    }

    
   

}

export default Admin;