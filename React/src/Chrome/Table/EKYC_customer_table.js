import  React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import axios from 'axios';


function EKYC_customer_table() {
  
     return (
  
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="EKYC | IDENTITY VERIFICATION ONLINE"
                   columns={[{ title: 'Customer Name', field: 'customer_name' },
                   { title: 'Type', field: 'type' },
                   { title: 'File', field: 'img', render: item => <img src="https://chromepay.io/admin_ui/assets/images/sample-pan-card-front.jpg" alt="" border="3" height="50" width="80" />},
                ]}
                    data={[
                        {
                            customer_name: 'Punit Joshi', type: 'License', 
                            img: '**render:Image,**', 
                        }
                        ]}
                      
                      />
                     </div>
                 </div>
               </div>
           </section>
            </div>

    );
}
export default EKYC_customer_table;


