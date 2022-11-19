import React from 'react';
import { Link } from 'react-router-dom';

function Search_transactions_detail() {
    return (
        <div>
            

            <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" className=""><span><b>Transactions Details</b></span></h1>
        <p data-aos="fade-up" className=""></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-down" data-aos-delay="400">
        <Link to="search_transactions">Search Transactions</Link> - <span>Transactions Details</span>
      </div>
    </div>
  </div>
</section>

<main id="main">
  <section  className="bulk_sms complacne pb-0">
     <div className="container" data-aos="fade-down" data-aos-delay="200">
        <div className="row filter-box">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="table-buttons"> 
                        <Link to="#" className="btn btn-detail btn-red" data-aos="fade-up" data-aos-delay="200">Cancel And Apply Cancellation Fee</Link>
                        <Link to="#" className="btn btn-detail btn-red" data-aos="fade-up" data-aos-delay="300">Cancel Without Cancellation Fee</Link>
                        <Link to="#" className="btn btn-detail btn-red" data-aos="fade-up" data-aos-delay="400">Send SMS</Link>
                        <Link to="#" className="btn btn-detail btn-blue" data-aos="fade-down" data-aos-delay="500">Download Receipt PDF</Link>
                        <Link to="#" className="btn btn-detail btn-blue" data-aos="fade-down" data-aos-delay="600">View History</Link>
                    </div>
            </div>
          </div>
          <div className="col-lg-12">
             <div className="table-title">
                    <h5 className="fnt-26">Compliance</h5>
                    </div>
                      <div className="table-responsive">
                     <table id="exportexample" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                       <thead>
                         <tr>
                           <th className="">Execution Date</th>
                           <th className="">Ref No</th>
                           <th className="">Rule category</th>
                           <th className="">Executed on </th>
                           <th className="">Result</th>
                           <th className="">Displayed message to customer/compliance officer</th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr>
                           <td>11/08/2020 06:42</td>
                           <td>SANC301</td>
                           <td>SANCTIONLIST</td>
                           <td>On transaction</td>
                           <td>create Pass</td>
                           <td>RECEIVER</td>
                         </tr>  
                          <tr>
                           <td>11/08/2020 06:42</td>
                           <td>SANC301</td>
                           <td>SANCTIONLIST</td>
                           <td>On transaction</td>
                           <td>create Pass</td>
                           <td>RECEIVER</td>
                         </tr>   <tr>
                           <td>11/08/2020 06:42</td>
                           <td>SANC301</td>
                           <td>SANCTIONLIST</td>
                           <td>On transaction</td>
                           <td>create Pass</td>
                           <td>RECEIVER</td>
                         </tr>   <tr>
                           <td>11/08/2020 06:42</td>
                           <td>SANC301</td>
                           <td>SANCTIONLIST</td>
                           <td>On transaction</td>
                           <td>create Pass</td>
                           <td>RECEIVER</td>
                         </tr>   
                       </tbody>
                     </table>
                   </div>
                 </div>
           </div>
      </div>
  </section>
  <section className="bulk_sms pt-0 pb-0">
    <div className="container" data-aos="fade-down" data-aos-delay="200">
        <div className="row filter-box">
                 <div className="col-lg-12">
             <div className="table-title">
                    <h5 className="fnt-20"><Link to="#">(ADD NEW LINKED TRANSACTION [MATCH BY COUNTRY, DOB, FULL NAME ]) </Link></h5>
                    </div>
                      <div className="table-responsive">
                     <table id="example3" className="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                       <thead>
                         <tr>
                           <th className="">Execution Date</th>
                           <th className="">PCN</th>
                           <th className="">Total Amount Sent</th>
                           <th className="">Sender</th>
                           <th className="">Beneficiary Name</th>
                           <th className="">Beneficiary Code</th>
                         </tr>
                       </thead>
                       <tbody>
                        
                       </tbody>
                     </table>
                   </div>
                 </div>
        </div>
        </div>
  </section>
  <section className="bulk_sms pb-0 pt-0 card-transtion">
    <div className="container">
      <div className="row justify-content-center filter-box" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3 mpd-0">
          <nav className="card-transtion">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-transactions-tab" data-bs-toggle="tab" data-bs-target="#nav-transactions" type="button" role="tab" aria-controls="nav-transactions" aria-selected="true">Transaction Details</button>
              <button className="nav-link" id="nav-sender-tab" data-bs-toggle="tab" data-bs-target="#nav-sender" type="button" role="tab" aria-controls="nav-sender" aria-selected="false">Sender Details</button>
              <button className="nav-link" id="nav-benificary-tab" data-bs-toggle="tab" data-bs-target="#nav-benificary" type="button" role="tab" aria-controls="nav-benificary" aria-selected="false">Beneficiary Details</button>
              <button className="nav-link" id="nav-agent-tab" data-bs-toggle="tab" data-bs-target="#nav-agent" type="button" role="tab" aria-controls="nav-agent" aria-selected="false">Organization / Branch</button>
              <button className="nav-link" id="nav-receving-tab" data-bs-toggle="tab" data-bs-target="#nav-receving" type="button" role="tab" aria-controls="nav-receving" aria-selected="false">Receiving Pay Centre</button>
            </div>
          </nav>
          <div className="tab-content content-white" id="nav-tabContent">
            <div className="tab-pane fade show active pt-4" id="nav-transactions" role="tabpanel" aria-labelledby="nav-transactions-tab">
 
              <div className="container" data-aos="fade-down" data-aos-delay="400">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="card-title" data-aos="fade-down" data-aos-delay="100">
                      <h2>Transaction Details</h2>
                    </div>
                    <div className="col-lg-12">
                      <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                        <h5>Amount :</h5>
                        <h5>51.02 NGN</h5>
                      </div>
                      <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                        <h5>Commission :</h5>
                        <h5>0.00 NGN</h5>
                      </div>
                      <div className="card-detail" data-aos="fade-down" data-aos-delay="200">
                        <h5>Payment Fee :</h5>
                        <h5>0.00 NGN</h5>
                      </div>
                      <div className="card-detail" data-aos="fade-down" data-aos-delay="300">
                        <h5>Exchange Rate : </h5>
                        <h5>51.0200 NGN = 50.00 NGN <br/><span>(1 NGN = 0.98)</span></h5>
                      </div>
                      <div className="card-detail" data-aos="fade-down" data-aos-delay="300">
                        <h5>Total Amount Paid :</h5>
                        <h5>51.02 NGN</h5>
                      </div>
                      <div className="card-detail" data-aos="fade-down" data-aos-delay="400">
                        <h5>Total Amount Sent :</h5>
                        <h5>50.00 NGN</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="img-transtio">
                      <img src="assets/images/transtion.png" data-aos="fade-in" data-aos-delay="500"/>
                    </div>
                  </div>
                </div>
                <div className="row border-top">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">

                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="100">
                          <h5>PCN</h5>
                          <h6>CHR14434145</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="100">
                          <h5>Transaction Status</h5>
                          <h6>Initiated</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="200">
                          <h5>Delivery Method</h5>
                          <h6>Bank Transfer</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="200">
                          <h5>Payment Type</h5>
                          <h6>Customer is paying with Wallet</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="300">
                          <h5>Confirmation staff</h5>
                          <h6>puny satavas</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="300">
                          <h5>Order No</h5>
                          <h6>CESU5O_2</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="300">
                          <h5>Serial Number</h5>
                          <h6>CHR14434145</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="400">
                          <h5>Source Of Funds</h5>
                          <h6>SAVINGS</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-down" data-aos-delay="400">
                          <h5>Settlement Currency</h5>
                          <h6>NGN</h6>
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="100">
                          <h5>Registered_customer</h5>
                          <h6>puny satavas</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="200">
                          <h5>Transaction date</h5>
                          <h6>11/08/2020 06:42</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="200">
                          <h5>Sending Country</h5>
                          <h6>Nigeria</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="300">
                          <h5>Receiving Country</h5>
                          <h6>Nigeria</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="300">
                          <h5>Customer remarks</h5>
                          <h6>remarks</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="400">
                          <h5>Payout remarks</h5>
                          <h6>.</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="400">
                          <h5>Selected Payment Collector</h5>
                          <h6>.</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="500">
                          <h5>Purpose of Transfer</h5>
                          <h6>.</h6>
                        </div>
                        <div className="payemt-title" data-aos="fade-up" data-aos-delay="500">
                          <h5>Settlement Amount</h5>
                          <h6>51.02 ( NGN1/NGN 0.98)</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-sender" role="tabpanel" aria-labelledby="nav-sender-tab">

              <div className="container" data-aos="fade-down" data-aos-delay="400">
                <div className="row">
                  <div className="card-title mt-4">
                    <h2 className="ml-2">Sender Details</h2>
                    <div className="card-img">
                      <img src="assets/images/image.jpg"/>
                    </div>
                  </div>
                  <div className="col-lg-6">

                    <div className="payemt-title">
                      <h5>Sender Code</h5>
                      <h6>1SVLCE</h6>
                    </div>


                    <div className="payemt-title">
                      <h5>Address line 1</h5>
                      <h6>test address</h6>
                    </div>

                    <div className="payemt-title">
                      <h5>Sender Phone</h5>
                      <h6>2347828418144</h6>
                    </div>

                    <div className="payemt-title">
                      <h5>Sender Area code</h5>
                      <h6>string</h6>
                    </div>

                  </div>
                  <div className="col-lg-6">
                    <div className="payemt-title">
                      <h5>Sender Name</h5>
                      <h6>sumit null ( INDIVIDUAL )</h6>
                    </div>
                    <div className="payemt-title">
                      <h5>Address line 2</h5>
                      <h6>.</h6>
                    </div>
                    <div className="payemt-title">
                      <h5>Sender Email address</h5>
                      <h6>appdeveloper2709@gmail.com</h6>
                    </div>
                  </div>
                </div>
       


              </div>
            </div>
            <div className="tab-pane fade" id="nav-benificary" role="tabpanel" aria-labelledby="nav-benificary-tab">
              <div className="container" data-aos="fade-down" data-aos-delay="400">
                <div className="row">
                  <div className="card-title mt-4">
                    <h2 className="ml-2">Beneficiary Details</h2>
                    <div className="card-img">
                      <img src="assets/images/image.jpg"/>
                    </div>
                  </div>
                  <div className="col-lg-6">

                    <div className="payemt-title">
                      <h5>Beneficiary Code</h5>
                      <h6>1SVLCE</h6>

                    </div>

                    <div className="payemt-title">
                      <h5>Address line 1</h5>
                      <h6>test address</h6>
                    </div>


                    <div className="payemt-title">
                      <h5>Beneficiary Phone</h5>
                      <h6>2347828418144</h6>
                    </div>



                    <div className="payemt-title">
                      <h5>Bank Transfer Details</h5>
                      <h6>Account Holder Name: sumit null</h6>
                      <h6>Bank Name: Access Bank Plc</h6>
                      <h6>Account Number: 34343434343434</h6>
                      <h6>SWIFT: string</h6>
                      <h6>OP: string</h6>
                    </div>



                  </div>
                  <div className="col-lg-6">
                    <div className="payemt-title">
                      <h5>Beneficiary Name</h5>
                      <h6>sumit null ( INDIVIDUAL )</h6>
                    </div>
                    <div className="payemt-title">
                      <h5>Address line 2</h5>
                      <h6>.</h6>
                    </div>
                    <div className="payemt-title">
                      <h5>Beneficiary Email Address</h5>
                      <h6>appdeveloper2709@gmail.com</h6>
                    </div>


                  </div>



                </div>
            

              </div>
            </div>
            <div className="tab-pane fade" id="nav-agent" role="tabpanel" aria-labelledby="nav-agent-tab">
              <div className="container" data-aos="fade-down" data-aos-delay="400">
                <div className="row">
                  <div className="card-title mt-4">
                    <h2 className="ml-2">Organization/Branch</h2>
                  </div>
                  <div className="col-lg-6">
                    <div className="payemt-title">
                      <h5>Organization / Branch</h5>
                      <h6>Chromepay</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-receving" role="tabpanel" aria-labelledby="nav-receving-tab">
              <div className="container" data-aos="fade-down" data-aos-delay="400">
                <div className="row">
                  <div className="card-title mt-4">
                    <h2 className="ml-2">Receiving Pay Center</h2>
                  </div>
                  <div className="col-lg-6">
                    <div className="payemt-title">
                      <h5>Agent/Branch</h5>
                      <h6>Rave Payout</h6>
                    </div>
                    <div className="payemt-title">
                      <h5>Secret Answer</h5>
                      <h6>**************</h6>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="payemt-title">
                      <h5>Purpose of Transfer</h5>
                      <h6>.</h6>
                    </div>
                    <div className="payemt-title">
                      <h5>Secret Code/Question</h5>
                      <h6>.</h6>
                    </div>
                  </div>
                </div>
          
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

export default Search_transactions_detail;