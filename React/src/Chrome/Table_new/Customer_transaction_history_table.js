import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


function Customer_transaction_history_table() {
     return (
  
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="Customer Transaction History"
                   columns={[
                   { title: 'Created Date', field: 'created_date' },
                   { title: 'Organization Name', field: 'organization_name' },
                   { title: 'Order No	', field: 'order_no'},
                   { title: 'PCN	', field: 'PCN'},
                   { title: 'Receiver	', field: 'receiver'},
                   { title: 'Receiving Country	', field: 'receiving_country'},
                   { title: 'Sending Amount	', field: 'sending_amount	'},
                   { title: 'Receiving Amount	', field: 'receiving_amount'},
                   { title: 'Relationship	', field: 'relationship'},
                   { title: 'Status	', field: 'status'},
                ]}
                    data={[
                        {
                            created_date: '12/08/2021		', organization_name: 'Chromepay',  order_no: 'AS123SD', PCN:'',
                            receiver: 'Nigeria', receiving_country: 'Nigeria', sending_amount: '3400', receiving_amount: '3400',
                             relationship: '', status: 'success', 
                        },
                        {
                            created_date: '12/08/2021		', organization_name: 'Chromepay',  order_no: 'AS123SD', PCN:'',
                            receiver: 'Nigeria', receiving_country: 'Nigeria', sending_amount: '3400', receiving_amount: '3400',
                             relationship: '', status: 'success', 
                        },
                        
                        {
                            created_date: '12/08/2021		', organization_name: 'Chromepay',  order_no: 'AS123SD', PCN:'',
                            receiver: 'Nigeria', receiving_country: 'Nigeria', sending_amount: '3400', receiving_amount: '3400',
                             relationship: '', status: 'success', 
                        },
                        {
                            created_date: '12/08/2021		', organization_name: 'Chromepay',  order_no: 'AS123SD', PCN:'',
                            receiver: 'Nigeria', receiving_country: 'Nigeria', sending_amount: '3400', receiving_amount: '3400',
                             relationship: '', status: 'success', 
                        },
                        {
                            created_date: '12/08/2021		', organization_name: 'Chromepay',  order_no: 'AS123SD', PCN:'',
                            receiver: 'Nigeria', receiving_country: 'Nigeria', sending_amount: '3400', receiving_amount: '3400',
                             relationship: '', status: 'success', 
                        },
                       
                        ]}
                      
                      />
                     </div>
                 </div>
               </div>
           </section>
            </div>

    );
}
export default Customer_transaction_history_table;


