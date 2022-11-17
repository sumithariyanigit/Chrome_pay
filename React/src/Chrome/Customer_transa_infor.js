import React from 'react';
import { Link } from 'react-router-dom';

function Customer_transa_infor() {
    return (
        <div>
            
<section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" className="line-height"><span><b>Customer Detail <br/>Transaction Reports</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Customer Transactions Details Information</span>
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
            <h5>Customer Transactions Details Information</h5>
          </div>
          <form action="" method="">
            <div className="row">
              <div className="col-lg-6 mb-4 showcashiers showdateRange myDiv showpcn">
                <label for="">Customer</label>
                <input type="Search" className="form-control ht-47" name=""  placeholder="Customer Name"/>
              </div>

            <div className="col-lg-6 ">
                <div className="row">
                 <div className="col-lg-6 mb-4">
                    <label for="">From</label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date" id="datePicker"  className="form-control ht-47" name=""  placeholder="MM/DD/YY"/>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <label for="">To</label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date"  className="form-control ht-47" name=""  placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <button type="sumit" className="btn btn-primary btn_veri1">Search</button>
                <button type="reset" className="btn btn-secondary btn-reset">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
  </section>

  </main>
        </div>
    );
}

export default Customer_transa_infor;