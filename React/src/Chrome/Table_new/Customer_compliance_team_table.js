import  React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import {Link, useHistory } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import axios from 'axios';

function Customer_compliance_team_table() {
     
const [tbl_list,setTbl_list] = useState([]);
const md_form = async ()=>{
    
    let user_code = localStorage.getItem("cus_code");
    let formdata = {user_code :user_code };
   
      console.log('md_form');
      
      console.log(formdata);
      try {
            let options1 = { headers:{"Content-type": "application/json" }};
            let response = await axios.post('/get_c_user_doc',formdata,options1);
           // setTbl_list( response.data );
            demo_fun( response.data );
       } catch(error) {
        console.log(error);
      }
   
     
     
  }
    
  useEffect(() =>{
    md_form();
  },[]);

  const demo_fun = (doc) =>{
    console.log('=========demo_fun =============');
    console.log(doc);

    let up_list = doc.map((item, index) =>{
        let a = localStorage.getItem('first_name');
        let b = localStorage.getItem('last_neme');
        let c = a+' '+b; 
       let issu_D = (item.issu_date.length>0)? item.issu_date.substr(0, 10).split("-").reverse().join("-") : '';
       let dates =  (item.date.length>0)?  item.date.substr(0, 10).split("-").reverse().join("-") : '' ;
       let ex_date = (item.ex_date.length>0)?  item.ex_date.substr(0, 10).split("-").reverse().join("-") : '' ;
      // myStr.replace("Dev", "Guys");
       
       let sum = {"name":c, "doc_type" : item.doc_type.replaceAll('_',' '),"issu_date":issu_D,"date":dates
        			, "ex_date":ex_date,"o_doc_id":item.o_doc_id,"file_one":item.file_one,
        			"file_two":item.file_two};
        
        return sum; 
    });
   
    setTbl_list(up_list);
   
  
}


  console.log('//////////////////tbl_list call sss '); 
  console.log(tbl_list); 
    return (
  
            <div>
            <section className="p-0">
            <div className="">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center p-0">
                   <MaterialTable
                   title="The Documents Below Have Been Requested By The Compliance Team."
                   columns={[
                   { title: 'Request Date', field: 'issu_date' },
                   { title: 'Trigger', field: 'Trigger' },
                   { title: 'Uploaded	', field: 'file_one'},
                   { title: 'Uploaded date	', field: 'date'},
                   { title: 'Document Type	', field: 'doc_type'},
                   { title: 'Restriction', field: 'Restriction'},
                 
                ]}
                    // data={[
                    //     {
                    //         Request_Date: 'Thu Aug 12 03:55:39 BST 2021	', Trigger: 'Verify customer document(Passport, Address, ID)	',  Uploaded: 'false', 
                    //         Uploaded_date: '', 
                    //         Document_Type: 'National ID Card', Restriction: 'Block', 
                    //     },
                       
                    //     ]}
                   data = {tbl_list}   
                      />
                     </div>
                 </div>
               </div>
           </section>
            </div>

    );
}
export default Customer_compliance_team_table;


