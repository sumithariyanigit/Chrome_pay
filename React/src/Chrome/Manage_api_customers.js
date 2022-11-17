import React from 'react';
import { Link } from 'react-router-dom';

function Manage_api_customers() {
    return (
        <div>
            
<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>API Customer Report</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>API Customer Report</span>
      </div>
    </div>
  </div>
</section>

<main id="main">

  <section className="bulk_sms pb-0">
    <div className="container">
      <div className="row justify-content-center filter-box" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5>API Customer Report</h5>
          </div>
          <form action="" method="">
            <div className="row">

                  <div className="col-lg-6 mb-4">
                <div className="row">
                  <div className="col-lg-6 mm-3">
                    <label for="">From</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date"  className="form-control ht-47" name=""  placeholder="MM/DD/YY"/>
                  </div>

                  <div className="col-lg-6 ">
                    <label for="">To</label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date"  className="form-control ht-47" name=""  placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>

              <div className="col-lg-6  mb-4">
                <label>Please select partner you wish to pay-out on behalf<span className="requrd">*</span></label>
             <select className="selectpicker form-control"  data-container="body" data-live-search="true" 
             title="Search Chromepay transactions..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
                  <option value="">Abkhazia</option>
           </select>
              </div>

             <div className="col-lg-6  mb-4">
              <label>Select  Organization List</label>
             <select className="selectpicker form-control"  data-container="body" data-live-search="true" 
             title="Select  Organization List" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">Abkhazia</option>
           </select>
              </div>
        
           <div className="col-lg-6 mb-4">
                <label for="">Transaction ID</label>
                <input type="text" name="" className="form-control ht-47"/>
              </div>


              <div className="col-lg-6">
                <button type="sumit" className="btn btn-primary btn_veri1  mb-3" 
                data-aos="fade-down" data-aos-delay="300">Search</button>
                 <button type="reset" className="btn btn-secondary btn-reset  mb-3" 
                 data-aos="fade-down" data-aos-delay="400">Reset</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section className="organizationList pt-0">
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="600">
       <div className="table-title">
            <h5 className="mb-0">API Customer Report</h5>
          </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                   <th>Transaction Date</th>
                  <th>PCN</th>
                  <th>Beneficiary Name</th>
                  <th>Organization Name</th>
                  <th>Sender Name </th>  
                  <th>Sending Amount</th>
                  <th>Receiving Amount</th>
                  <th>Document Type </th>
                  <th>Document Issue Number </th> 
                  <th>Download</th>  
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12/02/2021</td>
                      <td>SF123DSA</td>
                      <td>Sumit</td>
                      <td>Chromepay</td>
                      <td>Punit</td>
                       <td>34.00 NGN</td>
                      <td>34.00 NGN</td>
                      <td></td>
                      <td>Nigeria</td>
                      <td></td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>


</main>
        </div>
    );
}

export default Manage_api_customers;