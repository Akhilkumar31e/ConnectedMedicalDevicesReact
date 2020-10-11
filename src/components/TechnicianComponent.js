import React ,{ Component} from 'react';
import HomeHeader from './HomeHeaderComponent';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import DeviceService from '../services/device.service';
import Loading from './LoadingComponent';
import {Link} from 'react-router-dom';

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
                                    {device.hospital  ? <h5>Hospital using :{device.hospital.hospitalName}</h5> : <p>No hospital</p> }
                                </div>
                                <div className="col-12 col-sm-6">
                                    {/*<Button onClick={() => this.handelRemoveButton(device.deviceID)} className="btn btn-sm btn-danger">Remove</Button>  */}
                                    <Link  to = {`/techdevice/${device.deviceID}`}>
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

class Technician extends Component{
    constructor(props){
        super(props);

        this.state={
            activeTab:'1',
            isLoading:true,
            serviceDevices:[],
            repairDevices:[],
            replaceDevices: []
        }
        this.toggleTab = this.toggleTab.bind(this);
        this.getService = this.getService.bind(this);
        this.getRepair = this.getRepair.bind(this);
        this.getReplace = this.getReplace.bind(this);
    }

    getService(){
        DeviceService.getService()
        .then(response => {
            this.setState({
                serviceDevices: response.data,
                isLoading: false
            });
            console.log(response.data);
        })
        .catch(e => {
            this.setState({
                serviceDevices: [],
                isLoading: false
            });
            console.log(e);
        });
    }

    getRepair(){
        DeviceService.getRepair()
        .then(response => {
            this.setState({
                repairDevices: response.data,
                isLoading: false
            });
            console.log(response.data);
        })
        .catch(e => {
            this.setState({
                serviceDevices: [],
                isLoading: false
            });
            console.log(e);
        });
    }

    getReplace(){
        DeviceService.getReplace()
        .then(response => {
            this.setState({
                replaceDevices: response.data,
                isLoading: false
            });
            console.log(response.data);
        })
        .catch(e => {
            this.setState({
                serviceDevices: [],
                isLoading: false
            });
            console.log(e);
        });
    }


    toggleTab(tab) {
        if(this.state.activeTab!==tab){
        this.setState({
            activeTab:tab
        });
    }
    }

    componentDidMount(){
        this.getService();
        this.getReplace();
        this.getRepair();
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
                                    <h4>Services</h4>
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}
                                >
                                    <h4>Repair</h4>
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}
                                >
                                    <h4>Replace</h4>
                                </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Devices to be serviced</h3>
                            </div>
                            
                            </div>
                            <RenderDevices isLoading={this.state.isLoading} devices={this.state.serviceDevices} />
                        </TabPane>
                        <TabPane tabId="2">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Devices to be repaired</h3>
                            </div>
                            </div>
                            <RenderDevices isLoading={this.state.isLoading} devices={this.state.repairDevices} />
                           
                        </TabPane>
                        <TabPane tabId="3">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-6">
                                <h3>Devices to be replaced</h3>
                            </div>
                            </div>
                            <RenderDevices isLoading={this.state.isLoading} devices={this.state.replaceDevices} />
                            
                        </TabPane>
                    </TabContent>
                    </div>
                </div>
            </React.Fragment>
        );
    }


}

export default Technician;