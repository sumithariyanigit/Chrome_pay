import React from 'react';
import { Link } from 'react-router-dom';

function Customer_send_message() {
    return (
        <div>
            <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" className="aos-init aos-animate"><span><b>Send bulk SMS to customers</b></span></h1>
        <p data-aos="fade-up" className="aos-init aos-animate"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Send bulk SMS to customers</span>
      </div>
    </div>
  </div>
</section>

<main id="main">

  <section className="bulk_sms pb-0">
    <div className="container">
      <div className="row justify-content-center filter-box" data-aos="fade-down"  data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
      <div className="section-title title-bulk">
        <h1>SEND BULK SMS TO CUSTOMERS</h1>
        <p>The Maximum Length Of Text Message That You Can Send Is 918 Characters. However, If You Send More Than 160 Characters Then Your Message Will Be Broken Down Into Chunks Of 153 Characters Before Being Sent To The Recipient’s Handset. NOTE: The Mobile Network Operator Will Charge You For Every Chunk Of 153 Characters That You Send! So A Message Of 320 Characters Will Be Sent And Charged As Two Text Messages.</p>
      </div>
          <form action="">
                   <div className="row">
                     <div className="col-lg-6 mm-3">
                      <label className="fnt-14">Customer(search Phone, email, name, customer reference no, account number)</label>
                      <select className="selectpicker form-control"  title="Customer(search Phone, email, name, customer reference no, account number)" data-live-search="true" data-hide-disabled="true" required="">
                      <option value="online">John  Victor ( 2347014273913 )</option>
                      <option value="online">Victor   ( 2347014273913 )</option>
                    </select>
                      </div>
                      <div className="col-lg-6 mb-4">
                         <label className="fnt-14">Enter your password</label>
                        <input type="password" className="form-control ht-47" id="floatingPassword" placeholder="Password" required=""/>
                        </div>
                      <div className="col-lg-12 mb-3" data-aos="fade-up"  data-aos-delay="500">
                       <div className="form-floating">
                        <textarea name="content" id="editor"></textarea>
                      </div>
                      </div>
                   <div className="col-lg-12" data-aos="fade-up"  data-aos-delay="200">
                      <button type="submit" className="text-uppercase btn btn-primary my-2 btn-icon-text">
                    <i className="fe fe-send mr-1"></i> Send SMS
                  </button>
                     </div>
                   </div>
                 </form>
        </div>
      </div>
      </div>
  </section>
</main>
        </div>
    );
}

export default Customer_send_message;