import  React, {useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Manage_partner_centers_table() {
  const history = useHistory();
  const edit_fun = (agent_code)=>{
      
    localStorage.setItem('agent_info',agent_code ); 
    history.push("/edit_api_pay_centers");
    return false;   

  } 

////////////////////////////////

   
const [tbl_list,setTbl_list] = useState([]);
const md_form = async ()=>{
    
    let user_code = localStorage.getItem("cus_code");
    let formdata = {user_code :user_code };
   
      console.log('md_form');
      
      console.log(formdata);
      try {
            let options1 = { headers:{"Content-type": "application/json" }};
            let response = await axios.get('/getAll_agent',formdata,options1);
            //  demo_fun( response.data );
            setTbl_list(response.data);
       } catch(error) {
        console.log(error);
      }
   
     
     
  }
    
  useEffect(() =>{
    md_form();
  },[]);

    
  const DleteUsers = async(agent_code) => {
           
    // alert('jkid== '+cus_id); return false; 

     let  options_2 = { headers:{"Content-type": "application/json" }};
     let   setcol = {'delete_status':1 };
     let formData =  {"agent_code" : agent_code};
           
         try{
             let response = await axios.post('/delete_agent',formData,options_2);
            if(response.data.status){
               toast.success(response.data.msg);
               md_form();
             }else{
               toast.error( response.data.msg);
             
             }
           
             return   response.data;
           } catch(err){ console.error(err); toast.error('something went wrong please try again'); return false;  }
                 

  }  
////////////////////



     return (
  
            <div>
            <section className="p-0">
            <div className="">
           <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title=""
                   columns={[
                   { title: 'Name', field: 'name' },
                   { title: 'Org code', field: 'org_code' },
                   { title: 'Agent Code', field: 'agent_code', },
                   { title: 'Type', field: 'debit_ac', },
                   { title: 'Country', field: 'country', },
                   { title: 'City', field: 'city', },
                   

                     ]}
                    data={ tbl_list }
                        actions={[
                            
                            {
                                icon: 'edit',
                                tooltip: 'View Detail',
                                onClick: (event, rowData) => { edit_fun(rowData.agent_code); }
                                                                
                              },
                              {
                              icon: 'remove_circle_outline',
                              tooltip: 'Suspend',
                              onClick: (event, rowData) => DleteUsers( rowData.agent_code )
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
           <ToastContainer />
            </div>

    );
}
export default Manage_partner_centers_table;