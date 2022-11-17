import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function Manage_api_customers_table() {

        return (

          
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="API Customer Report"
                      columns={[
                        { title: 'Transaction Date', field: 'transaction' },
                         { title: 'PCN', field: 'PCN' },
                        { title: 'Beneficiary Name	', field: 'beneficiary' },
                        { title: 'Organization Name', field: 'organization' },
                        { title: 'Sender Name', field: 'sender' },
                        { title: 'Sending Amount	', field: 'sending_amount' },
                        { title: 'receiving_amount	', field: 'receiving_amount' },
                        { title: 'Document Type	', field: 'document_type' },
                        { title: 'Document Issue Number	', field: 'issue_number' },
                        { title: 'Download', field: 'download' },
                      ]}
                        data={[
                            {
                              transaction: '12/02/2021	', PCN: 'SF123DSA', beneficiary: 'Sumit', organization:'Chromepay',
                              sender: 'Punit	', sending_amount: '34.00 NGN		', receiving_amount: '34.00 NGN	',
                              document_type: 'Nigeria', issue_number: '45455123', download: '',
                            }, 
                            {
                                transaction: '12/02/2021	', PCN: 'SF123DSA', beneficiary: 'Sumit', organization:'Chromepay',
                                sender: 'Punit	', sending_amount: '34.00 NGN		', receiving_amount: '34.00 NGN	',
                                document_type: 'Nigeria', issue_number: '45455123', download: '',
                              }, 
                              {
                                transaction: '12/02/2021	', PCN: 'SF123DSA', beneficiary: 'Sumit', organization:'Chromepay',
                                sender: 'Punit	', sending_amount: '34.00 NGN		', receiving_amount: '34.00 NGN	',
                                document_type: 'Nigeria', issue_number: '45455123', download: '',
                              }, 
                              {
                                transaction: '12/02/2021	', PCN: 'SF123DSA', beneficiary: 'Sumit', organization:'Chromepay',
                                sender: 'Punit	', sending_amount: '34.00 NGN		', receiving_amount: '34.00 NGN	',
                                document_type: 'Nigeria', issue_number: '45455123', download: '',
                              }, 
                              {
                                transaction: '12/02/2021	', PCN: 'SF123DSA', beneficiary: 'Sumit', organization:'Chromepay',
                                sender: 'Punit	', sending_amount: '34.00 NGN		', receiving_amount: '34.00 NGN	',
                                document_type: 'Nigeria', issue_number: '45455123', download: '',
                              }, 
                               {
                              transaction: '12/02/2021	', PCN: 'SF123DSA', beneficiary: 'Sumit', organization:'Chromepay',
                              sender: 'Punit	', sending_amount: '34.00 NGN		', receiving_amount: '34.00 NGN	',
                              document_type: 'Nigeria', issue_number: '45455123', download: '',
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
export default Manage_api_customers_table;


