import React from 'react';
import { Link } from 'react-router-dom';

function Exchange_rates() {
    return (
        <div>
            <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Global Exchange Rates</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Global Exchange Rates</span>
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
            <h5 className="mb-2">Global Exchange Rates</h5>
            <p>Use this section to edit exchange rates for all of your agent transactions. You can also set charges and add exchange rates here.</p>
          </div>
          <form action="" method="">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="sub-title">Add Exchange Rate Range</h1>
              </div>
              <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="500">
                <label>Exchange rate feed provider<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Exchange rate feed provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
                  <option selected="" value="">I will use MTA exchange rate feed</option>
                  <option value="">I will input exchange rate</option>
                  <option value="">Link to another currency</option>
                </select>
              </div>

              <div className="col-lg-6 form-mask mb-3" data-aos="fade-down" data-aos-delay="500">
                <div className="row">
                  <div className="col-lg-3 mb-3" data-aos="fade-down" data-aos-delay="600">
                    <label>Buy Rate</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">rub</span>
                      </div>
                      <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="1245"/>
                    </div>
                  </div>
                  <div className="col-lg-3 mb-3" data-aos="fade-down" data-aos-delay="700">
                    <label>Spread(%)</label>
                    <div className="input-group">
                      <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="1.5"/>
                    </div>
                  </div>
                  <div className="col-lg-3 mb-3" data-aos="fade-down" data-aos-delay="800">
                    <label>Sell Rate</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">rub</span>
                      </div>
                      <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="100.4238"/>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <label>Total Profit</label>
                    <div className="input-group">
                      <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="RUB 126.9000" readonly=""/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="600">
                <label>Transaction Originating Country<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">Abkhazia</option>
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
                  <option value="">Brunei</option>
                  <option value="">Bulgaria</option>
                  <option value="">Burkina Faso</option>
                  <option value="">Burundi</option>
                  <option value="">Cambodia</option>
                </select>
              </div>

              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="600">
                <label className="hides">.</label>
                <div className="row card-cashier ht-48">
                  <div className="col-lg-12">
                    <label className="">
                      <input type="checkbox" name="radio" className=""/>
                      <span>&nbsp;Use as an Intermediary currency (Not visible to the customers)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-down" data-aos-delay="700">
                <label>Delivery Method<span className="requrd">*</span>(Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.)</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">Bank Transfer</option>
                  <option value="">Debit Card</option>
                  <option value="">Credit Card</option>
                  <option value="">BILL PAYMENT</option>
                  <option value="">Cash Pickup</option>
                  <option value="">Bureau de Change</option>
                  <option value="">Cryptocurrency</option>
                  <option value="">Merchant Payment</option>
                  <option value="">MERCHANT PRODUCT</option>
                  <option value="">Mobile Money</option>
                  <option value="">WALLET</option>
                </select>
              </div>

              <div className="col-lg-6 top-6 mb-2" data-aos="fade-down" data-aos-delay="700">
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <label>Expire quote after</label>
                    <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="1245"/>
                  </div>
                  <div className="col-lg-6 mb-1">
                    <label>Unit</label>
                    <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                      <option value="">MINUTE</option>
                      <option value="" selected="">HOUR</option>
                    </select>
                  </div>
                </div>
              </div>


              <div className="col-lg-6" data-aos="fade-down" data-aos-delay="800">
                <label>Receiving Country<span className="requrd">*</span> (Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.)</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">Bank Transfer</option>
                  <option value="">Debit Card</option>
                  <option value="">Credit Card</option>
                  <option value="">BILL PAYMENT</option>
                  <option value="">Cash Pickup</option>
                  <option value="">Bureau de Change</option>
                  <option value="">Cryptocurrency</option>
                  <option value="">Merchant Payment</option>
                  <option value="">MERCHANT PRODUCT</option>
                  <option value="">Mobile Money</option>
                  <option value="">WALLET</option>
                </select>
              </div>

              <div className="col-lg-6 top-6 mb-4" data-aos="fade-down" data-aos-delay="800">
                <label>Settlement Currency <span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">MINUTE</option>
                  <option value="" selected="">HOUR</option>
                </select>
              </div>

              <div className="col-lg-6 " data-aos="fade-down" data-aos-delay="500">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label>Currency From<span className="requrd">*</span></label>
                    <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
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
                    </select>
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label>Currency To<span className="requrd">*</span></label>
                    <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                      <option value="KYD">KYD</option>
                      <option value="KZT">KZT</option>
                      <option value="LAK">LAK</option>
                      <option value="LBP">LBP</option>
                      <option value="LKR">LKR</option>
                      <option value="LRD">LRD</option>
                      <option value="LSL">LSL</option>
                      <option value="LTC">LTC</option>
                      <option value="LTL">LTL</option>
                      <option value="LVL">LVL</option>
                      <option value="LYD">LYD</option>
                      <option value="MAD">MAD</option>
                      <option value="MDL">MDL</option>
                      <option value="MGA">MGA</option>
                      <option value="MKD">MKD</option>
                      <option value="MMK">MMK</option>
                      <option value="MNT">MNT</option>
                      <option value="MOP">MOP</option>
                      <option value="MRO">MRO</option>
                      <option value="MTL">MTL</option>
                      <option value="MUR">MUR</option>
                      <option value="MVR">MVR</option>
                      <option value="MWK">MWK</option>
                      <option value="MXN">MXN</option>
                      <option value="MYR">MYR</option>
                      <option value="MZM">MZM</option>
                      <option value="NAD">NAD</option>
                      <option value="NGN">NGN</option>
                      <option value="NIO">NIO</option>
                      <option value="NOK">NOK</option>
                      <option value="NPR">NPR</option>
                      <option value="NZD">NZD</option>
                      <option value="OMR">OMR</option>
                      <option value="PAB">PAB</option>
                      <option value="PEN">PEN</option>
                      <option value="PGK">PGK</option>
                      <option value="PHP">PHP</option>
                      <option value="PKR">PKR</option>
                      <option value="PLN">PLN</option>
                      <option value="PYG">PYG</option>
                      <option value="QAR">QAR</option>
                      <option value="RON">RON</option>
                      <option value="RSD">RSD</option>
                      <option value="RUB">RUB</option>
                      <option value="RWF">RWF</option>
                      <option value="SAR">SAR</option>
                      <option value="SBD">SBD</option>
                      <option value="SCR">SCR</option>
                      <option value="SDG">SDG</option>
                      <option value="SEK">SEK</option>
                      <option value="SGD">SGD</option>
                      <option value="SHP">SHP</option>
                      <option value="SKK">SKK</option>
                      <option value="SLL">SLL</option>
                      <option value="SOS">SOS</option>
                      <option value="SRD">SRD</option>
                      <option value="SSP">SSP</option>
                      <option value="STD">STD</option>
                      <option value="SYP">SYP</option>
                      <option value="SZL">SZL</option>
                      <option value="THB">THB</option>
                      <option value="TJS">TJS</option>
                      <option value="TMM">TMM</option>
                      <option value="TND">TND</option>
                      <option value="TOP">TOP</option>
                      <option value="TRY">TRY</option>
                      <option value="TTD">TTD</option>
                      <option value="TWD">TWD</option>
                      <option value="TZS">TZS</option>
                      <option value="UAH">UAH</option>
                      <option value="UGX">UGX</option>
                      <option value="USD">USD</option>
                      <option value="UYU">UYU</option>
                      <option value="UZS">UZS</option>
                      <option value="VEB">VEB</option>
                      <option value="VND">VND</option>
                      <option value="VUV">VUV</option>
                      <option value="WST">WST</option>
                      <option value="XAF">XAF</option>
                      <option value="XCD">XCD</option>
                      <option value="XOF">XOF</option>
                      <option value="XPF">XPF</option>
                      <option value="YER">YER</option>
                      <option value="ZAR">ZAR</option>
                      <option value="ZMW">ZMW</option>
                      <option value="ZWD">ZWD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="500">
                <label>Make this rate available to Organization/Branch</label>
                <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder=" -- Allocated to all agents/branches -- " type="text"/>
              </div>

              <div className="col-lg-12 mb-2" data-aos="fade-down" data-aos-delay="700">
                <h1 className="sub-title">Advance Setup [ Smart Routing ]</h1>
              </div>

              <div className="col-lg-6 mb-2" data-aos="fade-down" data-aos-delay="500">
                <label>Auto route to an Agent/Branch/Partner API for processing</label>
                <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="  -- I will select later -- " type="text"/>
              </div>

              <div className="col-lg-6 mb-2" data-aos="fade-down" data-aos-delay="500">
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <label>Minimum Amount(BTC)</label>
                    <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="number" value="0.00" data-aos="fade-down" data-aos-delay="500"/>
                  </div>
                  <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="500">
                    <label>Maximum Amount (BTC)</label>
                    <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="number" value="1000000.00"/>
                  </div>
                </div>
              </div>


              <div className="col-lg-6">
                <button type="sumit" className="btn btn-primary btn_veri1  mb-3"><i className="fe fe-plus-circle"></i> Add</button>
                <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
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

export default Exchange_rates;