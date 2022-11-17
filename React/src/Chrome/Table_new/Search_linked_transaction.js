import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function Search_linked_transaction() {

        return (

          
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                        title="ADD NEW LINKED TRANSACTION [MATCH BY COUNTRY, DOB, FULL NAME ])"
                        columns={[
                            { title: 'Execution Date', field: 'execution_date' },
                            { title: 'PCN	', field: 'PCN' },
                            { title: 'Total Amount Sent	', field: 'amount_sent' },
                            { title: 'Sender', field: 'sender' },
                            { title: 'Beneficiary Name', field: 'beneficiary_name' },
                            { title: 'Beneficiary Code ', field: 'beneficiary_code' },
                            
                        ]}
                            // data={[
                            //     {
                            //     execution_date: '', PCN: 'SANC301', amount_sent: '', 
                            //     sender:'', result: '', displayedP_message: '',
                            //     }, 
                               
                            // ]}
                        />
                     </div>
                 </div>
               </div>
           </section>
            </div>

    );
}
export default Search_linked_transaction;


