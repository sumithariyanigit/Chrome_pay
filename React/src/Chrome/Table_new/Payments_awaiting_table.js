import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


function Payments_awaiting_table() {
     return (
  
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="Payments awaiting processing List"
                   columns={[
                    { title: 'Date', field: 'Date' },
                   { title: 'Payment Status', field: 'Payment_Status' },
                   { title: 'PCN', field: 'PCN', },
                   { title: 'Payment Method	', field: 'Payment_Method	', },
                   { title: 'Delivery Method', field: 'Delivery_Method', },
                   { title: 'API Provider	', field: 'API_Provider', },
                   { title: 'Payment Reference	', field: 'Payment_Reference', },
                   { title: 'Gateway Response', field: 'Gateway_Response', },

                   ]}
                    data={[
                        {
                        Date: '', Payment_Status: '',  PCN: '',  Payment_Method: '',   Delivery_Method: '', 
                         API_Provider: '',    Payment_Reference: '',  Gateway_Response: '', 
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
export default Payments_awaiting_table;


