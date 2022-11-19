import React from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';
import GaugeChart from 'react-gauge-chart';
import { useState, useEffect } from "react";
import axios from 'axios';

function CardScore() {
    const [data, setData]= useState([]);


    const userlist =async() =>{
        await axios.post(`/Calculate_credit_Score`)
        .then(resp=>{
            let data = resp.data;
            setData(data);
            console.log('@@@@@',data)
        })

    }
    
    useEffect(() => {
        userlist();
    
      
    }, [])
    




  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="container-xxl" id="kt_content_container">
                <div className="row g-5 g-xl-8">
                    <div className="col-lg-12">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                                {/* <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Add Customer</h3>
                                </div> */}
                            </div>
                            <div id="kt_account_settings_profile_details" className="collapse show">
                            <GaugeChart id="gauge-chart5"
                                nrOfLevels={420}
                                arcsLength={[0.2, 0.6, 0.2]}
                                colors={['#EA4228','#F5CD19','#5BE12C'  ]}
                                textColor={['#000000']}
                                percent={0.37}
                                arcPadding={0.01}
                                
                                />



                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default CardScore