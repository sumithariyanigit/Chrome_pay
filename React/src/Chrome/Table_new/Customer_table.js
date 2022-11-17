import  React from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


function Customer_table() {

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
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="Online Customers List"
                      columns={[
                        { title: 'Last Login', field: 'login' },
                         { title: 'Code', field: 'Code' },
                        { title: 'Organization Name', field: 'organization' },
                        { title: 'Full Name	', field: 'name' },
                        { title: 'Email ID	', field: 'email' },
                        { title: 'Sender Phone	', field: 'phone' },
                        { title: 'Country', field: 'country' },
                      ]}
                        data={[
                            {
                                login: 'Wed Aug 11 06:28:14 BST 2021', Code: 'L2CD5H', organization: 'Chromepay', name:'Punit Joshi	',
                              email: 'dummy@gmail.com	', phone: '2349014677411	', country: 'Nigeria',
                            },  {
                                login: 'Wed Aug 11 06:28:14 BST 2021', Code: 'L2CD5H', organization: 'Chromepay', name:'Punit Joshi	',
                              email: 'dummy@gmail.com	', phone: '2349014677411	', country: 'Nigeria',
                            },  {
                                login: 'Wed Aug 11 06:28:14 BST 2021', Code: 'L2CD5H', organization: 'Chromepay', name:'Virendra	',
                              email: 'dummy@gmail.com	', phone: '2349014677411	', country: 'Nigeria',
                            },  {
                                login: 'Wed Aug 11 06:28:14 BST 2021', Code: 'L2CD5H', organization: 'Chromepay', name:'Sumit	',
                              email: 'dummy@gmail.com	', phone: '2349014677411	', country: 'Nigeria',
                            },  {
                                login: 'Wed Aug 11 06:28:14 BST 2021', Code: 'L2CD5H', organization: 'Chromepay', name:'Sunil	',
                              email: 'dummy@gmail.com	', phone: '2349014677411	', country: 'Nigeria',
                            },  {
                                login: 'Wed Aug 11 06:28:14 BST 2021', Code: 'L2CD5H', organization: 'Chromepay', name:'Arpit	',
                              email: 'dummy@gmail.com	', phone: '2349014677411	', country: 'Nigeria',
                            },
                        ]}
                        actions={[
                            {
                              icon: 'chat',
                              tooltip: 'Send Message',
                              onClick: (event, rowData) => alert("You saved " + rowData.name )  
                                                              
                            },
                            {
                                icon: 'edit',
                                tooltip: 'View Detail',
                                onClick: (event, rowData) => alert("" + rowData.name )  
                                                                
                              },
                            {
                              icon: 'remove_circle_outline',
                              tooltip: 'Suspend',
                              onClick: (event, rowData) => alert("" + rowData.name )
                            },
                            {
                              icon: 'visibility_off',
                              tooltip: 'Disable OTP',
                              onClick: (event, rowData) => alert("" + rowData.name)
                            },
                            {
                              icon: 'restart_alt',
                              tooltip: 'Password Reset',
                              onClick: (event, rowData) => alert("" + rowData.name)
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
export default Customer_table;


