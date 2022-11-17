import React from 'react';
import { Link } from 'react-router-dom';

function Payments_awaiting_processing() {
    return (
        <div>
            

            <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Payments awaiting processing</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Payments awaiting processing</span>
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
            <h5 className="mb-3">Payments awaiting processing</h5>
            <p>Awaiting confirmation</p>
          </div>
          <form action="" method="">
            <div className="row">

              <div className="col-lg-6  mb-4">
                <label>Payment Status<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Payment Status" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
               <option value="">PAID</option>
                  <option value="">FAILED</option>
                  <option value="">DECLINED</option>
                  <option value="">UNPAID</option>
                  <option value="">ALREADY PAID</option>
                  <option value="">CANCELLED</option>
                  <option value="">INVALID</option>
                  <option value="">ERROR</option>
                  <option value="">FAILED</option>
                </select>
              </div>

                <div className="col-lg-6  mb-4">
                <label>Transaction Status</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="-----All--------" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                <option value="">Void</option>
                <option value="">Cancelled</option>
                <option value="">Completed</option>
                <option value="">Initiated</option>
                <option value="">Verifying</option>
                <option value="">PAID</option>
                <option value="">Hold</option>
                <option value="">Refunded</option>
                <option value="" selected="selected">Waiting to pay</option>
                </select>
              </div>

               <div className="col-lg-6  mb-4">
                <label>Select Organization</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="-----All--------" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                <option value="">Chromepay</option>
                </select>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="row">
                  <div className="col-lg-6 mm-3">
                    <label for="">Start date</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>

                  <div className="col-lg-6 ">
                    <label for="">End date</label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>



             

              <div className="col-lg-6">
                <button type="sumit" className="btn btn-primary btn_veri1  mb-3" data-aos="fade-down" data-aos-delay="300">Search</button>
                <button type="reset" className="btn btn-secondary btn-reset  mb-3" data-aos="fade-down" data-aos-delay="400">Reset</button>
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
        <h5 className="mb-0">Payments awaiting processing List</h5>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                     <th>Date</th> 
                    <th>Payment Status  </th>
                    <th>PCN</th>  
                    <th>Payment Method</th> 
                    <th>Delivery Method</th>  
                    <th>API Provider</th> 
                    <th>Payment Reference</th>  
                    <th>Gateway Response</th>
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

export default Payments_awaiting_processing;