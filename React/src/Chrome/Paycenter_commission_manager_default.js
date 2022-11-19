import React from 'react';
import { Link } from 'react-router-dom';

function Paycenter_commission_manager_default() {
    return (
        <div>
            <section className="bg_bulk d-flex align-items-center">
  <div className="container">
    <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div className="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up"><span><b>Default Transaction Fee Sharing</b></span></h1>
        <p data-aos="fade-up"></p>
      </div>
    </div>
    <div className="row">
      <div className="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="/">Dashboard</Link> - <span>Default Transaction Fee Sharing</span>
      </div>
    </div>
  </div>
</section>

<main id="main">

  <section className="bulk_sms pb-0 setting_manger">
    <div className="container">
      <div className="row justify-content-center filter-box" data-aos="fade-down" data-aos-delay="400" className="profile-text">
        <div className="col-lg-12 mb-3">
          <div className="table-title">
            <h5 className="mb-4">View and allocate default fee share.</h5>
          </div>
          <form action="" method="">
            <div className="row">

              <div className="col-lg-6 mb-4">
                <label for="">Pay-in Agent(%)</label>
                <input type="text" className="form-control ht-47" name="" placeholder="" value="0"/>
              </div>

               <div className="col-lg-6 mb-4">
                <label for="">Pay-Out Agent(%)</label>
                <input type="text" className="form-control ht-47" name="" placeholder="" value="0"/>
              </div>  

               <div className="col-lg-6 mb-4">
                <label for="">Your Share(%)</label>
                <input type="text" className="form-control ht-47" name="" placeholder="" value="100"/>
              </div>

            <div className="col-lg-6 mt-36">
                <button type="sumit" className="btn btn-primary btn_veri1  mb-3">Save fee allocation</button>
                <button type="reset" className="btn btn-secondary btn-reset  mb-3">Reset</button>
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

export default Paycenter_commission_manager_default;