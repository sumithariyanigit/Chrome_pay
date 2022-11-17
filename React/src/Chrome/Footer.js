import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div >
            
            <footer className="footer">
<div className="container-fluid" >
 <div className="copyright">
   <div className="row">
    <div className="col-md-12">
        <div className="text-center">
        <h3><img src="../assets/images/logo.png" />&nbsp;&nbsp;Support</h3>
      </div>  
    </div>
  </div>
   <div className="row">
        <div className="col-md-12">
            <div className="d-flex justify-content-center ml-footer">
             <div>
            <h5><i className="ti-email"></i>&nbsp; Email </h5>
            <Link to="info@chromepay.io">info@chromepay.io</Link>
            </div>  
            <div className="divml">
            <h5><i className="ti-mobile"></i> Phone </h5>
             <Link to="tel:+2349155200688">+2349155200688</Link>
            </div>  
            <div>
            <h5> <i className="fe fe-link"></i> Web </h5>
            <Link to="https://chromepay.io/">https://www.chromepay.io/</Link>
            </div>  
             </div>
            </div>
      </div>
      </div>
    </div>
  </footer>

  <Link to="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>

        </div>
    );
}

export default Footer;