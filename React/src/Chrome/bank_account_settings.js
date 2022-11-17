import React from 'react';
import { Link } from 'react-router-dom';

function bank_account_settings() {
    return (
        <div>
<section className="bg_bulk  d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Bank Account Fields</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Bank Account Fields</span>
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
            <h5 className="mb-2">Bank Account Fields</h5>
          </div>
        </div>
        <div className="col-lg-12 mb-3">
          <div className="email-settings">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <span>Bank Account Fields</span>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <h5>You can set mandatory fields for each country here.</h5>
                    <form>
                      <div className="row">
                        <div className="col-lg-6 mb-3">
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
                        <div className="col-lg-6 mb-3">
                          <label className="hides">.</label>
                          <select className="selectpicker form-control" id="myselection" data-container="body" data-live-search="true" title="Please select..." data-hide-disabled="true" data-actions-box="true" data-virtual-scroll="false">
                            <option value="method">Airtime Topup</option>
                            <option value="method">Bank Transfer</option>
                            <option value="method">Debit Card</option>
                            <option value="method">Credit Card</option>
                            <option value="method">Cash Pickup</option>
                            <option value="method">Bureau de Change</option>
                            <option value="method">Cryptocurrency</option>
                            <option value="method">BILL PAYMENT</option>
                            <option value="method">WALLET</option>
                            <option value="method">MERCHANT PRODUCT</option>
                            <option value="method">Mobile Money</option>
                            <option value="method">Merchant Payment</option>
                            <option value="method">Payment Method</option>
                            <option value="method">Wholesale Mobile Top-up</option>
                            <option value="method">Wholesale Bill Payment</option>
                          </select>
                        </div>
                        <div className="col-lg-12 mt-3 showmethod myDiv">
                          <div className="row">
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle">
                                  <label>
                                    <h6>Account type required : </h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle">
                                  <label>
                                    <h6>Recipient type required : </h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle">
                                  <label>
                                    <h6>Bank code required :</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 mb-2">
                              <div className="card-detail inpu_fileds">
                                <label>Bank code length </label>
                                <input type="text" value="0" className="form-control"/>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle">
                                  <label>
                                    <h6>Bank name required :</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Transit number required : </h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail inpu_fileds">
                                <label>Transit number length:</label>
                                <input type="text" value="0" className="form-control"/>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Account number required: </h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail inpu_fileds">
                                <label>Account number max length</label>
                                <input type="text" value="16" className="form-control"/>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Sort code required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail inpu_fileds">
                                <label>Sort code length</label>
                                <input type="text" value="0" className="form-control"/>
                              </div>
                            </div>

                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>IBAN required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Swift code required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Branch code required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Branch name required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Branch district required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Routing number required: </h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>IFSC required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>CPF required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>CNPJ required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>OP required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>RUT number required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Country required</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>City required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Address line required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Postcode / Area Code required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>State required: </h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Document number required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 mb-2">
                              <div className="card-detail">
                                <div className="switch-toggle ">
                                  <label>
                                    <h6>Phone number required:</h6>
                                    <div className="switch">
                                      <input type="checkbox"/>
                                      <span className="slider round"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                        <div className="col-lg-12 mt-1">
                          <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Update</button>
                          <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
                        </div>

                          </div>
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
  </section>
</main>
        </div>
    );
}

export default bank_account_settings;