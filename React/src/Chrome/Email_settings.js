import React from 'react';
import { Link } from 'react-router-dom';

function Email_settings() {
    return (
        <div>
           <section className="organization d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Email Settings</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Email Settings</span>
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
            <h5 className="mb-2">Email Settings</h5>
          </div>
        </div>
        <div className="col-lg-12 mb-3">
          <div className="email-settings">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <span>E-Mail Notifications &nbsp;</span>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <form>
                      <div className="row">
                        <div className="col-lg-4 mb-3">
                          <div className="table-title">
                            <h5 className="mb-3">Manager</h5>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Transaction Initiation</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Payment for the Transaction</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Transaction Approval</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Pay Out</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Global Exchange Rate</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Transaction Cancellation</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Change Password</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Enable email notification on customer sign upd</h6>
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
                            <h5 className="mb-3">Agents / Branch Admins / Cashier</h5>
                          </div>
                          <div className="card-detail" data-aos="fade-top" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Transaction Initiation</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-top" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Payment for the Transaction</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-top" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Transaction Approval</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-top" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Pay Out</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-top" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Transaction Cancellation</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-top" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Change Password</h6>
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
                            <h5 className="mb-3">Customer</h5>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Transaction Initiation</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Payment for the Transaction</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Transaction Approval</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Pay Out</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6>Transaction Cancellation</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Change Password</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Enable email notification on account funding</h6>
                                <div className="switch">
                                  <input type="checkbox" checked=""/>
                                  <span className="slider round"></span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="card-detail" data-aos="fade-down" data-aos-delay="100">
                            <div className="switch-toggle">
                              <label>
                                <h6> Enable email notification on account debiting</h6>
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
              <div className="accordion-item" data-aos="fade-right" data-aos-delay="300">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    Additional email groups &nbsp;
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card-editor">
                            <label className="mb-0">Submit Transaction</label><br/>
                            <small className="mb-2 d-block">Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk</small>
                            <textarea id="editor" placeholder="Use comma separated text.
                            e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk"></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="card-editor">
                            <label className="mb-0">Payment for the Transaction</label><br/>
                            <small className="mb-2 d-block">Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk</small>
                            <textarea id="editor1" placeholder="Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk"></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="card-editor">
                            <label className="mb-0">Transaction Approval</label><br/>
                            <small className="mb-2 d-block">Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk</small>
                            <textarea id="editor2" placeholder="Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk"></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="card-editor">
                            <label className="mb-0">Pay Out</label><br/>
                            <small className="mb-2 d-block">Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk</small>
                            <textarea id="editor3" placeholder="Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk"></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="card-editor">
                            <label className="mb-0">Global Exchange Rate</label><br/>
                            <small className="mb-2 d-block">Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk</small>
                            <textarea id="editor4" placeholder="Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk"></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="card-editor">
                            <label className="mb-0">Transaction Cancellation</label><br/>
                            <small className="mb-2 d-block">Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk</small>
                            <textarea id="editor5" placeholder="Use comma separated text. e.g. support@moneytransferapplication.co.uk, info@moneytransferapplication.co.uk"></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12 mt-1">
                          <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Update</button>
                          <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Configure E-Mail Server &nbsp;
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className="card-email-server">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <h6> MTA Platform includes an e-mail delivery extension so that you can send e-mail notifications from MTA. Depending on how you define the e-mail notification, a delivery might consist of a notification, link and attachment. The e-mail delivery extension works with your existing mail server technology. The mail server must be an Outgoing mail server (SMTP) . Ensure your Outgoing mail server (SMTP) supports connection via Java API. Contact your IT team for the parameters below.</h6>
                            <hr/>
                          </div>
                          <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="100">
                            <label>Service Provider</label>
                            <select className="selectpicker form-control" data-container="body" data-live-search="true" title="Service Provider" data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false" required="">
                              <option value="">SMTP</option>
                              <option value="">MANDRILL</option>
                            </select>
                          </div>
                          <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="200">
                            <label>User name: (e.g. example@gmail.com)</label>
                            <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="email" value="hi@chromepay.io"/>
                          </div>
                          <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="300">
                            <label>E-mail Server Password</label>
                            <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="password" value=""/>
                          </div>
                          <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="300">
                            <label>Outgoing mail server (SMTP) name</label>
                            <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="email" value="smtp.gmail.com"/>
                          </div>
                          <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="300">
                            <label>Outgoing mail server (SMTP) Port Number</label>
                            <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="text" value="0"/>
                          </div>
                          <div className="col-lg-6  mb-3" data-aos="fade-down" data-aos-delay="300">
                            <label>Test Email Address: (e.g. example@gmail.com)</label>
                            <input aria-describedby="basic-addon1" aria-label="" className="form-control ht-46" placeholder="" type="email" value=""/>
                          </div>
                          <div className="col-lg-12 mt-1">
                            <button type="button" className="btn btn-primary btn_veri1 mr-3 mb-3">Test</button>
                            <button type="submit" className="btn btn-primary btn_veri1  mb-3">Update</button>
                          </div>
                        </div>
                      </form>
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

export default Email_settings;