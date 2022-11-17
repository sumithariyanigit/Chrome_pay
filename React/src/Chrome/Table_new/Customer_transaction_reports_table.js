import React from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function Customer_transaction_reports_table() {
        return (   
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center ">
                   <div className="col-lg-12 d-flex flex-column justify-content-center">
                   <MaterialTable
                   title="Transaction Reports List"
                      columns={[
                        { title: 'Created Date', field: 'Date' },
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
                          Date: '03/01/2022 23:12', Delivery: 'Bank Transfer', PCN: 'CHR32146325', Organization: 'Chromepay	', Customer:'toheeb Yusuf	',
                          Sending: '1000.00 NGN	', ReceivingAmount: '1000.00 NGN	', ReceivingCountry: 'Nigeria',  PaymentType:'E_WALLET',
                          PaymentStatus: 'SUCCESS', Transaction: 'PENDING', Compliance: ''
                        },
                        {
                          Date: '03/01/2022 23:12', Delivery: 'Bank Transfer', PCN: 'CHR32146325', Organization: 'Chromepay	', Customer:'toheeb Yusuf	',
                          Sending: '1000.00 NGN	', ReceivingAmount: '1000.00 NGN	', ReceivingCountry: 'Nigeria',  PaymentType:'E_WALLET',
                          PaymentStatus: 'SUCCESS', Transaction: 'PENDING', Compliance: ''
                        },
                        {
                          Date: '03/01/2022 23:12', Delivery: 'Bank Transfer', PCN: 'CHR32146325', Organization: 'Chromepay	', Customer:'toheeb Yusuf	',
                          Sending: '1000.00 NGN	', ReceivingAmount: '1000.00 NGN	', ReceivingCountry: 'Nigeria',  PaymentType:'E_WALLET',
                          PaymentStatus: 'SUCCESS', Transaction: 'PENDING', Compliance: ''
                        },
                        {
                          Date: '03/01/2022 23:12', Delivery: 'Bank Transfer', PCN: 'CHR32146325', Organization: 'Chromepay	', Customer:'toheeb Yusuf	',
                          Sending: '1000.00 NGN	', ReceivingAmount: '1000.00 NGN	', ReceivingCountry: 'Nigeria',  PaymentType:'E_WALLET',
                          PaymentStatus: 'SUCCESS', Transaction: 'PENDING', Compliance: ''
                        },
                        {
                          Date: '03/01/2022 23:12', Delivery: 'Bank Transfer', PCN: 'CHR32146325', Organization: 'Chromepay	', Customer:'toheeb Yusuf	',
                          Sending: '1000.00 NGN	', ReceivingAmount: '1000.00 NGN	', ReceivingCountry: 'Nigeria',  PaymentType:'E_WALLET',
                          PaymentStatus: 'SUCCESS', Transaction: 'PENDING', Compliance: ''
                        },
                        {
                          Date: '03/01/2022 23:12', Delivery: 'Bank Transfer', PCN: 'CHR32146325', Organization: 'Chromepay	', Customer:'toheeb Yusuf	',
                          Sending: '1000.00 NGN	', ReceivingAmount: '1000.00 NGN	', ReceivingCountry: 'Nigeria',  PaymentType:'E_WALLET',
                          PaymentStatus: 'SUCCESS', Transaction: 'PENDING', Compliance: ''
                        },
                        
                        ]}
                        actions={[
                          {
                            icon: 'visibility',
                            tooltip: 'View Detail',
                            onClick: (event, rowData) => {window.location.href="/Awaiting_verification"}
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
export default Customer_transaction_reports_table;


