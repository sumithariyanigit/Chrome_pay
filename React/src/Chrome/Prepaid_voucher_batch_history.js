import React from 'react';
import { Link } from 'react-router-dom';

function Prepaid_voucher_batch_history() {
    return (
        <div>
        <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Generate prepaid vouchers</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Generate prepaid vouchers</span>
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
            <h5 className="mb-3">Generate prepaid vouchers</h5>
           </div>
          <form action="" method="">
            <div className="row">

                  <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="500">
                  <label>Name<span className="requrd">*</span></label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" 
                 placeholder="" type="text"/>
                 </div>
                   <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="400">
                 <label>Debit Currency<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                <option value="IDR">IDR</option>
                <option value="IDR">IDR</option>
                <option value="ILS">ILS</option>
                <option value="INR">INR</option>
                <option value="NGN">NGN</option>
                <option value="NOK">NOK</option>
                <option value="NPR">NPR</option>
                <option value="PHP">PHP</option>
                <option value="USD">USD</option>
                </select>
              </div>
                <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="400">
                  <label>Quantity<span className="requrd">*</span></label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" 
                 placeholder="" type="text" value="0"/>
                 </div>

                 <div className="col-lg-6 mb-4">
                <div className="row">
                  <div className="col-lg-6 mm-3">
                    <label for="">Start Date<span className="requrd">*</span></label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>

                  <div className="col-lg-6 ">
                    <label for="">End date<span className="requrd">*</span></label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>

               <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="400">
                  <label>Voucher Value<span className="requrd">*</span></label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" 
                 placeholder="" type="text" value="0.0"/>
                 </div>  

                 <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="400">
                  <label>Pin length<span className="requrd">*</span></label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" 
                 placeholder="" type="text" value="16" required="required"/>
                 </div>
                 <div className="col-lg-6">
                <button type="sumit" className="btn btn-primary btn_veri1 mb-3 " data-aos="fade-down" data-aos-delay="300">Generate Vouchers</button>
                <button type="reset" className="btn btn-secondary btn-reset mb-3 " data-aos="fade-down" data-aos-delay="400">Reset</button>
             
              </div>  
              <div className="col-lg-12" data-aos="fade-left" data-aos-delay="400">
                <button type="button" className="btn showAdvance btn-shows">Advanced Search</button>
              </div>
               </div>
           </form>
         </div>
       </div>


       <div className="row filter-box add_elements justify-content-center" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-3">Search Prepaid Voucher</h5>
           </div>
          <form action="" method="">
          <div className="row">

                  <div className="col-lg-6 mb-4" data-aos="fade-down" data-aos-delay="400">
                  <label>Name</label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" 
                 placeholder="" type="text"/>
                 </div>
                   <div className="col-lg-6  mb-4" data-aos="fade-down" data-aos-delay="400">
                 <label>Voucher Currency<span className="requrd">*</span></label>
                <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                <option value="IDR">IDR</option>
                <option value="IDR">IDR</option>
                <option value="ILS">ILS</option>
                <option value="INR">INR</option>
                <option value="NGN">NGN</option>
                <option value="NOK">NOK</option>
                <option value="NPR">NPR</option>
                <option value="PHP">PHP</option>
                <option value="USD">USD</option>
                </select>
              </div>
                
              <div className="col-lg-6 mb-3">
              <div className="row">
                <div className="col-lg-6 mb-3" data-aos="fade-down" data-aos-delay="200">
                  <label>Quantity</label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" 
                 placeholder="" type="text" value="0"/>
                 </div>
               <div className="col-lg-6 mb-3" data-aos="fade-down" data-aos-delay="400">
                  <label>Voucher Value</label>
                 <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" 
                 placeholder="" type="text" value="0.0"/>
                 </div>

                 </div>
          </div> 
                 <div className="col-lg-6 mb-3">
                <div className="row">
                  <div className="col-lg-6 mm-3">
                    <label for="">Start Date</label>
                    <i className="fa fa-calendar-o right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>

                  <div className="col-lg-6 mm-3">
                    <label for="">End date</label>
                    <i className="fa fa-calendar-o  right-mobile" aria-hidden="true"></i>
                    <input type="date" className="form-control ht-47" name="" placeholder="MM/DD/YY"/>
                  </div>
                </div>
              </div>


             <div className="col-lg-6">
                <button type="sumit" className="btn btn-primary btn_veri1 mb-3 " data-aos="fade-down" data-aos-delay="300">Search</button>
                <button type="reset" className="btn btn-secondary btn-reset mb-3 " data-aos="fade-down" data-aos-delay="400">Reset</button>
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
                 <th>Creation Date </th> 
                  <th>Batch Name </th>  
                  <th>Redeemed Count  </th>
                  <th>Start Date </th>  
                  <th>Expiry Date </th> 
                  <th>Batch Quantity </th>  
                  <th>Debit Currency </th>  
                  <th>Voucher Value </th> 
                  <th>Total Value </th> 
                  <th>Status </th>  
                  <th>Distributor </th> 
                  <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>03/08/2021</td>
                      <td></td>
                      <td>12</td>
                      <td>13/08/2021</td>
                      <td>09/09/2021</td>
                        <td>10.00</td>
                      <td>NGN 10.00</td>
                    
                      <td>10.00</td>
                       <td>20.00</td>
                       <td><span className="agreen">Activated</span></td>
                      
                      <td></td>
                     
                      </tr> <tr>
                      <td>03/08/2021</td>
                      <td></td>
                      <td>12</td>
                      <td>13/08/2021</td>
                      <td>09/09/2021</td>
                        <td>10.00</td>
                      <td>NGN 10.00</td>
                    
                      <td>10.00</td>
                       <td>20.00</td>
                       <td><span className="agreen">Activated</span></td>
                      
                      <td></td>
                     
                      </tr> <tr>
                      <td>03/08/2021</td>
                      <td></td>
                      <td>12</td>
                      <td>13/08/2021</td>
                      <td>09/09/2021</td>
                        <td>10.00</td>
                      <td>NGN 10.00</td>
                    
                      <td>10.00</td>
                       <td>20.00</td>
                       <td><span className="agreen">Activated</span></td>
                      
                      <td></td>
                     
                      </tr> <tr>
                      <td>03/08/2021</td>
                      <td></td>
                      <td>12</td>
                      <td>13/08/2021</td>
                      <td>09/09/2021</td>
                        <td>10.00</td>
                      <td>NGN 10.00</td>
                    
                      <td>10.00</td>
                       <td>20.00</td>
                       <td><span className="agreen">Activated</span></td>
                      
                      <td></td>
                     
                      </tr> <tr>
                      <td>03/08/2021</td>
                      <td></td>
                      <td>12</td>
                      <td>13/08/2021</td>
                      <td>09/09/2021</td>
                        <td>10.00</td>
                      <td>NGN 10.00</td>
                    
                      <td>10.00</td>
                       <td>20.00</td>
                       <td><span className="agreen">Activated</span></td>
                      
                      <td></td>
                     
                      </tr> <tr>
                      <td>03/08/2021</td>
                      <td></td>
                      <td>12</td>
                      <td>13/08/2021</td>
                      <td>09/09/2021</td>
                        <td>10.00</td>
                      <td>NGN 10.00</td>
                    
                      <td>10.00</td>
                       <td>20.00</td>
                       <td><span className="agreen">Activated</span></td>
                      
                      
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

export default Prepaid_voucher_batch_history;