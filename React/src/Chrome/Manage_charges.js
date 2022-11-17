import React from 'react';
import { Link } from 'react-router-dom';

function Manage_charges() {
    return (
        <div>
          <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Money Transfer Fee</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Money Transfer Fee</span>
      </div>
    </div>
  </div>
</section>

<main id="main">

  <section className="bulk_sms pb-0">
    <div className="container">
      <div className="row justify-content-center filter-box" data-aos="fade-down" data-aos-delay="400">
        <div className="col-lg-12 mb-1">
          <div className="table-title">
            <h5 className="mb-3">Money Transfer Fee</h5>
          </div>
          <form action="" method="">
            <div className="row">
              <div className="col-lg-6  mb-1" data-aos="fade-down" data-aos-delay="600">
                <label>Fee Type</label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                  <option value="">MONEYTRANSFER</option>
                  <option value="">PAYMENT_METHODS</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        </div></div>
  </section>
  <section className="bulk_sms pb-0 pt-0">
    <div className="container">
      <div className="row justify-content-center filter-box">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-3"><Link to="default_chrges_setup">Default Fee &nbsp;<i className="si si-note"></i></Link></h5>
          </div>
        </div>
      </div>
      </div>
  </section>
  <section className="organizationList pt-0">
    <div className="container card-sm" data-aos="fade-down" data-aos-delay="600">
      <div className="table-title">
        <h5 className="mb-0">Current Fees</h5>
        <h6 className="fees_manage">
          <button type="sumit" data-aos="fade-down" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-aos-delay="500" className="btn btn-primary btn_aad  mr-3"><i className="fe fe-plus-circle"></i> &nbsp;Add New Fee</button>
          <Link to="paycenter_commission_manager_default" data-aos="fade-down" data-aos-delay="600" className="btn btn-primary btn_aad ">Default Fee Sharing</Link>
        </h6>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                      <th>Ref. Code</th>
                      <th>Fee Category </th>
                      <th>Paycenter </th>
                      <th>Transaction Originating Country </th>
                      <th>Destination Country </th>
                      <th>Currency Pair</th>
                      <th>Range</th>
                      <th>Modified</th>
                      <th>Delivery Method</th>
                      <th>Rate Type</th>
                      <th>Fee</th>
                      <th>Inclusive</th>
                      <th>Approved</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CHR6336</td>
                      <td>Wallet money cash out</td>
                      <td>--- All ---</td>
                      <td>Nigeria</td>
                      <td>Nigeria</td>
                      <td> NGN / NGN</td>
                      <td>NGN 1,000.00 - NGN 100,000.00</td>
                      <td>Fri Jun 18 09:51:27 BST 2021</td>
                      <td>Wallet To Wallet Transfer</td>
                      <td>FLAT</td>
                      <td>NGN 90.00</td>
                      <td>No</td>
                      <td><span className="agreen">Yes</span></td>
                      <td><span className="justify-content-center d-flex w-100">
                          <Link to="#" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail"><i className="si si-note text-primary mr-2"></i>
                          </Link>
                          <Link to="#" className="icon_btn text-primary" data-toggle="tooltip" title="" data-placement="left" data-original-title="Share"><i className="fe fe-share-2 mr-2"></i>
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

<div className="modal fade" id="staticBackdrop" className="modal in" data-easein="slideRight" tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div className="modal-dialog exchange_list modal-learge">
    <form>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Add new or modify Fee for Money Transfer </h5>
          <button type="button" className="btn-closes" data-bs-dismiss="modal" aria-label="Close">
            <i className="fe fe-x"></i></button>
        </div>
        <div className="modal-body">
          <div className="row">

            <div className="col-lg-4 mb-3">
              <label>Fee Category</label>
              <select className="selectpicker form-control" id="myselection" data-hide-disabled="true" data-live-search="true" title="Please Select...">
                <option value="">Remittance</option>
                <option value="">Money transfer cancellation</option>
                <option value="">Wallet money load cash</option>
                <option value="">Wallet money cash out</option>
              </select>
            </div>

            <div className="col-lg-4 mb-2">
              <label>Starting Amount</label>
              <input className="form-control ht-47" placeholder="" type="number" value="0"/>
            </div>

            <div className="col-lg-4 mb-3">
              <label>Pay Centre</label>
              <select className="selectpicker form-control" id="myselection" data-hide-disabled="true" data-live-search="true" title="Please Select...">
                <option value="">yusufAbdul9800</option>
                <option value="">YusufAbdulazzez9581</option>
                <option value="">YusufAbdulazzez9613</option>
                <option value="">YusufAbdulazzez9660</option>
                <option value="">YusufAbdulazzez9711</option>
                <option value="">YusufABDULAZZEZ9725</option>
                <option value="">YusufAbdulazzez9739</option>
                <option value="">YusufAbdulazzez9747</option>
                <option value="">YusufAgbaje9551</option>
                <option value="">yusufmariam9547</option>
                <option value="">yusufolatunji9520</option>
                <option value="">YusufSofiulahi9521</option>
                <option value="">ZachariahThankGod9585</option>
                <option value="">zekerizetina9696</option>
                <option value="">zekerizetina9714</option>
                <option value="">zekerizetina9721</option>
                <option value="">zekowire9660</option>
                <option value="">zetinazekerr9654</option>
                <option value="">zing</option>
                <option value="">zubairdaru abdulrahman9547</option>
              </select>
            </div>



            <div className="col-lg-4 mb-2">
              <label>End Amount</label>
              <input className="form-control ht-47" placeholder="" type="number" value="0"/>
            </div>


            <div className="col-lg-4 mb-3">
              <label>Transaction Originating Country</label>
              <select className="selectpicker form-control" id="myselection" data-hide-disabled="true" data-live-search="true" title="Please Select...">
                <option value="">Remittance</option>
                <option value="">Nigeria</option>
              </select>
            </div>


            <div className="col-lg-4 mb-3">
              <label>Fee Type</label>
              <select className="selectpicker form-control" id="myselection" data-hide-disabled="true" data-live-search="true" title="Please Select...">
                <option value="">FLAT </option>
                <option value="">PERCENTAGE</option>
              </select>
            </div>
            <div className="col-lg-4 mb-3">
              <label>Destination Country</label>
              <select className="selectpicker form-control" id="myselection" data-hide-disabled="true" data-live-search="true" title="Please Select...">
               
              </select>
            </div>


            <div className="col-lg-4 mb-2">
              <label>Fee</label>
              <input className="form-control ht-47" placeholder="" type="number" value="0"/>
            </div>


            <div className="col-lg-4 mb-3">
              <label>To Currency</label>
              <select className="selectpicker form-control" id="myselection" data-hide-disabled="true" data-live-search="true" title="Please Select...">
              
              </select>
            </div>

            <div className="col-lg-4 mb-3">
              <div className="row card-cashier mt-3">
                <div className="col-lg-12">
                  <label className="">
                    <input type="checkbox" name="radio" className=""/>
                    <span>&nbsp; Charges inclusive in sending amount</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <label>Delivery Method</label>
              <select className="selectpicker form-control" id="myselection" data-hide-disabled="true" data-live-search="true" title="Please Select...">
           
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary btn_veri1">Save Fee</button>
          <button type="button" className="btn btn-secondary btn-reset" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </form>
  </div>
</div>  
            
        </div>
    );
}

export default Manage_charges;