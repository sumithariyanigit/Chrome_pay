import React from 'react';
import { useEffect,useState } from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Button ='Button';
const Awaiting_verification ="Awaiting_verification";


    function Organization_table({tbl_rows,sendDataToParent}) {
    
    const history = useHistory();
      const DtlFu = (org_code)=>{
        localStorage.setItem('org_code',org_code ); 
        history.push("/organization_detail");
       // window.location.href = 'organization_detail';
        return false;   
    
      }
      
      const DleteOrg = async(org_id) => {
           
        // alert('jkid== '+cus_id); return false; 
 
         let  options_2 = { headers:{"Content-type": "application/json" }};
         let   setcol = {'delete_status':1 };
         let formData = [setcol, {"org_id" : org_id} ];
               
             try{
                 let response = await axios.put('/edit_org',formData,options_2);
                  console.log(response);
                  console.log('api status == '+response.data.status );
                 if(response.data.status){
                   toast.success('Organization delete successfully');
                   sendDataToParent({});
                 }else{
                   toast.error( 'something went wrong please try again..');
                   sendDataToParent({});
                 }
               
                 return   response.data;
               } catch(err){ console.error(err);
                   toast.error('2 something went wrong please try again');
                   sendDataToParent({});
                    return false;  }
                     
  
      }   
      



        return (

          
            <div>
            <section className="">
            <div className="container">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center">
                   <MaterialTable
                   title="Filter Organization List"
                      columns={[
                        { title: 'Code', field: 'org_code' },
                        { title: 'Organization Name', field: 'name' },
                        { title: 'Country', field: 'country' },
                        { title: 'City', field: 'city' },
                        { title: 'Number of Users', field: 'org_id'},
                      ]}
                        data={tbl_rows }
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
                            onClick: (event, rowData) => DleteOrg(rowData.org_id)
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
           <ToastContainer  position="top-right"  />   
            </div>

    );
}
export default Organization_table;


