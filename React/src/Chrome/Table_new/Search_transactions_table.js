import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


function Search_transactions_table() {

  const history = useHistory();
  const DtlFu = (PCN)=>{
    localStorage.setItem('PCN',PCN ); 
    history.push("/search_transactions_detail");
    return false;   
  } 


        return (

          
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center">
                   <MaterialTable
                   title="Transaction Reports List"
                      columns={[
                        { title: 'Transaction date', field: 'Date' },
                         { title: 'PCN', field: 'PCN' },
                        { title: 'Pay-in Cashier', field: 'Payin' },
                        { title: 'Pay-out Cashie', field: 'Payout' },
                        { title: 'Sender Name', field: 'Sender' },
                        { title: 'Beneficiary Name', field: 'Beneficiary' },
                        { title: 'Relationship', field: 'Relationship' },
                        { title: 'Receiver Amount', field: 'Receiver' },
                        { title: 'Sending Amount', field: 'Sending' },
                        { title: 'Status', field: 'Status' },
                      ]}
                        data={[
                        {
                          Date: 'Aug 17, 2021', PCN: 'CHR55441143', Payin: 'puny satavas', Payout:'sumit',
                          Sender: 'sumit', Beneficiary: '', Relationship: '', Receiver: 'NGN 102.04', Sending: 'NGN 102.04', Status:'Verifying',
                        },
                        {
                          Date: 'Aug 17, 2021', PCN: 'CHR55441143', Payin: 'puny satavas', Payout:'sumit',
                          Sender: 'sumit', Beneficiary: '', Relationship: '', Receiver: 'NGN 102.04', Sending: 'NGN 102.04', Status:'Verifying',
                        },
                        {
                          Date: 'Aug 17, 2021', PCN: 'CHR55441143', Payin: 'puny satavas', Payout:'sumit',
                          Sender: 'sumit', Beneficiary: '', Relationship: '', Receiver: 'NGN 102.04', Sending: 'NGN 102.04', Status:'Verifying',
                        },
                        {
                          Date: 'Aug 17, 2021', PCN: 'CHR55441143', Payin: 'puny satavas', Payout:'sumit',
                          Sender: 'sumit', Beneficiary: '', Relationship: '', Receiver: 'NGN 102.04', Sending: 'NGN 102.04', Status:'Verifying',
                        },
                        {
                          Date: 'Aug 17, 2021', PCN: 'CHR55441143', Payin: 'puny satavas', Payout:'sumit',
                          Sender: 'sumit', Beneficiary: '', Relationship: '', Receiver: 'NGN 102.04', Sending: 'NGN 102.04', Status:'Verifying',
                        },
                        {
                          Date: 'Aug 17, 2021', PCN: 'CHR55441143', Payin: 'puny satavas', Payout:'sumit',
                          Sender: 'sumit', Beneficiary: '', Relationship: '', Receiver: 'NGN 102.04', Sending: 'NGN 102.04', Status:'Verifying',
                        },
                        ]}
                        actions={[
                        {
                            icon: 'visibility',
                            tooltip: 'View Detail',
                            onClick: (event, rowData) => { //window.location.href="/Awaiting_verification"
                              DtlFu(rowData.PCN);       
                           }
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
export default Search_transactions_table;


