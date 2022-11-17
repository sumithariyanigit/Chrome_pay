import React from 'react';
import { Link } from 'react-router-dom';

function Security_settings(props) {
    return (
        <div>
           <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Security - IP whitelisting</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span> Security - IP whitelisting</span>
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
            <h5 className="mb-2">Security</h5>
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
                    <span> IP whitelisting</span>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                   <form>
                    <div className="row">
                  <h6>IP whitelisting allows you to create lists of trusted IP addresses or IP ranges from which your STAFF can access your domains. IP whitelist is a security feature often used for limiting and controlling access only to trusted STAFF.</h6>
                  <hr/>
                  <div className="col-lg-6 mb-3" data-aos="fade-down" data-aos-delay="300">
                            <label>Restrict staff access to the IP addresses [ Add more than 1 IP address with coma separation. eg: 178.62.71.55, 198.42.81.55]. This will not effect customers.</label>
                            <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value=""/>
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
              <div className="accordion-item" data-aos="fade-right" data-aos-delay="200">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Enable 2-factor
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                 <form>
                   <div className="row">
                     <h6>Enable 2-factor</h6>
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
              <div className="accordion-item" data-aos="fade-right" data-aos-delay="200">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                   New user account check(s)
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  <form>
                   <div className="row">
                      <div className="col-lg-12 mb-3">
                      <div className="card-detail aos-init">
                            <div className="switch-toggle">
                              <label>
                                <h6> Disable duplicate phone number check</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
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
              <div className="accordion-item" data-aos="fade-right" data-aos-delay="300">
                <h2 className="accordion-header" id="headingFour">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                 Cashier Login details
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  <form>
                   <div className="row">
                    <div className="col-lg-6 mb-3">
                       <label>Email:</label>
                        <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="email"/>
                     </div>
                      <div className="col-lg-6 mb-3">
                       <label>Password:</label>
                        <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="password"/>
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
              <div className="accordion-item" data-aos="fade-right" data-aos-delay="200">
                <h2 className="accordion-header" id="headingFive">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                 E-Mail Notifications
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
               <form>
                      <div className="row">
                        <div className="col-lg-4 mb-3">
                          <div className="table-title">
                            <h5 className="mb-3">Manager</h5>
                          </div>
                          <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>Notify me when i log in</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>Notify me if i log in from another location</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6> Notify me if i log in with another device</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6> Notify me if cashier logs in from another location</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div> 
                            <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6> Notify me if customer logs in with another device</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>   <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>Notify me if customer logs in with another device</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>   <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>Notify me if customer logs in with another device</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 mb-3">
                          <div className="table-title">
                            <h5 className="mb-3">Cashier</h5>
                          </div>
                           <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>Notify me when i log in</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>Notify me if i log in from another location</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6> Notify me if i log in with another device</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="table-title">
                            <h5 className="mb-3">Customer</h5>
                          </div>
                            <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>  Notify me if i log in from another location</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                           <div className="card-detail">
                            <div className="switch-toggle">
                              <label>
                                <h6>Notify me if i log in with another device</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Update</button>
                        <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
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

export default Security_settings;