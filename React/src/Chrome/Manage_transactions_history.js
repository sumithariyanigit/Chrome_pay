import React from 'react';
import { Link } from 'react-router-dom';

function Manage_transactions_history() {
    return (
        <div>
            
         
<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Transaction History</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Transaction History</span>
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
            <h5 className="mb-2">Transaction History</h5>
            <p>All of your agents and customers transactions can be managed here, allowing you to view all the transaction details.</p>
          </div>
          <form action="" method="">
            <div className="row">

              <div className="col-lg-6  mb-4">
                <label>Transaction Originating Country<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="-----All--------" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
                  <option value="">St Kitts and Nevis</option>
                  <option value="">St Lucia</option>
                  <option value="">St Vincent Grenadines</option>
                  <option value="">Sudan</option>
                  <option value="">Suriname</option>
                  <option value="">Svalbard</option>
                  <option value="">Swaziland</option>
                  <option value="">Sweden</option>
                  <option value="">Switzerland</option>
                  <option value="">Syria</option>
                  <option value="">Taiwan</option>
                  <option value="">Tajikistan</option>
                  <option value="">Tanzania</option>
                  <option value="">Thailand</option>
                  <option value="">Timor-Leste (East Timor)</option>
                  <option value="">Togo</option>
                  <option value="">Tokelau</option>
                  <option value="">Tonga</option>
                  <option value="">Trinidad and Tobago</option>
                  <option value="">Tristan da Cunha</option>
                  <option value="">Tunisia</option>
                  <option value="">Turkmenistan</option>
                  <option value="">Turks and Caicos</option>
                  <option value="">Tuvalu</option>
                  <option value="">Uganda</option>
                  <option value="">Ukraine</option>
                  <option value="">United Arab Emirates</option>
                  <option value="">United Kingdom</option>
                  <option value="">United States</option>
                  <option value="">Uruguay</option>
                  <option value="">U.S. Virgin Islands</option>
                  <option value="">Uzbekistan</option>
                  <option value="">Vanuatu</option>
                  <option value="">Vatican City</option>
                  <option value="">Venezuela</option>
                  <option value="">Vietnam</option>
                  <option value="">Wake Island</option>
                  <option value="">Wallis and Futuna</option>
                  <option value="">Western Sahara</option>
                  <option value="">Yemen</option>
                  <option value="">Zambia</option>
                  <option value="">Zimbabwe</option>
                </select>
              </div>

              <div className="col-lg-6  mb-4">
                <label>Select Agent/Branch who created transaction</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="-----All--------" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">Abkhazia</option>
                </select>
              </div>


              <div className="col-lg-6 mb-4">
                <div className="row">
                  <div className="col-lg-6 mm-3">
                    <label for="">From</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>

                  <div className="col-lg-6 ">
                    <label for="">To</label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>


              <div className="col-lg-6  mb-4">
                <label>What is the status of this transaction</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="-----All--------" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">Abkhazia</option>
                </select>
              </div>

              <div className="col-lg-6  mb-4">
                <label>Select transactions approved by Organization/Branch:</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="-----All--------" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">Abkhazia</option>
                </select>
              </div>

              <div className="col-lg-6 mt-38">
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
        <h5 className="mb-0">Transaction History</h5>
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
                      <th>Order No</th>
                      <th>Delivery Method</th>
                      <th>PCN </th>
                      <th>Organization/Branch</th>
                      <th>Customer</th>
                      <th>Sending Amount</th>
                      <th>Receiving Amount</th>
                      <th>Receiving Country</th>
                      <th>Payment Type</th>
                      <th>Payment Status</th>
                      <th>Transaction Status</th>
                      <th>Compliance </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>25/08/2021 05:37</td>
                      <td>CESU5O_548 </td>
                      <td>Bank Transfer </td>
                      <td>CHR22451432 </td>
                      <td>Chromepay</td>
                      <td>Mike olu string </td>
                      <td>1,000.00 NGN </td>
                      <td>1,000.00 NGN </td>
                      <td>Nigeria</td>
                      <td>E_WALLET </td>
                      <td>PAID </td>
                      <td>Verifying </td>
                      <td>
                        <span className="greens">
                          <i className="fa fa-flag red-tooltip" aria-hidden="true" data-toggle="tooltip" title="" data-placement="top" data-original-title="Compliance Ok"></i>
                        </span>
                      </td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
                          </Link>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>25/08/2021 05:37</td>
                      <td>CESU5O_548 </td>
                      <td>Bank Transfer </td>
                      <td>CHR22451432 </td>
                      <td>Chromepay</td>
                      <td>Mike olu string </td>
                      <td>1,000.00 NGN </td>
                      <td>1,000.00 NGN </td>
                      <td>Nigeria</td>
                      <td>E_WALLET </td>
                      <td>PAID </td>
                      <td>Verifying </td>
                      <td>
                        <span className="greens">
                          <i className="fa fa-flag red-tooltip" aria-hidden="true" data-toggle="tooltip" title="" data-placement="top" data-original-title="Compliance Ok"></i>
                        </span>
                      </td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
                          </Link>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>25/08/2021 05:37</td>
                      <td>CESU5O_548 </td>
                      <td>Bank Transfer </td>
                      <td>CHR22451432 </td>
                      <td>Chromepay</td>
                      <td>Mike olu string </td>
                      <td>1,000.00 NGN </td>
                      <td>1,000.00 NGN </td>
                      <td>Nigeria</td>
                      <td>E_WALLET </td>
                      <td>PAID </td>
                      <td>Verifying </td>
                      <td>
                        <span className="greens">
                          <i className="fa fa-flag red-tooltip" aria-hidden="true" data-toggle="tooltip" title="" data-placement="top" data-original-title="Compliance Ok"></i>
                        </span>
                      </td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
                          </Link>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>25/08/2021 05:37</td>
                      <td>CESU5O_548 </td>
                      <td>Bank Transfer </td>
                      <td>CHR22451432 </td>
                      <td>Chromepay</td>
                      <td>Mike olu string </td>
                      <td>1,000.00 NGN </td>
                      <td>1,000.00 NGN </td>
                      <td>Nigeria</td>
                      <td>E_WALLET </td>
                      <td>PAID </td>
                      <td>Verifying </td>
                      <td>
                        <span className="greens">
                          <i className="fa fa-flag red-tooltip" aria-hidden="true" data-toggle="tooltip" title="" data-placement="top" data-original-title="Compliance Ok"></i>
                        </span>
                      </td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="fe fe-eye text-primary  mr-2"></i>
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

export default Manage_transactions_history;