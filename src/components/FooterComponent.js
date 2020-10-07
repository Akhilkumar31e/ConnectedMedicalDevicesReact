import React from 'react';

function Footer(props){
    return(
        <div className="footer">
            <div className="container">
                <div className="row ">             
                   
                    <div className="col-5 col-sm-4">
                         <i className="fa fa-phone fa-lg"></i>: +91 900000000<br />
                        <i className="fa fa-fax fa-lg"></i>: +91 21213121<br />
                        <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:cvr.ac.in">
                            cmd@gmail.com</a>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            
        
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p><b>Connected Medical Devices.</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;