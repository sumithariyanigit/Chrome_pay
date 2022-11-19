import React from 'react';
import { Link } from 'react-router-dom';

function Default_chrges_setup() {
    return (
        <div>
            <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Set Default Commission</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Set Default Commission</span>
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
            <h5 className="mb-2">Set Default Commission</h5>
            <p>View and allocate commission share to various combinations of paycenters.</p>
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
                <label>Delivery Method<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                 <option value="ACCOUNTPAYMENT" selected="selected">Bank Transfer</option>
                <option value="ACCOUNTPAYMENT_DEBIT_CARD">Debit Card</option>
                <option value="ACCOUNTPAYMENT_CREDIT_CARD">Credit Card</option>
                <option value="BILL_PAYMENT">BILL PAYMENT</option>
                <option value="CASHPICKUP">Cash Pickup</option>
                <option value="CURRENCY_CONVERTER">Bureau de Change</option>
                <option value="CRYPTO_CURRENCY">Cryptocurrency</option>
                <option value="WALLET_MONEY_LOAD_CASH">Fund Wallet Account</option>
                <option value="WALLET_MONEY_CASH_OUT">Wallet Account Cash Out</option>
                <option value="MERCHANT_PAYMENT">Merchant Payment</option>
                <option value="PAYMENT_METHOD">Payment Gateway Fee</option>
                <option value="MOBILE_MONEY">Mobile Money Transfer</option>
                <option value="WALLET">Wallet To Wallet Transfer</option>
                <option value="OPENING_ACCOUNT_FEE">Opening Account Fee</option>
                </select>
              </div>  

                <div className="col-lg-6  mb-4">
                <label>Currency Code<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                <option value="AED">AED</option>
                  <option value="AFN">AFN</option>
                  <option value="ALL">ALL</option>
                  <option value="AMD">AMD</option>
                  <option value="ANG">ANG</option>
                  <option value="AOA">AOA</option>
                  <option value="ARS">ARS</option>
                  <option value="AUD">AUD</option>
                  <option value="AWG">AWG</option>
                  <option value="AZN">AZN</option>
                  <option value="BAM">BAM</option>
                  <option value="BBD">BBD</option>
                  <option value="BDT">BDT</option>
                  <option value="BGN">BGN</option>
                  <option value="BHD">BHD</option>
                  <option value="BIF">BIF</option>
                  <option value="BMD">BMD</option>
                  <option value="BND">BND</option>
                  <option value="BOB">BOB</option>
                  <option value="BRL">BRL</option>
                  <option value="BSD">BSD</option>
                  <option value="BTC">BTC</option>
                  <option value="BTN">BTN</option>
                  <option value="BWP">BWP</option>
                  <option value="BYR">BYR</option>
                  <option value="BZD">BZD</option>
                  <option value="CAD">CAD</option>
                  <option value="CDF">CDF</option>
                  <option value="CHF">CHF</option>
                  <option value="CLP">CLP</option>
                  <option value="CNY">CNY</option>
                  <option value="COP">COP</option>
                  <option value="CRC">CRC</option>
                  <option value="CUP">CUP</option>
                  <option value="CVE">CVE</option>
                  <option value="CYP">CYP</option>
                  <option value="CZK">CZK</option>
                  <option value="DJF">DJF</option>
                  <option value="DKK">DKK</option>
                  <option value="DOP">DOP</option>
                  <option value="DZD">DZD</option>
                  <option value="EEK">EEK</option>
                  <option value="EGP">EGP</option>
                  <option value="ERN">ERN</option>
                  <option value="ETB">ETB</option>
                  <option value="ETH">ETH</option>
                  <option value="EUR">EUR</option>
                  <option value="FJD">FJD</option>
                  <option value="FKP">FKP</option>
                  <option value="GBP">GBP</option>
                  <option value="GEL">GEL</option>
                  <option value="GGP">GGP</option>
                  <option value="GHS">GHS</option>
                  <option value="GIP">GIP</option>
                  <option value="GMD">GMD</option>
                  <option value="GNF">GNF</option>
                  <option value="GTQ">GTQ</option>
                  <option value="GYD">GYD</option>
                  <option value="HKD">HKD</option>
                  <option value="HNL">HNL</option>
                  <option value="HRK">HRK</option>
                  <option value="HTG">HTG</option>
                  <option value="HUF">HUF</option>
                  <option value="IDR">IDR</option>
                  <option value="ILS">ILS</option>
                  <option value="IMP">IMP</option>
                  <option value="INR" selected="selected">INR</option>
                  <option value="IQD">IQD</option>
                  <option value="IRR">IRR</option>
                  <option value="ISK">ISK</option>
                  <option value="JEP">JEP</option>
                  <option value="JMD">JMD</option>
                  <option value="JOD">JOD</option>
                  <option value="JPY">JPY</option>
                  <option value="KES">KES</option>
                  <option value="KGS">KGS</option>
                  <option value="KHR">KHR</option>
                  <option value="KMF">KMF</option>
                  <option value="KPW">KPW</option>
                  <option value="KRW">KRW</option>
                  <option value="KWD">KWD</option>
                  <option value="KYD">KYD</option>
                  <option value="KZT">KZT</option>
                  <option value="LAK">LAK</option>
                  <option value="LBP">LBP</option>
                  <option value="LKR">LKR</option>
                </select>
              </div>

              <div className="col-lg-6  mb-4">
                <label>Transaction Originating Country<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="required">
                  <option value="">Afghanistan</option>
                <option value="">Aland</option>
                <option value="">Albania</option>
                <option value="">Algeria</option>
                <option value="">American Samoa</option>
                <option value="">Andorra</option>
                <option value="">Angola</option>
                <option value="">Anguilla</option>
                <option value="">Antarctica</option>
                <option value="">Antigua and Barbuda</option>
                <option value="">Argentina</option>
                <option value="">Armenia</option>
                <option value="">Aruba</option>
                <option value="">Ascension</option>
                <option value="">Ashmore and Cartier Islands</option>
                <option value="">Australia</option>
                <option value="">Australian Antarctic Territory</option>
                <option value="">Austria</option>
                <option value="">Azerbaijan</option>
                <option value="">Bahamas</option>
                <option value="">Bahrain</option>
                <option value="">Baker Island</option>
                <option value="">Bangladesh</option>
                <option value="">Barbados</option>
                <option value="">Belarus</option>
                <option value="">Belgium</option>
                <option value="">Belize</option>
                <option value="">Benin</option>
                <option value="">Bermuda</option>
                <option value="">Bhutan</option>
                <option value="">Bolivia</option>
                <option value="">Bosnia and Herzegovina</option>
                <option value="">Botswana</option>
                <option value="">Bouvet Island</option>
                <option value="">Brazil</option>
                <option value="">British Antarctic Territory</option>
                <option value="">British Indian Ocean Territory</option>
                <option value="">British Sovereign Base Areas</option>
                <option value="">British Virgin Islands</option>
                </select>
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

                <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="600">
                <label className="hides">.</label>
                <div className="row card-cashier ht-48">
                  <div className="col-lg-12">
                    <label className="">
                      <input type="checkbox" name="radio" className=""/>
                      <span>&nbsp; Charges inclusive in sending amount</span>
                    </label>
                  </div>
                </div>
              </div>


             <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="600">
                <label for="">Enter your password</label>
                <input type="password" className="form-control ht-47" name="" placeholder=""/>
              </div>

              <div className="col-lg-6 mt-36">
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
                      <th>Applicable to</th>
                      <th>Delivery Method</th>
                      <th>Transaction Originating Country</th>
                      <th>Currency Code</th>
                      <th>Amount</th>
                      <th>Commission Type </th>
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
  </section>


</main>

        </div>
    );
}

export default Default_chrges_setup;