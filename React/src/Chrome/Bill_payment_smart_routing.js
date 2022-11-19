import React from 'react';
import { Link } from 'react-router-dom';

function Bill_payment_smart_routing() {
    return (
        <div>
            <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Automatic Routing</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Automatic Routing</span>
      </div>
    </div>
  </div>
</section>

<main id="main">
<section className="bulk_sms pb-0 setting_manger">
    <div className="container">
      <div className="row justify-content-center filter-box profile-text" data-aos="fade-down" data-aos-delay="400">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-3">Automatic Routing</h5>
          </div>
          <form action="" method="">
            <div className="row">
                 <div className="col-lg-6 mb-3" data-aos="fade-down" data-aos-delay="900">
                   <label>Commission Type</label>
                    <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                      <option value="">Nigeria</option>
                    </select>
                  </div>

               <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="900">
                   <label>Data Source</label>
                    <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                      <option value=""> SHE_BILL_PRODUCTS</option>
                      <option value="">MERCHANT_PRODUCTS</option>
                    </select>
                  </div>

                
              <div className="col-lg-6">
                <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Save</button>
                <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
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
                      <th>Country</th>
                      <th>Data Source</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nigeria</td>
                      <td>SHE_BILL_PRODUCTS</td>
                      <td><span className="justify-content-center d-flex w-100">
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span></td>
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
  </section>


</main>
        </div>
    );
}

export default Bill_payment_smart_routing;