import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


function Customer_blacklist_whitlist_table() {
    return (
   
  <>
   <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="HISTORY OF BLACKLIST/WHITELIST REQUESTS"
                   columns={[
                   { title: 'Sr.no', field: 'srno' },
                   { title: 'Date', field: 'Date' },
                   { title: 'Status	', field: 'Status'},
                 
                ]}
                    data={[
                        {
                            srno: '1',  Date: '12-10-2021', 
                            Status: 'Blacklist', 
                            
                        },
                       
                        ]}
                      
                      />
                     </div>
                 </div>
               </div>
           </section>
  </>

    );
}
export default Customer_blacklist_whitlist_table;