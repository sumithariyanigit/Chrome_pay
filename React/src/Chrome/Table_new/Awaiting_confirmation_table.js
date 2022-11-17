import React from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function Awaiting_confirmation_table() {
        return (   
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center ">
                   <div className="col-lg-12 d-flex flex-column justify-content-center">
                   <MaterialTable
                   title="Awaiting Confirmation List"
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
                        { title: 'Action', field: 'Action' },

                      ]}
                        data={[
                        {
                          Date: '12/02/2021	', 
                           order_no: 'SF123DSA	', 
                           Delivery: 'Chromepay', 
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
                          // {
                          //   icon: 'edit',
                          //   tooltip: 'View Detail',
                          //   onClick: (event, rowData) => {window.location.href="/Awaiting_verification"}
                          // },
                          // {
                          //   icon: 'remove_circle_outline',
                          //   tooltip: 'Suspend',
                          //   onClick: (event, rowData) => alert("You saved " + rowData.code)
                          // },
                          // {
                          //   icon: 'visibility_off',
                          //   tooltip: 'Disable OTP',
                          //   onClick: (event, rowData) => alert("You saved " + rowData.code)
                          // },
                          // {
                          //   icon: 'restart_alt',
                          //   tooltip: 'Password Reset',
                          //   onClick: (event, rowData) => alert("You saved " + rowData.code)
                          // },
                          // {
                          //   icon: 'delete_outline',
                          //   tooltip: 'Delete',
                          //   onClick: (event, rowData) => alert("You saved " + rowData.code)
                          // },
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
export default Awaiting_confirmation_table;


