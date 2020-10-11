import React,{Component} from 'react';
import DeviceService from '../services/device.service';
import HospitalService from '../services/hospital.service';
import HomeHeader from './HomeHeaderComponent';
import Loading from './LoadingComponent';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

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
                                    <h5>{hospital.hospitalName}</h5>
                                    <h3>{hospital.city}</h3>
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
            hospitals: []
        }
        this.toggleTab = this.toggleTab.bind(this);
        this.getDevices = this.getDevices.bind(this);
        this.getHospitals = this.getHospitals.bind(this);
    }

    toggleTab(tab) {
        if(this.state.activeTab!==tab){
            this.setState({
                activeTab:tab
            });
        }
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
                            <RenderDevices isLoading={this.state.isLoading} devices={this.state.devices} />
                        </TabPane>
                        <TabPane tabId="2">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Hospitals</h3>
                            </div>
                            </div>
                            <RenderHospitals isLoading={this.state.isLoading} hospitals={this.state.hospitals} />
                           
                        </TabPane>
                    </TabContent>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Manager;