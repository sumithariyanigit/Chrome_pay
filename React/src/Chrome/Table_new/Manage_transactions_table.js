import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function Manage_transactions_table() {

    const history = useHistory();
    const DtlFua = (order_no)=>{
      localStorage.setItem('order_no',order_no ); 
      history.push("/search_transactions_detail");
      return false;   
    } 


        return (   
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center ">
                   <div className="col-lg-12 d-flex flex-column justify-content-center">
                   <MaterialTable
                   title="Transaction History"
                      columns={[
                        { title: 'Created Date', field: 'Date' },
                        { title: 'Order No', field: 'order_no' },
                        { title: 'Delivery Method', field: 'Delivery' },
                        { title: 'PCN', field: 'PCN' },
                        { title: 'Organization Name', field: 'Organization' },
                        { title: 'Customer', field: 'Customer' },
                        { title: 'Sending Amount', field: 'Sending' },
                        { title: 'Receiving Amount', field: 'ReceivingAmount' },
                        { title: 'Receiving Country', field: 'ReceivingCountry' },
                        { title: 'Payment Type', field: 'PaymentType' },
                        { title: 'Payment Status', field: 'PaymentStatus' },
                        { title: 'Transaction Status', field: 'Transaction' },
                        { title: 'Compliance', field: 'Compliance' },

                      ]}
                      
                        data={[
                        {
                          Date: '12/02/2021	', 
                           order_no: 'SF123DSA	', 
                           Delivery: 'Bank Transfer', 
                           PCN: 'SF123DSA', 
                           Organization: 'Chromepay', 
                           Customer:'Sumit',
                           Sending: '34.00 NGN	', 
                           ReceivingAmount: '34.00 NGN	',
                           ReceivingCountry: 'Nigeria',
                            SendingAmount: '', 
                            PaymentType:'',
                            PaymentStatus: 'Success', 
                            Transaction: 'Success', 
                            Compliance: ''
                        },
                        {
                            Date: '12/02/2021	', 
                             order_no: 'SF123DSA	', 
                             Delivery: 'Bank Transfer', 
                             PCN: 'SF123DSA', 
                             Organization: 'Chromepay', 
                             Customer:'Sumit',
                             Sending: '34.00 NGN	', 
                             ReceivingAmount: '34.00 NGN	',
                             ReceivingCountry: 'Nigeria',
                              SendingAmount: '', 
                              PaymentType:'',
                              PaymentStatus: 'Success', 
                              Transaction: 'Success', 
                              Compliance: ''
                          },
                          {
                            Date: '12/02/2021	', 
                             order_no: 'SF123DSA	', 
                             Delivery: 'Bank Transfer', 
                             PCN: 'SF123DSA', 
                             Organization: 'Chromepay', 
                             Customer:'Sumit',
                             Sending: '34.00 NGN	', 
                             ReceivingAmount: '34.00 NGN	',
                             ReceivingCountry: 'Nigeria',
                              SendingAmount: '', 
                              PaymentType:'',
                              PaymentStatus: 'Success', 
                              Transaction: 'Success', 
                              Compliance: ''
                          },
                          {
                            Date: '12/02/2021	', 
                             order_no: 'SF123DSA	', 
                             Delivery: 'Bank Transfer', 
                             PCN: 'SF123DSA', 
                             Organization: 'Chromepay', 
                             Customer:'Sumit',
                             Sending: '34.00 NGN	', 
                             ReceivingAmount: '34.00 NGN	',
                             ReceivingCountry: 'Nigeria',
                              SendingAmount: '', 
                              PaymentType:'',
                              PaymentStatus: 'Success', 
                              Transaction: 'Success', 
                              Compliance: ''
                          },
                          {
                            Date: '12/02/2021	', 
                             order_no: 'SF123DSA	', 
                             Delivery: 'Bank Transfer', 
                             PCN: 'SF123DSA', 
                             Organization: 'Chromepay', 
                             Customer:'Sumit',
                             Sending: '34.00 NGN	', 
                             ReceivingAmount: '34.00 NGN	',
                             ReceivingCountry: 'Nigeria',
                              SendingAmount: '', 
                              PaymentType:'',
                              PaymentStatus: 'Success', 
                              Transaction: 'Success', 
                              Compliance: ''
                          },


                        ]}
                        actions={[
                            {
                                icon: 'visibility',
                                tooltip: 'View Detail',
                                onClick: (event, rowData) => { //window.location.href="/Awaiting_verification"
                                  DtlFua(rowData.order_no); }     
                              },
                          
                         ]}
                        options={{
                          actionsColumnIndex: -1
                        }}
                     />
                     </div>
                 </div>
               </div>
           </section>
            </div>

    );
}
export default Manage_transactions_table;


