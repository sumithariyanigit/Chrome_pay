import React from 'react';
import { Link } from 'react-router-dom';

function Recurring_charge_fee() {
    return (
        <div>
            
            <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Account Management Fee</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Account Management Fee</span>
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
            <h5 className="mb-2">Account Management Fee</h5>
            <p>Use this screen to setup customer account management fees.</p>
          </div>
          <form action="" method="">
            <div className="row">

              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="900">
                <label>Customer(search Phone, email, name, customer reference no)</label>
                <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="  -- Apply to all customers -- " type="text" name="product" list="productName"/>
                <datalist id="productName">
                  <option>Ben fury ( 234+2347066211572 )</option>
                  <option>test3 ( 2349086686868686 )</option>
                  <option>annabel string ( 234901628366 )</option>
                  <option>test4 ( 2349656686868686 )</option>
                  <option>Terry James ( 2348057892391 )</option>
                  <option>comfort ( 2348035850347 )</option>
                  <option>Tolulope string ( 9041633802 )</option>
                  <option>Isidienu Nnamdi James ( 2349012210247 )</option>
                  <option>Wendy Peace ( 2348059444434 )</option>
                  <option>lester alioto ( 2349039635961 )</option>
                </datalist>
              </div>

              <div className="col-lg-6  mb-4">
                <label>Currency Code<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                  <option value="">Abkhazia</option>

                </select>
              </div>

              <div className="col-lg-6" data-aos="fade-down" data-aos-delay="900">
                <div className="row">
                  <div className="col-lg-6 mb-4 mm-3" data-aos="fade-down" data-aos-delay="900">
                    <label for="">Starting date</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label for="">Apply every<span className="requrd">*</span></label>
                    <input type="text" className="form-control ht-47" name="" placeholder="" value="0" required="required"/>
                  </div>
                </div>
              </div>
              <div className="col-lg-6  mb-4">
                <label>Type<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                  <option value="" selected="">Day of the month</option>
                </select>
              </div>

              <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="500">
                <label>Payment Type<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Exchange rate feed provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
                  <option value="AIRTIME_TOPUP">Fee on account </option>
                </select>
              </div>

              <div className="col-lg-6 mb-4">
                <label for="">What is the Reference Code of this fee?<span className="requrd">*</span></label>
                <input type="text" className="form-control ht-47" name="" placeholder="" required="required"/>
              </div>

              <div className="col-lg-6" data-aos="fade-down" data-aos-delay="900">
                <div className="row">
                  <div className="col-lg-8 mb-4">
                    <label>Commission Type<span className="requrd">*</span></label>
                    <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                      <option value="">Fixed Amount</option>
                      <option value="">% of Amount</option>
                    </select>
                  </div>

                  <div className="col-lg-4 mb-4">
                    <label for=""><span className="requrd">*</span></label>
                    <input type="text" className="form-control ht-47" name="" placeholder="" value="0.0"/>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="900">
                <label>Apply to customers resident in this country only<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Exchange rate feed provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
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
                  <option value="">Turkey</option>
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

              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="900">
                <label>Bank Account Type*<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Exchange rate feed provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                  <option value="BUSINESS_SAVINGS_ACCOUNT">Business Savings Account</option>
                  <option value="CURRENT_ACCOUNT">Current Account</option>
                  <option value="JOINT_CURRENT_ACCOUNT">Joint Current Account</option>
                  <option value="JOINT_SAVINGS_ACCOUNT">Joint Savings Account</option>
                  <option value="LOAN_FINANCE_ACCOUNT">Loan Account</option>
                  <option value="SAVINGS_ACCOUNT">Savings Account</option>
                  <option value="TRADE_FINANCE_ACCOUNT">Trade Finance Account</option>

                </select>
              </div>
              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="600">
                <label for="">Enter your password</label>
                <input type="password" className="form-control ht-47" name="" placeholder=""/>
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
                      <th>Created Date</th>
                      <th>Last Date</th>
                      <th>Next Date</th>
                      <th>Applicable to</th>
                      <th>Fee Reference Code</th>
                      <th>Country</th>
                      <th>Currency Code</th>
                      <th>Amount</th>
                      <th>Commission Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>03/11/2020</td>
                      <td>25/11/2020</td>
                      <td>25/04/2021</td>
                      <td></td>
                      <td>FE56CGH</td>
                      <td>Nigeria</td>
                      <td>NGN</td>
                      <td>120.90 NGN</td>
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

export default Recurring_charge_fee;