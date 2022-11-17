import React from 'react';
import { useEffect,useState } from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const Button ='Button';
const Awaiting_verification ="Awaiting_verification";


    function CustomerTbl({tbl_rows ,sendDataToParent} ) {
    
    const history = useHistory();
      const editFun = (cus_code)=>{
        localStorage.setItem('cus_code',cus_code ); 
        history.push("/Customer_detail");
       // window.location.href = 'organization_detail';
        return false;   
    
      } 

      const DleteUsers = async(cus_id) => {
           
       // alert('jkid== '+cus_id); return false; 

        let  options_2 = { headers:{"Content-type": "application/json" }};
        let   setcol = {'delete_status':1 };
        let formData = [setcol, {"cus_id" : cus_id} ];
              
            try{
                let response = await axios.put('/cutStatusUp',formData,options_2);
                 console.log(response);
                 console.log('api status == '+response.data.status );
                if(response.data.status){
                  toast.success(' Customer delete  successfully');
                  sendDataToParent();
                }else{
                  toast.error( 'something went wrong please try again..');
                  sendDataToParent();
                }
              
                return   response.data;
              } catch(err){ console.error(err); toast.error('2 something went wrong please try again'); return false;  }
                    
 
     }   



        return (

          
            <div>
            <section className="">
            <div className="container">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center">
                   <MaterialTable
                   title="Filter Customer List"
                      columns={[
                          { title: 'Customer Name', field: 'name' },
                          { title: 'Customer Code', field: 'cus_code' },
                          { title: 'Org Code', field: 'org_code' },
                          { title: 'Mobile', field: 'mobile' },
                          { title: 'Email', field: 'email' },
                        { title: 'Country', field: 'country' },
                        { title: 'City', field: 'city' },
                     
                      ]}
                        data={ tbl_rows }
                        // {code: '5QSI7RA', organization_name: 'Chromepay', country: 'Nigeria', status: 'Confirmed', number:'505433'},
                       
                      actions={[
                          {
                            icon: 'edit',
                            tooltip: 'View Detail',
                            onClick: (event, rowData) => { editFun(rowData.cus_code);}
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
                            onClick: (event, rowData) => DleteUsers(rowData.cus_id)},
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
export default CustomerTbl;


