import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Home() {

    return (
        <div>
       <Header />  
<section id="hero" className="hero d-flex align-items-center">

<div className="container">
  <div className="section-header new5" data-aos="fade-down" data-aos-delay="400">
    <h2>Welcome To</h2>
    <h1>Chromepay
    </h1>
  </div>
  <div className="row text-center justify-center">
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="200">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="fe fe-clock home_icon"></i></div>
          <h5>Awaiting <br/> Confirmation</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="300">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="ti-settings home_icon"></i>
          </div>
          <h5>Remittance <br/> Settings</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="400">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="fe fe-file-text home_icon"></i></div>
          <h5>Automatic <br/> Routing</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="500">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="ti-map-alt home_icon"></i>
          </div>
          <h5>Manual <br/> Routi</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="6200">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="si si-equalizer home_icon"></i></div>
          <h5>Enable <br/> Services</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
 
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="700">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="ti-pie-chart home_icon"></i>
          </div>
          <h5>Payment <br/> Confirmation</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="800">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="fe fe-file-text home_icon"></i></div>
          <h5>Exchange <br/> Rate</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="900">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="ti-map-alt home_icon"></i>
          </div>
          <h5>API Call <br/> History</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>

    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="900">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="si si-user home_icon"></i>
          </div>
          <h5>Fund Agent <br/> Account</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>
    <div className="col-lg-3" data-aos="fade-up" data-aos-delay="900">
      <Link to="#" className="card_home">
        <div className="card-line">
          <div className="card-icon"><i className="si si-bubbles home_icon"></i>
          </div>
          <h5>Chat</h5>
          <button className="btn-arrow"><i className="fe fe-corner-down-right"></i></button>
        </div>
      </Link>
    </div>

  </div>

  <div className="row">
    <div className="path" data-aos="fade-up" data-aos-delay="400">
      <Link to="/">Dashboard </Link> - <span>Dashboard</span>
    </div>
  </div>
</div>

</section>
{/* <!-- End Hero --> */}

<main id="main">

{/* <!-- =======  chromepey ======= --> */}
<section className="values pd-10">
  <div className="container" data-aos="fade-down">

    <div className="row mb-5">
      <div className="col-lg-6" data-aos="fade-down" data-aos-delay="400">
        <div className="card custom-card">
          <div className="card-body">
            <div className="main-content-label mb-2">
              <label className="main-content-label tx-13 font-weight-bold mb-2">
                TOTAL TRANSACTION STATUS</label>
            </div>
            <div>
              <canvas id="myChart" style={{width:"400px"}}/>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6" data-aos="fade-down" data-aos-delay="800">
        <div className="card custom-card">
          <div className="card-body">
            <div className="main-content-label mb-2">
              <label className="main-content-label tx-13 font-weight-bold mb-2">
                AGENTS WITH MOST TRANSACTIONS</label>
            </div>
            <div>
              <canvas id="myChart1" style={{width:"400px"}}/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</section>


</main>
<Footer />  
        </div>
    );
}

export default Home;