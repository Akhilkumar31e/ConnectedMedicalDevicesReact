import React,{Component} from 'react';

import Loading from './LoadingComponent';
import {Link} from 'react-router-dom';
import HomeHeader from './HomeHeaderComponent';
import HospitalService from '../services/hospital.service';


class  AllHospitals extends Component{
    constructor(props){
        super(props);

        this.state = {
            hospitals:[],
            isLoading: true
        }

        
    }
    componentDidMount(){
        HospitalService.getAll()
        .then(res => {
            this.setState({
                hospitals: res.data,
                isLoading:false
            });
        })
        .catch(e => {
            console.log(e);
        });
    }
    render(){
    if(this.state.isLoading){
        return(
            <Loading />
        );
    }
    else{
        if(this.state.hospitals.length===0){
            return(
                <div>No hospitals Found</div>

            );
        }
        else{
            const d=this.state.hospitals.map((hospital) => {
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
                <React.Fragment>
                    <HomeHeader />
                    <div className="main">
                        <div className="container">
                        <div className="row pad-row">
                            <div className="co1-12 col-sm-2">
                                <h2 className="text-bold">Hospitals</h2>
                            </div>
                            </div>
                        </div>
                        <div>
                            {d}
                        </div>
                    </div>
                </React.Fragment>
                
            );
        }
        
    }
}
}

export default AllHospitals;