import React from 'react';
import { Link } from 'react-router-dom';

function Audits_branches() {
    return (
        <div>
    
        <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Audits Records Branches</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">

        <Link to="/">Dashboard</Link> - <span>Audits Records Branches</span>
      </div>
    </div>
  </div>
</section>

<main id="main">

  <section className="bulk_sms pb-0 setting_manger">
    <div className="container">
      <div className="row justify-content-center filter-box" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-3">Audits Records Branches</h5>
          </div>
          <form action="" method="">
            <div className="row">
         <div className="col-lg-6  mb-4">
                <label>Audit Type:</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
              <option value="">Login Successful</option>
              <option value="">Logout Successful</option>
              <option value="">Failed login</option>
              <option value="">Created a new transaction</option>
              <option value="">Confirmed a transaction</option>
              <option value="">Cancelled a transaction</option>
              <option value="">Held a transaction</option>
              <option value="">Paid out a transaction</option>
              <option value="">Viewed the details of a transaction</option>
              <option value="">Created a new bank</option>
              <option value="">Created a new bank administrator</option>

                </select>
              </div>

              <div className="col-lg-6" data-aos="fade-down" data-aos-delay="900">
                <div className="row">
                  <div className="col-lg-6 mb-4 mm-3" data-aos="fade-down" data-aos-delay="900">
                    <label for="">From</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div> 
                  <div className="col-lg-6 mb-4 mm-3" data-aos="fade-down" data-aos-delay="900">
                    <label for="">To</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="900">
                <label>Paycenter:</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Exchange rate feed provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                 <option value="65c6e7e6-d2ee-4ec2-9aa4-8e0e4ad02c1a">AbahLawrence9545</option>
                  <option value="">Abayomi</option>
                  <option value="">AbayomiBamiro9566</option>
                  <option value="">abayomioluwakemi9679</option>
                  <option value="">Abdqayyum9572</option>
                  <option value="">abdulazeezMuhammed9703</option>
                  <option value="">AbdulkareemSheriff9788</option>
                  <option value="">Abdullahi </option>
                  <option value="">AbdullahiOlaide9526</option>
                  <option value="">AbdullahLawal9659</option>
                  <option value="">AbdulmajeedOlumoh9691</option>
                  <option value="">AbdulmajidMohammed9528</option>
                  <option value="">AbdulmajidMohammed9599</option>
                  <option value="">AbdulmajidMohammed9604</option>
                  <option value="">AbdulmajidMohammed9726</option>
                  <option value="">AbdulmajidMohammed9738</option>
                  <option value="">AbdulmajidMohammed9789</option>
                  <option value="">abdulmutalibAbdulrahim9714</option>
                  <option value="">AbdulsamadAjetunmobi9679</option>
                  <option value="">abdulsamadaudu9676</option>
                  <option value="">AbeebBamgboye9635</option>
                  <option value="">AbesinHalimah9793</option>
                  <option value="">Abiala</option>
                </select>
              </div>
              <div className="col-lg-12">
                <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Save</button>
                <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
  </section>
  <section className="organizationList pt-0">
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="600">
     
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                      <th>No.</th>
                      <th>Date</th>
                      <th>Role</th>
                      <th>Organization Name</th>
                      <th>Name</th>
                      <th>Action</th>
                      <th>Staff ID.</th>
                      <th>Branch</th>
                      <th>Registration Country </th>
                      <th>Sign-in Country </th>
                      <th>City</th>
                      <th>IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                     <tr>
                      <td>67895</td>
                      <td>12/05/2021</td>
                      <td></td>
                      <td>Chromepay</td>
                      <td>Sumit</td>
                      <td>CH565KL</td>
                      <td>Lagos</td>
                      <td>Nigeria</td>
                      <td>Nigeria</td>
                      <td>Nigeria</td>
                      <td>Lagos</td>
                      <td>182.77.2.61</td> 
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

export default Audits_branches;