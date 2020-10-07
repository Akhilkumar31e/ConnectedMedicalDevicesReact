import React,{Component} from 'react';
import {Jumbotron} from 'reactstrap';
import {TAGLINES} from '../shared/taglines';
class Display extends Component{
    constructor(props){
        super(props);

        this.state= {
            taglines: TAGLINES
        }
    }
    render(){
        const tags = this.state.taglines.map( (tagline )=> {
            return(
                <div key={tagline}>
                     <div className="row tagline-row justify-content-center">
                         <span ></span><h3>{tagline}</h3>
                    </div>
                </div>
            );
        })
        return(
            <React.Fragment>
                <div className="display">
                    <Jumbotron>
                        <div className="container">
                            <div className="row">
                               <div className="col-12 col-sm-6 justify-content-center title">
                                   <h2 className="display-4">Connected Medical Devices</h2>
                               </div>
                               <div className="col-12 col-sm-6 taglines">
                                   <div className="container">
                                      {tags}
                                   </div>
                               </div>
                            </div>
                        </div>
                    </Jumbotron>
                </div>
            </React.Fragment>
        );
    }
}


export default Display;