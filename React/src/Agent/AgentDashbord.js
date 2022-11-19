import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chart from "react-apexcharts";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import  Jwt  from "jsonwebtoken";

function AgentDashbord() {

    let token = localStorage.getItem('token')
    var decode1 = Jwt.decode(token);
    let agentID = decode1.agentID
    console.log("agentID==",agentID)

    const [data, setData] = useState('');
    const [reccustomer,setRecCustomer] =useState('');
    const [recent, setRecent] =useState([]);
    const [totalTransection,settotalTrans] =useState('');
    const [resdata, settransections] =useState([]);
    const [useractivedatayear, setuseractivedatayear] =useState([]);
    const userlist = async() =>{
        await axios.get(`/agentDash/${agentID}`)
        
        .then(resp=>{
            let data = resp.data;
            setData(data);
            console.log(data);
        })

    }

    useEffect(() => {
        userlist();
        resentuserlist();
        transactionlist();
        UserPermoance();
      
    }, [])

    const resentuserlist = async ()=>{
        await axios.get(`recentUser/${agentID}`)
        .then(resp=>{
            let dataresnt = resp.data.final
            let  totalCustomer = resp.data.totalUser;
            setRecCustomer(totalCustomer);
            setRecent(dataresnt);
            console.log(dataresnt);
        })
    }

    const transactionlist  = async () => {
        await axios.get(`recentAgentTransection/${agentID}`)
        .then(resp => {
            let resdata = resp.data.final
            let totalTransection = resp.data.totalTransection;
            settotalTrans(totalTransection);
            settransections(resdata);
            console.log("===trans===>",resdata)
        })
    }



    const UserPermoance = async () => {

        await axios.post(`/agentAddCustByMonth/632054b68053a62338ea14d2`)
            .then(res => {

                const userData = res.data.Data;
             
                // console.log("++++++++++++++agent", userData);
             
                     setuseractivedatayear(Object.values(userData));

            })
    }









    return (
     <>
      <ToastContainer position="top-right"  />
     <Sidebar />
     <Header />
     <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
     <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                <div className="container-xxl" id="kt_content_container">
                    <div className="row g-5 g-xl-8">
                        <div className="col-lg-12">
                         <div className="row">
                             <div className="col-lg-6">
                                    <div className="card card-flush">

                                        <div className="bg_div card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px">

                                            <h3 className="card-title align-items-start flex-column text-white pt-15">
                                                <span className="fw-bold fs-2x mb-3">Agent Dashboard</span>
                                                <div className="fs-4 text-white">

                                                </div>
                                            </h3>


                                        </div>


                                        <div className="card-body mt-n20">

                                            <div className="mt-n20 position-relative dashorgnastion">

                                                <div className="row g-3 g-lg-6">

                                                    <div className="col-6">

                                                        <div className="retative bg-gray-100 ative animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">

                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fad fa-users"></i>
                                                                    </span>

                                                                </span>
                                                            </div>


                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value= {data.NumberOFUser} className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    {data.NumberOFUser}</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Number Of Users</span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="col-6">

                                                        <div className="retative bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">
                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fad fa-hands-usd"></i>
                                                                    </span>
                                                                </span>
                                                            </div>

                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value={data.totalTransection} data-kt-countup-prefix="$" className="text-gray-700  fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    {`$${data.totalTransection}`}</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Total Transaction </span>
                                                            </div>

                                                        </div>

                                                    </div>


                                                    <div className="col-6">

                                                        <div className="retative bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">

                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fas fa-id-card"></i>
                                                                    </span>

                                                                </span>
                                                            </div>


                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value="100" className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    100</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Total License </span>
                                                            </div>

                                                        </div>

                                                    </div>


                                                    <div className="col-6">

                                                        <div className=" retative bg-gray-100 animestion-bank bg-opacity-70 rounded-2 px-6 py-5">

                                                            <div className="symbol symbol-30px me-5 mb-8">
                                                                <span className="symbol-label">

                                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                                        <i className="fad fa-landmark"></i>
                                                                    </span>

                                                                </span>
                                                            </div>
                                                            <div className="m-0">
                                                                <span data-kt-countup="true" data-kt-countup-value="0" className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                                                                    0</span>
                                                                <span className="text-gray-500 fw-semibold fs-6">
                                                                    Loans Applied</span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                  
                                    <div className="card card-flush h-xl-100">

                                    <div className="card-header pt-7">
                                           
                                           <h3 className="card-title align-items-start flex-column">
                                               <span className="card-label fw-bold text-gray-800">Agent Activity</span>
                                               <span className="text-gray-400 mt-1 fw-semibold fs-6">Activity Of Agent </span>
                                           </h3>
                                          
                                           <div className="card-toolbar">
                                         
                                            
                                             
                                           </div>
                                          
                                       </div>

                                       
                                    <div className="bg-white overflow-auto">
<Chart
type="bar"
width={800}
height={400}
series={[
{
//   name: "Social Media Subscriber",
  data:useractivedatayear
},
]}
options={{
plotOptions:{
    bar:{
        borderRadius:2,
        columnWidth:40,
       
    }
},
title: {
//   text: "BarChar Developed by DevOps Team",
//   style: { fontSize: 30 },
},

subtitle: {
//   text: "This is BarChart Graph",
//   style: { fontSize: 18 },
},


colors: ["#3c7f8c"],
theme: { mode: "light" },


xaxis: {
  tickPlacement: "on",
  categories: [
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ], 
//   title: {
//     text: "Year BY data",
//     style: { color: "##3c7f8c", fontSize: 10 },
//   },
},

yaxis: {
  labels: {
    formatter: (val) => {
      return `${val}`;
    },
    style: { fontSize: "15", colors: ["#3c7f8c"] },
  },
  title: {
    // text: "User In (K)",
    // style: { color: "#f90000", fontSize: 15 },
  },
},

legend: {
  show: true,
  position: "right",
},

dataLabels: {
  formatter: (val) => {
    return `${val}`;
  },
  style: {
    colors: ["white"],
    fontSize: 10,
    position: "top",
  },
},
}}
></Chart>
</div>
                                      
            
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover"
                                style={{marginTop :  '2rem'}}>

                                <div className="card-body container-xxl pt-10 pb-8">

                                    <div className="d-flex align-items-center">
                                        <h1 className="fw-semibold me-3 text-white">Recent Data</h1>
                                        <span className="fw-semibold text-white opacity-50"></span>
                                    </div>

                                    <div className="d-flex flex-column">

                                        <div className="d-lg-flex align-lg-items-center">

                                            {/* <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5 w-xxl-850px h-lg-60px me-lg-10 my-5">

                                                <div className="row flex-grow-1 mb-5 mb-lg-0">

                                                    <div className="col-lg-4 d-flex align-items-center mb-3 mb-lg-0">
                                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                            </svg>
                                                        </span>
                                                        <input type="text" autoComplete="off" className="form-control form-control-flush flex-grow-1" name="search" placeholder="User Name.." />

                                                    </div>





                                                    <div className="col-lg-4 d-flex align-items-center mb-5 mb-lg-0">
                                                        <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                        </div>
                                                        <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
                                                                <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                                <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
                                                            </svg>
                                                        </span>
                                                        <select className="form-select border-0 flex-grow-1" data-control="select2" data-placeholder="Category" data-hide-search="true">
                                                            <option defaultValue="">Please Select</option>
                                                            <option defaultValue="1" selected="selected">Category</option>
                                                            <option defaultValue="2">In Progress</option>
                                                            <option defaultValue="3">Verified</option>
                                                        </select>

                                                    </div>

                                                </div>

                                                <div className="min-w-150px text-end">
                                                    <button type="submit" className="btn btn-dark" id="kt_advanced_search_button_1">Search</button>
                                                </div>

                </div> */}



                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6">

                            <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                <div className="card-header border-0 pt-5">
                                    <h3 className="card-title align-items-start flex-column">
                                        <span className="card-label fw-bold fs-3 mb-1">Recent Users</span>
                                        <span className="text-muted mt-1 fw-semibold fs-7">Over {reccustomer} Customer</span>
                                    </h3>

                                </div>

                                <div className="card-body py-3">

                                    <div className="table-responsive">

                                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                            <thead>
                                                <tr className="fw-bold text-muted th-title">

                                                 
                                                    <th className="min-w-125px">Name</th>
                                                    <th className="min-w-150px">Email Address</th>
                                                    <th className="min-w-150px">Mobile No. </th>
                                                    <th className="min-w-100px">DOB</th>
                                                    <th className="min-w-100px ">Status</th>
                                                    <th className="min-w-100px text-end">Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>


                                            {recent.map((item) =>
                                                <tr>


                                                    <td>
                                                        {item.fullname}
                                                    </td>
                                                    <td>{item.email}   </td>
                                                    <td><span>{item.phone} </span>
                                                </td>
                                                <td>{moment(item.dateOfBirth).format("DD/MM/YYYY")}</td>
                                                <td><span className="text-success">{item.status}</span></td>
                                                <td>
                                                    <div className="d-flex justify-content-end flex-shrink-0">
                                                        <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                                            <span className="svg-icon svg-icon-3">
                                                                <i className="fad fa-eye fs-4"></i>
                                                            </span>

                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            )}
                                            {/* <tr>

                                                <td>
                                                    Sunil Ganwane
                                                </td>
                                                <td>ganwanesunil@gmail.com   </td>
                                                <td><span>+211 123-456-7890 </span>
                                            </td>
                                            <td>05/06/1998</td>
                                            <td><span className="text-success">Verified</span></td>
                                            <td>
                                                <div className="d-flex justify-content-end flex-shrink-0">
                                                    <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                                        <span className="svg-icon svg-icon-3">
                                                            <i className="fad fa-eye fs-4"></i>
                                                        </span>

                                                    </a>
                                                </div>
                                            </td>
                                        </tr><tr>

                                            <td>
                                                Jessica Chinara
                                            </td>
                                            <td> jessica@gmail.com </td>
                                            <td><span>+251 123-456-7890</span>
                                        </td>
                                        <td>05/06/1998</td>
                                        <td><span className="text-success">Verified</span></td>
                                        <td>
                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                                    <span className="svg-icon svg-icon-3">
                                                        <i className="fad fa-eye fs-4"></i>
                                                    </span>

                                                </a>
                                            </div>
                                        </td>
                                    </tr> */}


                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>



            <div className="col-lg-6">

                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                    <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bold fs-3 mb-1">Recent Transaction</span>
                            <span className="text-muted mt-1 fw-semibold fs-7">Over {totalTransection} Customer</span>
                        </h3>

                    </div>

                    <div className="card-body py-3">

                        <div className="table-responsive">

                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                <thead>
                                    <tr className="fw-bold text-muted th-title">

                                        <th className="min-w-125px">Transaction <br /> Date </th>
                                        <th className="min-w-150px">PCN  <br />Number</th>
                                        <th className="min-w-150px">Sender <br /> Name </th>
                                        <th className="min-w-100px">Beneficiary <br /> Name </th>
                                        <th className="min-w-100px text-center">Sending <br /> Amount</th>
                                        <th className="min-w-100px text-center">Receiver <br /> Amount</th>
                                        <th className="min-w-100px ">Status</th>
                                        <th className="min-w-100px text-end">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>


                                     {resdata.map((item)=>

                                    <tr>


                                        <td>
                                            {item.transactionDate.slice(0,10)}
                                        </td>
                                        <td>{item.PCN}   </td>
                                        <td><span>{item.senderName}</span>
                                    </td>
                                    <td>{item.beneficiaryName}</td>

                                    <td>${item.sendingAmount}</td>
                                    <td>${item.receiverAmount}</td>
                                    <td><span className="text-success">{item.status}</span></td>
                                    <td>
                                        <div className="d-flex justify-content-end flex-shrink-0">
                                            <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                                <span className="svg-icon svg-icon-3">
                                                    <i className="fad fa-eye fs-4"></i>
                                                </span>

                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                )}
                                {/* <tr>


                                    <td>
                                        Aug 17, 2021
                                    </td>
                                    <td>CHR55441143   </td>
                                    <td><span>Punit Joshi</span>
                                </td>
                                <td>Punit Joshi</td>

                                <td>$50.22</td>
                                <td>$50.22</td>
                                <td><span className="text-success">Success</span></td>
                                <td>
                                    <div className="d-flex justify-content-end flex-shrink-0">
                                        <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                            <span className="svg-icon svg-icon-3">
                                                <i className="fad fa-eye fs-4"></i>
                                            </span>

                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>


                                <td>
                                    Aug 17, 2021
                                </td>
                                <td>CHR55441143   </td>
                                <td><span>Pushpak</span>
                            </td>
                            <td>Pushpak</td>

                            <td>$50.22</td>
                            <td>$50.22</td>
                            <td><span className="text-success">Success</span></td>
                            <td>
                                <div className="d-flex justify-content-end flex-shrink-0">
                                    <a href="digital_user_detail.html" className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" data-kt-initialized="1">
                                        <span className="svg-icon svg-icon-3">
                                            <i className="fad fa-eye fs-4"></i>
                                        </span>

                                    </a>
                                </div>
                            </td>
                        </tr> */}


                    </tbody>

                </table>

            </div>

        </div>

      </div >

    </div >

  </div >
</div >

            </div>

            </div>
     </>
  );   
}


export default AgentDashbord