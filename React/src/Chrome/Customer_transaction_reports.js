import React from 'react';
import { Link } from 'react-router-dom';
function Customer_transaction_reports() {
    return (
        <div>


<section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" className="line-height"><span><b>Customer Transactions <br/> Details Information</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Customer Detail Transaction Reports</span>
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
            <h5>Customer Detail Transaction Reports</h5>
          </div>
          <form action="" method="">
            <div className="row">
              <div className="col-lg-6  mb-3">
                <label>Status</label>
                <select multiple className="selectpicker form-control"  data-container="body" data-live-search="true" title="" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="VOID">VOID</option>
                    <option value="PENDING">PENDING</option>
                    <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="HELD">HELD</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="PAID_OUT">PAID_OUT</option>
                </select>
              </div>
              <div className="col-lg-6 mb-3 showcashiers showdateRange myDiv showpcn">
                <label for="">Customer</label>
                <input type="Search" className="form-control ht-47" name=""  placeholder="Customer Name"/>
              </div>

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

              <div className="col-lg-6 mt-36" data-aos="fade-up" data-aos-delay="200">
                <button type="sumit" className="btn btn-primary btn_veri1">Search</button>
                <button type="reset" className="btn btn-secondary btn-reset">Reset</button>
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
            <h5 className="mb-0">Transaction Reports List</h5>
          </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                    <th>Created Date</th>
                     <th>Delivery Method</th>
                     <th>PCN</th>
                      <th>Organization Name</th>
                       <th>Customer</th>
                       <th>Sending Amount</th>
                        <th>Receiving Amount</th>
                         <th>Receiving Country</th>
                          <th>Payment Type</th>
                          <th>Payment Status</th>
                        <th>Transaction Status</th>
                     <th>Compliance</th>
                      <th className="nosort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12/02/2021</td>
                      <td></td>
                      <td>SF123DSA</td>
                      <td>Chromepay</td>
                      <td>Sumit</td>
                      <td>34.00 NGN</td>
                       <td>34.00 NGN</td>
                      <td>Nigeria</td>
                      <td></td>
                      <td>Success</td>
                      <td>Success</td>
                      <td></td>
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

export default Customer_transaction_reports;