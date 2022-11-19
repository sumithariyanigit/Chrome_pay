import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function Search_detail_compliance_table() {

        return (

          
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                        title="Compliance"
                        columns={[
                            { title: 'Execution Date', field: 'execution_date' },
                            { title: 'Ref No	', field: 'ref_No' },
                            { title: 'Rule category		', field: 'rule' },
                            { title: 'Executed on	', field: 'executed' },
                            { title: 'Result', field: 'result' },
                            { title: 'Displayed message to customer/compliance officer  ', field: 'displayedP_message' },
                            
                        ]}
                            data={[
                                {
                                execution_date: '11/08/2020 06:42		', ref_No: 'SANC301', rule: 'SANCTIONLIST', 
                                executed:'On transaction	', result: 'create Pass		', displayedP_message: 'RECEIVER',
                                }, 
                                {
                                execution_date: '11/08/2020 06:42		', ref_No: 'SANC301', rule: 'SANCTIONLIST', 
                                executed:'On transaction	', result: 'create Pass		', displayedP_message: 'RECEIVER',
                                }, 
                                {
                                execution_date: '11/08/2020 06:42		', ref_No: 'SANC301', rule: 'SANCTIONLIST', 
                                executed:'On transaction	', result: 'create Pass		', displayedP_message: 'RECEIVER',
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
export default Search_detail_compliance_table;


