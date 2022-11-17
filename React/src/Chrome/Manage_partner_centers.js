import React from 'react';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Header  from './Header';
import Footer from './Footer';
import Manage_partner_centers_table from './Table/Manage_partner_centers_table';


function Manage_partner_centers() {
    return (
        <div>
  <Header />          
<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
      <h1 className='aos-init aos-animate'><span><b> Partners / Agents <br /> Branches</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Partners / Agents Branches</span>
      </div>
    </div>
  </div>
</section>


<main id="main">


<section className="bulk_sms pb-0 setting_manger">
    <div className="container">
      <div className="row justify-content-center filter-box">
        <div className="col-lg-12 mb-3">
     <div className="title-head">
            <h5 className="mb-2">Agent</h5>
            <p>Agent can be either a bank, bank branch and Agent. Here you can create branches for the registered bank which can be used as an agent.</p>
        </div>
        
          <form action="" method="">
            <div className="row">
               <div className="col-lg-6 mb-3">
                <Link to="register_pay_centers_agent" type="button" className="btn w-100 btn-shows">+ New Agent (Cash Pick-Up, Bureau De Change)</Link>
              </div>
              <div className="col-lg-6 mb-3">
                <a href="#" type="button" className="btn w-100 btn-shows">+ New Merchant</a>
              </div>
              <div className="col-lg-6 mb-3">
                <a href="#" type="button" className="btn w-100 btn-shows">+ New API(Bank Transfer, Airtime, Bill Payment, Mobile Money)</a>
              </div>
              <div className="col-lg-6 mb-3">
                <a href="#" type="button" className="btn w-100 btn-shows">+ Payment Collection Point</a>
              </div>
            </div>
          </form>
        </div>
        </div>
        </div>
  </section> 
  <section className="organizationList pt-0">
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <Manage_partner_centers_table />
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>
  
</main>
       <Footer /> 
        </div>
    );
}

export default Manage_partner_centers;