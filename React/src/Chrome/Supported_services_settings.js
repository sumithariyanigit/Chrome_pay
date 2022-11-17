import React from 'react';
import { Link } from 'react-router-dom';

function Supported_services_settings() {
    return (
        <div>

<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Enable Services</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Enable Services</span>
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
            <h5 className="mb-2">Enable Services</h5>
            <p>Use this section to manage service that your organisation wish to support across your network.</p>
           </div>
          <form action="" method="">
            <div className="row">
               <div className="col-lg-12" data-aos="fade-left" data-aos-delay="400">
                <button type="button" data-aos="fade-top" data-aos-delay="400" className="btn showAdvance btn-shows mr-2"><i className="fe fe-plus-circle hideplus"></i>
                  <i className="fe fe-minus-circle hideminus"></i> &nbsp;Support New Service</button>
                <button type="button" data-aos="fade-left" data-aos-delay="400" className="btn btn-shows add_keya mr-2"><i className="fe fe-plus-circle hideplus"></i>
                  <i className="fe fe-minus-circle hideminus"></i> &nbsp;Add/Edit MTA API key</button> 
                <button type="button" data-aos="fade-left" data-aos-delay="400" className="btn btn_serach mr-2">&nbsp;Search</button>
                 
              </div>
               </div>
           </form>
         </div>
       </div>


       <div className="row filter-box add_elements justify-content-center" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-3">Support New Service</h5>
           </div>
          <form action="" method="">
            <div className="row">
                   <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="600">
                 <label>Agent/Branch</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">abayomioluwakemi9679</option>
                <option value="">Abdqayyum9572</option>
                <option value="">abdulazeezMuhammed9703</option>
                </select>
              </div>

              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="600">
                 <label>Status</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select Status" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="true">ACTIVATED</option>
                 <option value="false">DEACTIVATED</option>
                </select>
              </div>

               <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="600">
                 <label>Service Type</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select Status" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
               <option value="BUREAU_DE_CHANGE">Bureau De Change</option>
                <option value="">Pay Out Bank Transfer</option>
                <option value="">International Remittance</option>
                <option value="">Bank Transfer</option>
                <option value="">Cash Pickup</option>
                <option value="">Mobile Air-Time/Top-up</option>
                <option value="">Wallet/Virtual Account</option>
                <option value="">Bill Payment</option>
                <option value="">Mobile Money</option>
                <option value="">Merchant/E-payments</option>
                <option value="">E-Disbursement</option>
                <option value="">Scratch card/Vouchers</option>
                <option value="">Payroll/Bulk Transfer</option>
                <option value="">Pre-paid cards</option>
                <option value="">Agency Banking/Domestic Remittance</option>
                <option value="">SMS Money Transfer</option>
                <option value="">SMS Notifications</option>
                <option value="">Sanction List</option>
                <option value="">Crypto Currency</option>
                <option value="">Multi Lingual Support</option>
                </select>
              </div>
                

             <div className="col-lg-6 mt-36">
                <button type="sumit" className="btn btn-primary btn_veri1 mb-3 " data-aos="fade-down" data-aos-delay="300">Save</button>
                <button type="reset" className="btn btn-secondary btn-reset mb-3 " data-aos="fade-down" data-aos-delay="400">Reset</button>
              </div>  

               </div>
           </form>
       </div>
    </div>

      <div className="row filter-box add_key justify-content-center" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-3">Add/Edit MTA API key</h5>
           </div>
          <form action="" method="">
            <div className="row">
                   <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="200">
                 <label>API Key</label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text"/>
              </div>

              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="200">
                 <label>Secret</label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text"/>
              </div>

           <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="200">
                 <label>EndPoint (url)</label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text"/>
              </div>

             <div className="col-lg-6 mt-36">
                <button type="sumit" className="btn btn-primary btn_veri1 mb-3 " data-aos="fade-down" data-aos-delay="300">Save</button>
                <button type="reset" className="btn btn-secondary btn-reset mb-3 " data-aos="fade-down" data-aos-delay="400">Reset</button>
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
                  <th>Service Type</th>  
                  <th>Status</th>
                  <th>Agent/Branch</th>  
                  <th>Action</th> 
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>03/08/2021</td>
                      <td>INTERNATIONALREMITTANCE</td>
                      <td><span className="agreen">Activated</span></td>
                      <td>Chromepay</td>
                      <td><span className="justify-content-center d-flex w-100">
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>
                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span>
                    </td>
                      </tr>  <tr>
                      <td>03/08/2021</td>
                      <td>INTERNATIONALREMITTANCE</td>
                      <td><span className="agreen">Activated</span></td>
                      <td>Chromepay</td>
                      <td><span className="justify-content-center d-flex w-100">
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>
                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span>
                    </td>
                      </tr>  <tr>
                      <td>03/08/2021</td>
                      <td>INTERNATIONALREMITTANCE</td>
                      <td><span className="agreen">Activated</span></td>
                      <td>Chromepay</td>
                      <td><span className="justify-content-center d-flex w-100">
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>
                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span>
                    </td>
                      </tr>  <tr>
                      <td>03/08/2021</td>
                      <td>INTERNATIONALREMITTANCE</td>
                      <td><span className="agreen">Activated</span></td>
                      <td>Chromepay</td>
                      <td><span className="justify-content-center d-flex w-100">
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>
                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span>
                    </td>
                      </tr>  <tr>
                      <td>03/08/2021</td>
                      <td>INTERNATIONALREMITTANCE</td>
                      <td><span className="agreen">Activated</span></td>
                      <td>Chromepay</td>
                      <td><span className="justify-content-center d-flex w-100">
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>
                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span>
                    </td>
                      </tr>  <tr>
                      <td>03/08/2021</td>
                      <td>INTERNATIONALREMITTANCE</td>
                      <td><span className="agreen">Activated</span></td>
                      <td>Chromepay</td>
                      <td><span className="justify-content-center d-flex w-100">
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>
                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span>
                    </td>
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

export default Supported_services_settings;