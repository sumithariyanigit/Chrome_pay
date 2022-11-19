import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';





function Awaiting_verification_table() {

  
const history = useHistory();
const DtlFu = (email)=>{
  localStorage.setItem('email',email ); 
  history.push("/Customer_send_message");
  return false;   
} 
const DtlFua = (email)=>{
  localStorage.setItem('email',email ); 
  history.push("/customer_detail");
  return false;   
} 
        return (
  
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="Awaiting Verification Customers"
                      columns={[
                        { title: 'Signup Date', field: 'Date' },
                         { title: 'Organization Name', field: 'organization' },
                        { title: 'Full Name', field: 'name' },
                        { title: 'Sender Phone	', field: 'phone' },
                        { title: 'Email ID	', field: 'email' },
                        { title: 'Country', field: 'country' },
                        { title: 'Status	', field: 'Status' },
                      ]}
                        data={[
                            {
                                Date: '12/05/2021 11:06:40	', organization: 'Chromepay', name: 'Punit Joshi', phone:'3423480915',
                              email: 'dummy@gmail.com	', country: 'Nigeria',  Status: 'CONFIRMED	',
                            }
                        ]}
                        actions={[
                            {
                              icon: 'chat',
                              tooltip: 'Send Message',
                              onClick: (event, rowData) => { //window.location.href="/Awaiting_verification"
                                DtlFu(rowData.email);       
                             }
                                                              
                            },
                            {
                              icon: 'visibility',
                              tooltip: 'View Detail',
                              onClick: (event, rowData) => { //window.location.href="/Awaiting_verification"
                                DtlFua(rowData.email); }     
                            },

                            {
                              icon: 'verified',
                              tooltip: 'Verifiy Account',
                              onClick: (event, rowData) => alert("" + rowData.name )
                            },
                           
                            {
                              icon: 'delete_outline',
                              tooltip: 'Delete',
                              onClick: (event, rowData) => alert("" + rowData.name)
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
export default Awaiting_verification_table;


