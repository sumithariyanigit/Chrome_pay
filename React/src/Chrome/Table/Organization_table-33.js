import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import ArrowDownward from '@material-ui/icons/ArrowDownward';


 

    function Organization_table(props) {
      
        console.log("sunil tbl");
        console.log(props.data);



        
const Button ='Button';
const Awaiting_verification ="Awaiting_verification";

        // const sendMessage = (e) => {
        //   console.log('value', e.target.value); // output: “value somevalue”
        //   window.location = "Awaiting_verification";
        // }


  const[rows,setRows] = useState([]); 
  let rows_data = []; 

const rowfun = ()=>{
 setRows( props.data.map((UItem) => {
    // let raj =  {code: UItem.org_code, organization_name: UItem.name, country: UItem.country, status: UItem.city, number:1};
         return  UItem; 
    }  ));
}

console.log('outrow call');
console.log(rows);
rowfun(); 
  //  useEffect(()=>{

    
  //   setRows( user_list.map((UItem,index) =>
  //         {code: UItem.org_code, organization_name: UItem.name, country: UItem.country, status: UItem.city, number:index},
  //     },[]); 

const sendMessage = ()=> {
  return false;
}
      return( 
            <div>
            <section className="">
            <div className="container">
                 <div className="row text-center " data-aos="fade-down" data-aos-delay="400">
                   <div className="col-lg-12 d-flex flex-column justify-content-center">
                   <MaterialTable
                   title="Filter Organization List"
                      columns={[

                        { title: 'Code', field: 'code' },
                        { title: 'Organization Name', field: 'organization_name' },
                        { title: 'Country', field: 'country' },
                        { title: 'Status', field: 'status' },
                        { title: 'Number of Users', field: 'number' },
                      ]}
                        data={[

                                                 
                        {code: '', organization_name: 'Chromepay', country: 'Nigeria', status: 'Confirmed', number:'505433'},
                        {code: 'A2CD5H', organization_name: 'Chromepay', country: 'Nigeria', status: 'Confirmed', number:'505433'},
                        {code: 'A2CD5H', organization_name: 'Chromepay', country: 'Nigeria', status: 'Confirmed', number:'505433'},
                        {code: 'B2CD5H', organization_name: 'Chromepay', country: 'Nigeria', status: 'Confirmed', number:'505433'},
                        {code: '5QSI7RA', organization_name: 'Chromepay', country: 'Nigeria', status: 'Confirmed', number:'505433'},
                        ]}
                        actions={[
                          {
                            icon: 'edit',
                            tooltip: 'View Detail',
                            onClick: (event, rowData) => {window.location.href="/Awaiting_verification"}
                          },
                          {
                            icon: 'remove_circle_outline',
                            tooltip: 'Suspend',
                            onClick: (event, rowData) => alert("You saved " + rowData.code)
                          },
                          {
                            icon: 'visibility_off',
                            tooltip: 'Disable OTP',
                            onClick: (event, rowData) => alert("You saved " + rowData.code)
                          },
                          {
                            icon: 'restart_alt',
                            tooltip: 'Password Reset',
                            onClick: (event, rowData) => alert("You saved " + rowData.code)
                          },
                          {
                            icon: 'delete_outline',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => alert("You saved " + rowData.code)
                          },
                         ]}
                        options={{
                          actionsColumnIndex: -1
                        }}
                        
                        
                        components={{
                          Actions: props => (
                           
                            <div>
                              <button value="somevalue" onClick={sendMessage}>
                              Send message
                            </button>
                            <button value="somevalue" onClick={sendMessage}>
                              wwwwwSend message
                            </button>
                           </div>
                            
                          ),
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


