
import React from "react";

export default function LandMap() {
    return (
        <>
            <div class="" id="pac-card">
                <div>

                </div>
                <div className="row mb-6" id="pac-container p-0">
                    <label className="col-lg-4 col-form-label fw-semibold fs-6">Address</label>

                    <div className="col-lg-8 fv-row">
                        <input type="text" name="address" id="searchInput" autoComplete="off" className="form-control form-control-lg form-control-solid" placeholder="Address" required />
                    </div>


                </div>
            </div>
            <div id="map" className="mb-5"></div>

            <ul class="geo-data">
                <li className="listMap col-form-label  fw-semibold"><i class="fas fa-map-marker-alt"></i> Full Address: <span id="location"></span></li>
                <li className="listMap col-form-label  fw-semibold" style={{display : "none"}}> <i class="fas fa-map-marker-alt"></i> Postal Code: <span id="postal_code"></span></li>
                <li className="listMap col-form-label  fw-semibold" style={{display : "none"}}><i class="fas fa-map-marker-alt"></i> Country: <span id="country"></span></li>
                <li className="listMap col-form-label  fw-semibold"><i class="fas fa-map-marker-alt"></i> Latitude: <span id="lat"></span></li>
                <li className="listMap col-form-label  fw-semibold"><i class="fas fa-map-marker-alt"></i> Longitude: <span id="lon"></span></li>
            </ul>
           
             
                {/* <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Full Address</label>
                    <div className="col-lg-6">
                    <span id="location" class="form-control form-control-lg  form-control-solid mb-3 mb-lg-0"></span>
                    </div>
                </div> */}
                
                {/* <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Postal Code</label>
                    <div className="col-lg-6">
                    <span id="postal_code" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                   
                </div> */}
                {/* 
                
                <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Country</label>
                    <div className="col-lg-6">
                    <span id="country" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                </div>
                
                <div className="row mb-5" >
               
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Latitude</label>
                    <div className="col-lg-6">
                    <span id="lat" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                </div>
                <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Longitude</label>
                    <div className="col-lg-6">
                    <span id="lon" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                </div> */}


        </>

    );
}
