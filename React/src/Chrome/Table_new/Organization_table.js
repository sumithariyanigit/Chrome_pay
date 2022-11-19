import React from 'react';
import { useEffect,useState } from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


const Button ='Button';
const Awaiting_verification ="Awaiting_verification";


    function Organization_table(props) {
    
    const history = useHistory();
      const DtlFu = (org_code)=>{
        localStorage.setItem('org_code',org_code ); 
        history.push("/organization_detail");
       // window.location.href = 'organization_detail';
        return false;   
    
      } 
        return (

          
            <div>
            <section className="pt-5">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="Filter Organization List"
                      columns={[
                        { title: 'Code', field: 'org_code' },
                        { title: 'Organization Name', field: 'name' },
                        { title: 'Country', field: 'country' },
                        { title: 'City', field: 'city' },
                        { title: 'Number of Users', field: 'org_id'},
                      ]}
                        data={ props.tbl_rows }
                        // {code: '5QSI7RA', organization_name: 'Chromepay', country: 'Nigeria', status: 'Confirmed', number:'505433'},
                       
                      actions={[
                          {
                            icon: 'edit',
                            tooltip: 'View Detail',
                            onClick: (event, rowData) => { //window.location.href="/Awaiting_verification"
                                                               DtlFu(rowData.org_code);       
                                                            }
                          },
                          {
                            icon: 'remove_circle_outline',
                            tooltip: 'Suspend',
                            onClick: (event, rowData) => alert("You saved " + rowData.org_code )
                          },
                          {
                            icon: 'visibility_off',
                            tooltip: 'Disable OTP',
                            onClick: (event, rowData) => alert("You saved " + rowData.org_code)
                          },
                          {
                            icon: 'restart_alt',
                            tooltip: 'Password Reset',
                            onClick: (event, rowData) => alert("You saved " + rowData.org_code)
                          },
                          {
                            icon: 'delete_outline',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => alert("You saved " + rowData.email)
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
export default Organization_table;


