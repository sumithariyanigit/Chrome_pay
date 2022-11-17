import React from 'react';
import { Link } from 'react-router-dom';

function Dynamic_field_list() {
    return (
        <div>
            <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Dynamic Field Form</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Dynamic Field Form</span>
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
            <h5 className="mb-2">Dynamic Field Form</h5>
            <p>Use this page to set/view dynamic fields.</p>
          </div>
          <form action="" method="">
            <div className="row">
              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="400">
                <label>Form</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">REGISTERED_CUSTOMER_SIGNUP</option>
                  <option value="">REGISTERED_CUSTOMER_LOGIN</option>
                  <option value="">REGISTERED_CUSTOMER_SEND_MOBILE_MONEY</option>
                  <option value="">REGISTERED_CUSTOMER_SEND_BANK_TRANSFER</option>
                  <option value="">REGISTERED_CUSTOMER_SEND_CASH_PICKUP</option>
                  <option value="">REGISTERED_CUSTOMER_SEND_BILL_PAYMENT</option>
                  <option value="">REGISTERED_CUSTOMER_MERCHANT</option>
                  <option value="">COMPANY_CUSTOMER_SIGNUP</option>
                  <option value="">COMPANY_CUSTOMER_LOGIN</option>
                  <option value="">COMPANY_CUSTOMER_SEND_MOBILE_MONEY</option>
                  <option value="">COMPANY_CUSTOMER_SEND_BANK_TRANSFER</option>
                  <option value="">COMPANY_CUSTOMER_SEND_CASH_PICKUP</option>
                  <option value="">COMPANY_CUSTOMER_SEND_BILL_PAYMENT</option>
                  <option value="">COMPANY_CUSTOMER_MERCHANT</option>
                  <option value="">REGISTERED_CUSTOMER_EDIT_BENE</option>
                  <option value="">REGISTERED_CUSTOMER_CREATE_BENE</option>
                  <option value="">COMPANY_CUSTOMER_EDIT_BENE</option>
                  <option value="">COMPANY_CUSTOMER_CREATE_BENE</option>
                  <option value="">REGISTERED_CUSTOMER_SEND_AIRTIME_TOPUP</option>
                  <option value="">COMPANY_CUSTOMER_SEND_AIRTIME_TOPUP</option>
                </select>
              </div>

              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="500">
                <label>Labels</label>
                <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text"/>
              </div>

              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="400">
                <label>Input Field Type</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="DROP_DOWN">DROP_DOWN</option>
                  <option value="FREE_TEXT_SINGLE_LINE">FREE_TEXT_SINGLE_LINE</option>
                  <option value="FREE_TEXT_AREA">FREE_TEXT_AREA</option>
                </select>
              </div>

              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="400">
                <label>Input Field Value</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="INT">Small Number</option>
                  <option value="DOUBLE">Large Number</option>
                  <option value="STRING">Text</option>
                  <option value="DATE">Date</option>
                  <option value="EMAIL">Email</option>
                  <option value="PASSWORD">Password</option>
                </select>
              </div>

              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="500">
                <label>Minimum length</label>
                <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="0"/>
              </div>
              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="500">
                <label>Maximum length</label>
                <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="0"/>
              </div>
              <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="500">
                <label>Initial Value</label>
                <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text"/>
              </div>

              <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="400">
                <label>Country</label>
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
                </select>
              </div>

              <div className="col-lg-12 mb-3" data-aos="fade-up" data-aos-delay="500">
                <div className="form-floating">
                  <textarea name="content" id="editor"></textarea>
                </div>
              </div>
              <div className="col-lg-6 mb-4 aos-init aos-animate" data-aos="fade-down" data-aos-delay="600">

                <div className="row card-cashier ht-48">
                  <div className="col-lg-12">
                    <label className="">
                      <input type="checkbox" name="radio" className=""/>
                      <span>&nbsp;Status</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
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
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="400">
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                      <th>Form</th>
                      <th>Name </th>
                      <th>Redeemed Count </th>
                      <th>Creation Date</th>
                      <th>Status</th>
                      <th>Input Field Type</th>
                      <th>Action </th>
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
</main>
        </div>
    );
}

export default Dynamic_field_list;