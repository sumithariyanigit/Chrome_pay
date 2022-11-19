import React from 'react';
import { Link } from 'react-router-dom';

function Customer_settings() {
    return (
        <div>
<section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Customer Settings</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span> Customer Settings</span>
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
            <h5 className="mb-2">Customer Settings</h5>
          </div>
        </div>
     <div className="table_searching_only">
       <table id="exportexample" className="border-none w-100">
            <thead>
             <tr>
               <th></th>
              </tr>
         </thead>
                  <tbody>
                    <tr>
      <td>
     
        <div className="col-lg-12 mb-3 p-0">
          <div className="email-settings">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item" data-aos="fade-right" data-aos-delay="300">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <span> A customer should provide information at sign-up (Know Your Customer | KYC)</span>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                   <form>
                    <div className="row">
                  <h6>CREATE SENDER</h6>
                  <hr/>
                  <div className="col-lg-6 mb-3">
                  <div className="card-customer">
                   <div className="label-text">Email</div>
                   <div className="checkbox-width no-drop-checkbox">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>
                      <div className="card-customer">
                   <div className="label-text">First name</div>
                   <div className="checkbox-width no-drop-checkbox">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="revs" name="" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r3">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" name="" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div> 
                   <div className="card-customer">
                   <div className="label-text">Last name</div>
                   <div className="checkbox-width no-drop-checkbox">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc"  checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>
                  <div className="card-customer">
                   <div className="label-text">DoB</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div> 
                    <div className="card-customer">
                             <div className="label-text">Address Finder </div>
                             <div className="checkbox-width">
                              <div className="toggle-switch-on">
                                <label>
                                   <h6>Visible</h6>
                                    <input type="checkbox" className="revx" checked=""/>
                                       <span className="toggle-switch-on-slider"></span>
                                      
                                 </label>
                                 </div>
                                <div className="r2 hides">
                                 <label className="toggle-switch-on">
                                    <input type="checkbox" className="rev_inc"/>
                                    <span className="toggle-switch-on-slider"></span>
                                       <h6>Visible</h6></label>
                                  </div>
                             </div>                                
                            </div>
                            <div className="card-customer">
                   <div className="label-text">Address 1</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>  
                    <div className="card-customer">
                   <div className="label-text">Address 2</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>
                  
                    <div className="card-customer">
                   <div className="label-text">City</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>
                  </div>
                  <div className="col-lg-6">
                   <div className="card-customer">
                   <div className="label-text">State</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div> 
                  <div className="card-customer">
                   <div className="label-text">Country</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>    
                  <div className="card-customer">
                   <div className="label-text">Postcode</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>
                   <div className="card-customer">
                   <div className="label-text">Phone</div>
                   <div className="checkbox-width no-drop-checkbox">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>  
                   <div className="card-customer">
                   <div className="label-text">Employer</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>
                      
                  <div className="card-customer">
                   <div className="label-text">Annual Salary</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>  
                   <div className="card-customer">
                   <div className="label-text">Sender ID Document details</div>
                   <div className="checkbox-width">
                    <div className="toggle-switch-on">
                      <label>
                         <h6>Mandatory</h6>
                          <input type="checkbox" className="rev" checked=""/>
                             <span className="toggle-switch-on-slider"></span>
                            
                       </label>
                       </div>
                      <div className="r2 no-drop-checkbox">
                       <label className="toggle-switch-on">
                          <input type="checkbox" className="rev_inc" checked=""/>
                          <span className="toggle-switch-on-slider"></span>
                             <h6>Visible</h6></label>
                        </div>
                   </div>                                
                  </div>
                   
                </div>
                 
                     </div>
                      </form> 
                  </div>
                </div>
              </div>
              <div className="accordion-item" data-aos="fade-right" data-aos-delay="200">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                   A customer should provide information while performing a transaction (Know Your Customer | KYC)
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                 <form>
                   <div className="row">
                     <h6>CREATE TRANSACTION</h6>
                     <hr/>
                      <div className="col-lg-12 mb-3">
                      <div className="card-detail aos-init">
                            <div className="switch-toggle">
                              <label>
                                <h6> Send OTP via sms to customers and staff (Valid mobile phone number required)</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>  
                      </div>
                       <div className="col-lg-12 mb-3">
                      <div className="card-detail aos-init">
                            <div className="switch-toggle">
                              <label>
                                <h6> Send OTP via email to staff only</h6>
                                <div className="switch">
                                  <input type="checkbox"/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>  
                      </div>
                       <div className="col-lg-12 mb-3">
                      <div className="card-detail aos-init">
                            <div className="switch-toggle">
                              <label>
                                <h6> Send OTP via email to customer only</h6>
                                <div className="switch">
                                  <input type="checkbox"/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>  
                      </div>
                      <div className="col-lg-12">
                        <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Update</button>
                        <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
                      </div>
                   </div>
                 </form>
                  </div>
                </div>
              </div>
   
            </div>
          </div>
        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

      </div>

      </div>
    </div>
  </section>
</main>
          
            
        </div>
    );
}

export default Customer_settings;