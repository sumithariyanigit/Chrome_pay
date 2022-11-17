import React from 'react';
import { Link } from 'react-router-dom';

function Exchange_rates_list() {
    return (
        <div>
            
<section className="bg_bulk d-flex align-items-center">
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
               <h1 className="sub-title">Filter Exchange Rates</h1>
             </div>


              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="500">
                <label>Transaction Originating Country</label>
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

                <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="500">
                <label>Delivery Method</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Exchange rate feed provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
                  <option value="AIRTIME_TOPUP">Airtime Topup</option>
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

                <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="500">
                <label>Receiving Country</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Exchange rate feed provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
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


                 <div className="col-lg-6" data-aos="fade-down" data-aos-delay="400">
               <div className="row">
               <div className="col-lg-6 mb-4">
                   <label>Currency From</label>
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



                  <div className="col-lg-6 mb-4">
                   <label>Currency To</label>
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

               <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="400">
                  <label>Make this rate available to Organization/Branch</label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder=" -- Allocated to all agents/branches -- " type="text"/>
                 </div>


              <div className="col-lg-6 mt-38">
                <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Search</button>
                <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
  </section>
<section className="organizationList pt-0">
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="500">
       <div className="table-title">
            <h5 className="mb-0">Filter Exchange Rates List</h5>
          </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                  <th>Currency Pair</th> 
                  <th>Transaction Originating Country/Receiving Country</th> 
                  <th>Delivery Method </th>
                  <th>Updated Details</th> 
                  <th>Sell Spot Prices/Spot Prices  </th>
                  <th>Profit</th>  
                  <th>Edit</th>  
                  <th>Status  </th>
                  <th>Approved  </th>
                  <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>NGN / NGN</td>
                      <td>Nigeria / Nigeria</td>
                      <td>Bank Transfer </td>
                      <td>NA NA 03/11/2020 07:34</td>
                      <td>1.0000 / 1.0000 </td>
                      <td>NGN 0.00</td>
                      <td>1.0</td>
                       <td><span className="agreen">Activated</span></td>
                      <td><span className="agreen">Yes</span></td>
                      <td><span className="justify-content-center d-flex w-100">
                       <Link to="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Edit"><i className="si si-note text-primary mr-2"></i>
                        </Link>
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>

                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span></td>
                      </tr><tr>
                      <td>NGN / NGN</td>
                      <td>Nigeria / Nigeria</td>
                      <td>Bank Transfer </td>
                      <td>NA NA 03/11/2020 07:34</td>
                      <td>1.0000 / 1.0000 </td>
                      <td>NGN 0.00</td>
                      <td>1.0</td>
                       <td><span className="agreen">Activated</span></td>
                      <td><span className="agreen">Yes</span></td>
                      <td><span className="justify-content-center d-flex w-100">
                       <Link to="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Edit"><i className="si si-note text-primary mr-2"></i>
                        </Link>
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
                        </Link>

                         <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Delete"><i className="fe fe-trash-2  mr-2"></i>
                        </Link>
                      </span></td>
                      </tr><tr>
                      <td>NGN / NGN</td>
                      <td>Nigeria / Nigeria</td>
                      <td>Bank Transfer </td>
                      <td>NA NA 03/11/2020 07:34</td>
                      <td>1.0000 / 1.0000 </td>
                      <td>NGN 0.00</td>
                      <td>1.0</td>
                       <td><span className="agreen">Activated</span></td>
                      <td><span className="agreen">Yes</span></td>
                      <td><span className="justify-content-center d-flex w-100">
                       <Link to="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="Edit"><i className="si si-note text-primary mr-2"></i>
                        </Link>
                        <Link to="#" className="icon_btn text-danger" data-toggle="tooltip" title="" data-placement="left" data-original-title="Suspend"><i className="fe fe-minus-circle mr-2"></i>
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


{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop"   className="modal in" data-easein="bounceRightIn" tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
  <div className="modal-dialog exchange_list">
   <form>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Edit &nbsp;<i className="si si-note"></i></h5>
        <button type="button" className="btn-closes" data-bs-dismiss="modal" aria-label="Close">
          <i className="fe fe-x"></i></button>
      </div>
      <div className="modal-body">
      <div className="row">
        <div className="col-lg-12 mb-1">
         <h3>Please note- auto update will use the official exchange rates for selling adjustments. ( NGN / NGN)</h3> 
        </div>
        <div className="col-lg-6 mb-3">
          <label className="hides">.</label>
            <div className="row card-cashier">
                  <div className="col-lg-12 mm-1">
                    <label className="coustom_radio">
                      <input type="radio" name="radio"/>
                      <span>Auto Update</span>
                    </label>
                  </div>
                </div>
         </div>
         <div className="col-lg-6 mb-3">
           <label>Adjustment Type</label>
           <select className="selectpicker form-control" id="myselection" data-hide-disabled="true">
             <option value="">+</option>
             <option value="">-</option>
           </select>
         </div>
         <div className="col-lg-12 form-mask mb-2">
               <div className="row">
                 <div className="col-lg-6 mb-2">
                  <label>Buy Rate</label>
                   <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">ngn</span>
                          </div>
                        <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="1245"/> 
                        </div>
                 </div>
                 <div className="col-lg-6 mb-2"> 
                  <label>Spread(%)</label>
                   <div className="input-group">
                        <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="1.5"/>
                        </div>
                 </div>
              
               
              </div>
              </div>
                 <div className="col-lg-6 mb-3">
                  <label>Sell Rate</label>
                   <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">ngn</span>
                          </div>
                        <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="100.4238" readonly=""/>
                        </div>
                 </div>
                <div className="col-lg-6 mb-3">
                  <label>Total Profit</label>
                   <div className="input-group">
                   <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="NGN 126.9000" readonly=""/>
                        </div>
                 </div>
                 <div className="col-lg-12">
           <label>Settlement Currency</label>
           <select className="selectpicker form-control" id="myselection" data-hide-disabled="true">
             <option value="">NGN</option>
             <option value="">NGN</option>
           </select>
         </div>
      </div>
      </div>
      <div className="modal-footer">
      <button type="submit" className="btn btn-primary btn_veri1">Update</button>
          <button type="button" className="btn btn-secondary btn-reset" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
         </form>
  </div>
</div>

        </div>
    );
}

export default Exchange_rates_list;