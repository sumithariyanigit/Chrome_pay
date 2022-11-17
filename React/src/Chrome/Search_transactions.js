import React from 'react';
import { Link } from 'react-router-dom';

function Search_transactions() {
    return (
        <div>
         
<section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" className="aos-init aos-animate"><span><b>Search Transactions</b></span></h1>
        <p data-aos="fade-up" className="aos-init aos-animate"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="search_transactions">Dashboard</Link> - <span>Search Transactions</span>
      </div>
    </div>
  </div>
</section>

<main id="main">

  <section className="bulk_sms pb-0">
    <div className="container">
      <div className="row justify-content-center filter-box" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
          <div className="section-title title-bulk">
            <h1>Search Transactions</h1>
            <p>Search your transaction here by entering different criteria.</p>
          </div>
          <form action="" method="">
            <div className="row">
              <div className="col-lg-6  mb-3">
                <label>Search Criteria</label>
                <select className="selectpicker form-control" id="myselection" title="Search Criteria" data-live-search="true" data-hide-disabled="true" >
                  <option value="pcn" selected="">PCN</option>
                  <option value="dateRange">Sender Name</option>
                  <option value="dateRange">Beneficiary Name</option>
                  <option value="cashiers">Cashier Name</option>
                  <option value="date">Date Range</option>
                  <option value="amount">Amount Range</option>
                  <option value="range">Amount Range + Date Range</option>
                </select>
              </div>
              <div className="col-lg-6 mb-3 showcashiers showdateRange myDiv showpcn">
                <label for="">Search</label>
                <input type="Search" className="form-control ht-47" name=""  placeholder=""/>
              </div>


              <div className="col-lg-6 showamount showrange myDiv mm-3">
                <label>Search Mode</label>
                <div className="row card-cashier">
                  <div className="col-lg-5 mm-1">
                    <label className="coustom_radio">
                      <input type="radio" name="radio" />
                      <span>Sending Amount</span>
                    </label>
                  </div>

                  <div className="col-lg-5 mm-1">
                    <label className="coustom_radio">
                      <input type="radio" name="radio" />
                      <span>Receiving Amount</span>
                    </label>
                  </div>
                  <div className="col-lg-2 mm-1 mmb-1 ">
                    <label className="coustom_radio">
                      <input type="radio" name="radio" />
                      <span>Both</span>
                    </label>
                  </div>
                </div>
              </div>




              <div className="col-lg-6 mb-3 showcashiers showdateRange showdate showrange myDiv">
                <div className="row">
                  <div className="col-lg-6 mm-3">
                    <label for="">From</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date"  className="form-control ht-47" name=""  placeholder="MM/DD/YY"/>
                  </div>

                  <div className="col-lg-6">
                    <label for="">To</label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date"  className="form-control ht-47" name=""  placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-3 showdateRange  myDiv">
                <label for="">Relationship</label>
                <select className="selectpicker form-control" title="" data-live-search="true" data-hide-disabled="true" >
                  <option value="GRAND_MOTHER">GRAND_MOTHER</option>
                  <option value="HUSBAND">HUSBAND</option>
                  <option value="MOTHER">MOTHER</option>
                  <option value="MOTHER_IN_LAW">MOTHER_IN_LAW</option>
                  <option value="NEPHEW">NEPHEW</option>
                  <option value="NIECE">NIECE</option>
                  <option value="SELF">SELF</option>
                  <option value="SISTER">SISTER</option>
                  <option value="SISTER_IN_LAW">SISTER_IN_LAW</option>
                  <option value="SON">SON</option>
                  <option value="UNCLE">UNCLE</option>
                </select>
              </div>


              <div className="col-lg-6 showcashiers myDiv mm-3">
                <label>Cashier Type</label>
                <div className="row card-cashier">
                  <div className="col-lg-3 mm-1">
                    <label className="coustom_radio">
                      <input type="radio" name="radio" />
                      <span>Pay-in</span>
                    </label>
                  </div>

                  <div className="col-lg-3 mm-1">
                    <label className="coustom_radio">
                      <input type="radio" name="radio" />
                      <span>Pay-out</span>
                    </label>
                  </div>
                  <div className="col-lg-3 mm-1 mmb-1">
                    <label className="coustom_radio">
                      <input type="radio" name="radio" />
                      <span>Both</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mb-3 showrange showamount myDiv">
                <div className="row">
                  <div className="col-lg-4 mm-1">
                    <label for="">Amount From</label>
                    <input type="number" id="datepickerLast" className="form-control ht-47" name=""  placeholder="0"/>
                  </div>
                  <div className="col-lg-4 mm-1">
                    <label for="">Amount To</label>
                    <input type="number" id="datepickerLast" className="form-control ht-47" name=""  placeholder="0"/>
                  </div>
                  <div className="col-lg-4 mm-1">
                    <label for="">Currency From</label>
                    <select className="selectpicker form-control" title="" data-hide-disabled="true" >
                      <option>NGN</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
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
      <div className="section-title">
        <h1 className="mb-0">Transaction History</h1>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr className="trans_th">
                      <th>Transaction date</th>
                      <th>PCN</th>
                      <th>Pay-in Cashier</th>
                      <th>Pay-out Cashier</th>
                      <th>Sender Name </th>
                      <th>Beneficiary Name </th>
                      <th>Relationship</th>
                      <th>Sending Amount</th>
                      <th>Receiver Amount</th>
                      <th>Status</th>
                      <th className="nosort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i className="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i className="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i className="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i className="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span className="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" className="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i className="fe fe-eye  text-primary mr-2"></i>
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

export default Search_transactions;