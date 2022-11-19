import React from 'react';
import { Link } from 'react-router-dom';

function Transaction_alerts() {
    return (
        <div>
          <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Transaction Alerts</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Transaction Alerts</span>
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
            <h5 className="mb-3">Transaction Alerts</h5>
          </div>
          <form action="" method="">
            <div className="row">
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
           <div className="col-lg-6 mb-3" data-aos="fade-down" data-aos-delay="900">
                <label>Audit Type:</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
            <option value="" >PCN_MATCHED</option>
            <option value="">ANSWER_FAILED</option>
            <option value="">PAID_OUT</option>
            <option value="">PAYMENT_ALERT</option>
            <option value="">VIEWED_NOT_PAID_OUT</option>

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
                      <th>Date</th>
                      <th>Name</th>
                      <th>Action</th>
                      <th>PCN</th>
                      <th>Organization/Branch</th>
                      <th>IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    
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

export default Transaction_alerts;