import React from 'react';
import { Link } from 'react-router-dom';

function Awaiting_verification() {
    return (
        <div>
            
<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Awaiting Verification</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Awaiting Verification</span>
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
            <h5 className="mb-2">Awaiting Verification</h5>
            <p>Manage your customers here. You can view the customer details, delete customer details, suspend and reactivate customers here.</p>
          </div>
          <form action="" method="">
            <div className="row">
              <div className="col-lg-6  mb-3">
                <label>Customer Type</label>
                <select className="selectpicker form-control"  data-container="body" data-live-search="true" title="" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                    <option value="">Online Customer</option>
                </select>
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
            <h5 className="mb-0">Awaiting Verification Customers</h5>
          </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr>
                    <th>Signup Date</th>
                     <th>Organization Name</th>
                     <th>Full Name</th>
                      <th>Sender Phone</th>
                      <th>Email</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12/05/2021 11:06:40</td>
                      <td>chromepay</td>
                      <td>Sumit</td>
                      <td>3423480915</td>
                      <td>chromepay.@gmail.com</td>
                      <td>Nigeria</td>
                      <td>CONFIRMED</td>
                      <td><span className="justify-content-center d-flex w-100">
                            
                            <Link to="customer_send_message" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Send Message"><i className="si si-bubbles text-primary mr-2"></i>
                        </Link>

                               <Link to="#" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Verifiy Account"><i className="mdi mdi-approval text-primary mr-2"></i>
                               </Link>
                            
                               <Link to="customer_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
                               </Link>

                            <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                               </Link>
                             </span></td>
                    </tr><tr>
                      <td>12/05/2021 11:06:40</td>
                      <td>chromepay</td>
                      <td>Sumit</td>
                      <td>3423480915</td>
                      <td>chromepay.@gmail.com</td>
                      <td>Nigeria</td>
                      <td>CONFIRMED</td>
                      <td><span className="justify-content-center d-flex w-100">
                            
                            <Link to="customer_send_message" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Send Message"><i className="si si-bubbles text-primary mr-2"></i>
                        </Link>

                               <Link to="#" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Verifiy Account"><i className="mdi mdi-approval text-primary mr-2"></i>
                               </Link>
                            
                               <Link to="#" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
                               </Link>

                            <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                               </Link>
                             </span></td>
                    </tr><tr>
                      <td>12/05/2021 11:06:40</td>
                      <td>chromepay</td>
                      <td>Sumit</td>
                      <td>3423480915</td>
                      <td>chromepay.@gmail.com</td>
                      <td>Nigeria</td>
                      <td>CONFIRMED</td>
                      <td><span className="justify-content-center d-flex w-100">
                            
                            <Link to="customer_send_message" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Send Message"><i className="si si-bubbles text-primary mr-2"></i>
                        </Link>

                               <Link to="#" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Verifiy Account"><i className="mdi mdi-approval text-primary mr-2"></i>
                               </Link>
                            
                               <Link to="customer_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
                               </Link>

                            <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                               </Link>
                             </span></td>
                    </tr><tr>
                      <td>12/05/2021 11:06:40</td>
                      <td>chromepay</td>
                      <td>Sumit</td>
                      <td>3423480915</td>
                      <td>chromepay.@gmail.com</td>
                      <td>Nigeria</td>
                      <td>CONFIRMED</td>
                      <td><span className="justify-content-center d-flex w-100">
                            
                            <Link to="customer_send_message" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Send Message"><i className="si si-bubbles text-primary mr-2"></i>
                        </Link>

                               <Link to="#" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Verifiy Account"><i className="mdi mdi-approval text-primary mr-2"></i>
                               </Link>
                            
                               <Link to="customer_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
                               </Link>

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


</main>

        </div>
    );
}

export default Awaiting_verification;