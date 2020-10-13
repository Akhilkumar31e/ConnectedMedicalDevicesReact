import React,{Component} from 'react';
import DeviceService from '../services/device.service';
import HospitalService from '../services/hospital.service';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import AuthService from '../services/auth.service';
import {Button} from 'reactstrap';

class  RenderDevices extends Component{
   
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
                                    {device.hospital ? <h5>Hospital using :{device.hospital.hospitalName}</h5> : <p>No hospital</p>}
                                </div>
                                <div className="col-12 col-sm-6">
                                    {/*<Button onClick={() => this.handelRemoveButton(device.deviceID)} className="btn btn-sm btn-danger">Remove</Button>  */}
                                    <Link  to = {`/mdevice/${device.deviceID}`}>
                                        <span className = "fa fa-external-link"> View More</span> 
                                    </Link>
                                    {device.deviceStatus.localeCompare('service')===0 && <h4>
                                    <span className="badge badge-warning">Needs {device.deviceStatus}</span>
                                    </h4>}
                                    {device.deviceStatus.localeCompare('repair')===0 && <h4>
                                    <span className="badge badge-danger">Needs {device.deviceStatus}</span>
                                    </h4>}
                                    {device.deviceStatus.localeCompare('replace')===0 && <h4>
                                    <span className="badge badge-info">Needs to be {device.deviceStatus}d</span>
                                    </h4>}
                                    {device.deviceStatus.localeCompare('Working')===0 && <h4>
                                    <span className="badge badge-success"> {device.deviceStatus}</span>
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
class  RenderTechnicians extends Component{
    render(){
    if(this.props.isLoading){
        return(
            <Loading />
        );
    }
    else{
        if(this.props.technicians.length===0){
            return(
                <div>No Technicians Found</div>

            );
        }
        else{
            const d=this.props.technicians.map((technician) => {
                return(
                    <div key={technician.id}>
                    {technician.roles[0].name.localeCompare('SERVICE_TECHNICIAN')===0 ? <div >
                        <div className="container">
                            <div className="row user-row">
                                <div className="col-12 col-sm-6">
                                    <h4>{technician.username}</h4>
                                    <h5><span className="fa fa-envelope">  </span><a href="mailto:">{technician.email}</a></h5>
                                </div>
                               
                            </div>
                        </div>
                    </div> : <div></div> }
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
class  RenderHospitals extends Component{
   
    render(){
    if(this.props.isLoading){
        return(
            <Loading />
        );
    }
    else{
        if(this.props.hospitals.length===0){
            return(
                <div>No hospitals Found</div>

            );
        }
        else{
            const d=this.props.hospitals.map((hospital) => {
                return(
                    <div key={hospital.hospitalID}>
                        <div className="container">
                            <div className="row user-row">
                                <div className="col-12 col-sm-6">
                                    <h3>{hospital.hospitalName}</h3>
                                    <h5>{hospital.city}</h5>
                                </div>
                                <div className="col-12 col-sm-6">
                                    {/*<Button onClick={() => this.handelRemoveButton(device.deviceID)} className="btn btn-sm btn-danger">Remove</Button>  */}
                                    <Link  to = {`/hospital/${hospital.hospitalID}`}>
                                        <span className = "fa fa-external-link"> View More</span> 
                                    </Link>
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


class Manager extends Component{
    constructor(props){
        super(props);

        this.state = {
            activeTab :'1',
            isLoading: true,
            devices: [],
            hospitals: [],
            technicians : [],
            lastUpdated: [],
            limit: 0
        }
        this.toggleTab = this.toggleTab.bind(this);
        this.getDevices = this.getDevices.bind(this);
        this.getHospitals = this.getHospitals.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getLastUpdated = this.getLastUpdated.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    refresh(){
        this.getLastUpdated();
    }

    toggleTab(tab) {
        if(this.state.activeTab!==tab){
            this.setState({
                activeTab:tab
            });
        }
    }

    getUsers(){
        AuthService.getUsersList()
        .then(response => {
            this.setState({
                technicians: response.data
            })
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
    }

    getLastUpdated(){
        DeviceService.getLastUpdated()
        .then(response => {
            this.setState({
                lastUpdated: response.data,
                isLoading: false,
                limit : 10,
                max : 100
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
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

    componentDidMount(){
        this.getDevices();
        this.getHospitals();
        this.getUsers();
        this.getLastUpdated();
    }



    render(){
        return(
            <React.Fragment>
                <HomeHeader />
                <div className="main">
                <div className="container">
                        <div className="row pad-row">
                        <div className="col-12">
                            <Nav tabs>
                                <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1'); }}
                                >
                                    <h4>Devices</h4>
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}
                                >
                                    <h4>Hospitals</h4>
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}
                                >
                                    <h4>Technicians</h4>
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.toggleTab('4'); }}
                                >
                                    <h4>Recently Updated</h4>
                                </NavLink>
                                </NavItem>
                                
                            </Nav>
                        </div>
                    </div>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Devices</h3>
                            </div>
                            
                            </div>
                            <RenderDevices isLoading={this.state.isLoading} devices={this.state.devices} limit = {this.state.max} />
                        </TabPane>
                        <TabPane tabId="2">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Hospitals</h3>
                            </div>
                            </div>
                            <RenderHospitals isLoading={this.state.isLoading} hospitals={this.state.hospitals} limit = {this.state.max}/>
                           
                        </TabPane>
                        <TabPane tabId="3">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Technicians</h3>
                            </div>
                            </div>
                            <RenderTechnicians isLoading={this.state.isLoading} technicians={this.state.technicians} />
                           
                        </TabPane>
                        <TabPane tabId="4">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Recently Updated</h3>
                                
                            </div>
                            <div className="col-12 col-sm-6 add-exp-button">
                        <Button onClick={this.refresh} className="btn bg-primary"><h3><span className="fa fa-refresh fa-light"></span></h3></Button>
                    </div>
                            </div>
                            <RenderDevices isLoading={this.state.isLoading} devices={this.state.lastUpdated} limit = {this.state.limit}/>
                           
                        </TabPane>
                    </TabContent>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Manager;