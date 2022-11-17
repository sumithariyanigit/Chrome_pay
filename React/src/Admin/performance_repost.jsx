import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from './Header'
import Sidebar from "./Sidebar";
import { Line } from 'react-chartjs-2';
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
var jwt = require("jsonwebtoken");




ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Performance_repost() {
    const {_id} =useParams();

    const [Today_date, setToday_date] = useState([]);
    const [Last_Month, setLast_Month] = useState([]);
    const [useractivedata, setuseractivedata] = useState([]);
    const [useractivedatayear, setuseractivedatayear] = useState([]);
    const [data, setData] = useState([]);

    const agentID =_id;

    
    const UserPermoance = async () => {

        await axios.post(`/agentPerformanceReport/${agentID}`)
            .then(res => {
                const userData = res.data.Today_date;
                const userData2 = res.data.positive;
                const userData3 = res.data;
                console.log("++++++++++++++", res);
                setToday_date(userData);
                setLast_Month(userData2);
                setuseractivedata(userData3);

            })
    }
    useEffect(() => {
        UserPermoance();
        UserPermoanceyear();
        userdeatil();

    }, []);

    const UserPermoanceyear = async () => {

        await axios.post(`/agentAddCustByMonth/${agentID}`)
            .then(res => {
                const userData = res.data.Data;
             
                console.log("++++++++++++++", userData);
             
                     setuseractivedatayear(Object.values(userData));
                  
console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjj",useractivedatayear)
            })
    }

    const userdeatil = async () => {

        await axios.get(`/agentDash/${agentID}`)
            .then(res => {
                
                const userData = res.data;
                console.log("++++++++++++++2", userData);
                
            
                setData(userData);

            })
    }

    return (
        <>

            <Header />
            <Sidebar />
            <div className="wrapper d-flex flex-column flex-row-fluid mb-0 back-color" id="kt_wrapper">
                <div className="content d-flex flex-column flex-column-fluid mb-0 py-0" id="kt_content">
                    <div className="container-xxl mb-0" id="kt_content_container">
                        <div className="card-body  pt-9 pb-0 ">
                            <div className="col-lg-12">
                                <div className="card rounded-15 mb-5 mb-xl-10 bgi-no-repeat bgi-position-x-end bgi-size-cover">
                                    <div className='card-body  pt-9 pb-0 '>
                                        {/* <!--begin::Details--> */}
                                        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                                            {/* <!--begin: Pic--> */}
                                            <div className="me-7 mb-4">
                                                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                                    <img src="../assets_new/images/arpit.png" alt="image" />
                                                    <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px">
                                                    </div>
                                                </div>
                                            </div>


                                            {/* <!--end::Pic--> */}

                                            <div className="flex-grow-1">

                                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                        {/* <!--begin::User--> */}
                                        <div className="d-flex flex-column">
                                            {/* <!--begin::Name--> */}
                                            <div className="d-flex align-items-center mb-2">
                                                <a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">{data.agentName}</a>
                                                <a href="#">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen026.svg--> */}
                                                    <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                                            <path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="currentColor" />
                                                            <path d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white" />
                                                        </svg>
                                                    </span>

                                                </a>
                                                {/* <!--  <a href="#" className="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">Verified</a> --> */}
                                            </div>
                                            {/* <!--end::Name--> */}

                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com006.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor" />
                                                            <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor" />
                                                            <rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                    Agent
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen018.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor" />
                                                            <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                   {data.country}
                                                </a>
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com011.svg--> */}
                                                    <span className="svg-icon svg-icon-4 me-1">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
                                                            <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                  {data.email}
                                                </a>
                                            </div>
                                            {/* <!--end::Info--> */}
                                        </div>
                                        {/* <!--end::User--> */}

                                    </div>


                                    <div className="d-flex flex-wrap flex-stack">

                                        <div className="d-flex flex-column flex-grow-1 pe-8">

                                            <div className="d-flex flex-wrap">
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">

                                                    <div className="d-flex align-items-center">

                                                        <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
                                                                <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
                                                            </svg>
                                                        </span>

                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value={data.NumberOFUser} data-kt-countup-prefix="$">{data.NumberOFUser}</div>
                                                    </div>


                                                    <div className="fw-semibold fs-6 text-gray-400">
                                                        Total User</div>

                                                </div>
                                                {/* <!--end::Stat--> */}
                                                {/* <!--begin::Stat--> */}
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">

                                                    <div className="d-flex align-items-center">

                                                        <span className="svg-icon svg-icon-3 svg-icon-danger me-2">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
                                                                <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor" />
                                                            </svg>
                                                        </span>

                                                        <div className="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value={data.totalTransection}>{data.totalTransection}</div>
                                                    </div>


                                                    <div className="fw-semibold fs-6 text-gray-400">
                                                    Total Transaction </div>

                                                </div>
                                                {/* <!--end::Stat--> */}
                                                {/* <!--begin::Stat--> */}

                                                {/* <!--end::Stat--> */}
                                            </div>
                                           

                                        </div>

                                        {/* <!--begin::Progress--> */}

                                        {/* <!--end::Progress--> */}
                                    </div>

                                </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="content d-flex flex-column flex-column-fluid mb-0 py-0" id="kt_content">
                    <div className="container-xxl mb-0" id="kt_content_container">
                        <div className="card-body   pb-0 ">
                            <div className="col-lg-12">
                                <div className="card rounded-15 mb-5 mb-xl-10  bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{paddingBottom:"1.8rem"}}>
                                    <div className='card-body  pt-9 pb-0 '>
                                    <div className="row">

<div className="col-4">

    <div className="retative bg-gray-100 animestion-bank h-100 bg-opacity-70 rounded-2 px-6 py-5">
  

        <div className="symbol symbol-30px me-5 ">
            <span className="symbol-label">

                <span className="svg-icon svg-icon-1 svg-icon-primary">
                <i className="fad fa-users"></i>
                </span>

            </span>
        </div>

        {Last_Month<=0?


        <i className="fal fa-arrow-up fz-20"></i>
       : <i className="fal fa-arrow-down fz-21"></i>
}
        <div className=" ">
          
          {
            Last_Month<=0?
            <span data-kt-countup="true" data-kt-countup-value={useractivedata.Last_Month} className="text-gray-700 fz-23 mt-3 fw-bolder d-block fs-4qx lh-1 ls-n1 mb-1  " >
               {useractivedata.Last_Month}</span>:
               <span data-kt-countup="true" data-kt-countup-value={useractivedata.Last_Month} className="text-gray-700 fz-24 mt-3 fw-bolder d-block fs-4qx lh-1 ls-n1 mb-1  " >
               {useractivedata.Last_Month}</span>
          }
            
               <h6 className="nz-2">
            <span className="text-gray-500 fw-semibold fs-6  ">
                 Last months Added Customer</span>
                 </h6>
        </div>

    </div>
  
</div>

{ Last_Month<=0?

<div className="col-4">
<div className="retative bg-gray-100 animestion-bank h-100 bg-opacity-70 rounded-2 px-6 py-5">
<span> TIME</span>

<Line
data={
{
labels: ['', '', '', 'this_Month'],
datasets: [
{
label: 'customer adding rate',
data: [-0.1, -0.2, 0, `${Last_Month}`],
borderColor: 'red',
backgroundColor: 'red',
tension:0.5,
},
// {
//   label: 'Dataset 2',
//   data:[15,34,2,12,25],
//   borderColor: 'rgb(53, 162, 235)',
//   backgroundColor: 'rgba(53, 162, 235, 0.5)',
// },
],
}
}


options={
{
responsive: true,
plugins: {
legend: {
// position: 'top' as const,
},
title: {
display: true,
text: `${Today_date}`.slice(0,10),
font: { size: 10 },
},
},
scales: {
X: {
grid: {
display: false,
}
},
y: {
grid: {
display: false,
}
}
}
}
}



/>
</div>
</div>
:<div className="col-4">
<div className="retative bg-gray-100 animestion-bank h-100 bg-opacity-70 rounded-2 px-6 py-5">


    <Line
        data={
            {
                labels: ['', '', '', 'this Month'],
                datasets: [
                    {
                        label: 'customer adding rate',
                        data: [0, 3, 1, `${Last_Month}`],
                        borderColor: '#00A300',
                        backgroundColor: '#00A300',
                        tension:0.5,
                    },
                    // {
                    //   label: 'Dataset 2',
                    //   data:[15,34,2,12,25],
                    //   borderColor: 'rgb(53, 162, 235)',
                    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    // },
                ],
            }
        }


        options={
            {
                responsive: true,
                plugins: {
                    legend: {
                        // position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: `${Today_date}`.slice(0,10),
                        font: { size: 10 },
                    },
                },
                scales: {
                    X: {
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        }



    />
    </div>
</div>
}


<div className="col-4">

<div className="retative bg-gray-100 animestion-bank h-100 bg-opacity-70 rounded-2 px-6 py-5">


<div className="symbol symbol-30px me-5 ">
<span className="symbol-label">

<span className="svg-icon svg-icon-1 svg-icon-primary">
<i className="fad fa-users"></i>
</span>

</span>
</div>




<i class="fas fa-bullseye-arrow fz-200"></i>


<div className=" ">
<span data-kt-countup="true" data-kt-countup-value={useractivedata.nexttarget} className="text-gray-700 fz-230 mt-3 fw-bolder d-block fs-4qx lh-1 ls-n1 mb-1  " >
{useractivedata.nexttarget}</span>
<h6 className="nz-2">
<span className="text-gray-500 fw-semibold fs-6  ">
Expected Next Month Target</span>
</h6>
</div>

</div>

</div>

</div>
                                        

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl" id="kt_content_container">
                    <div className="row g-5 g-xl-8">
                        <div className="col-lg-12">
                         <div className="row">
                             
                                <div className="col-lg-6">
                                  
                                    <div className="card card-flush h-xl-100">
                                       
                                        <div className="card-header pt-7">
                                           
                                           
                                           
                                           
                                           
                                        </div>
                                      
                                        <div className="card-body d-flex align-items-end px-0 pt-3 pb-5">
                                            
                                        <div className="bg-white overflow-auto">
<Chart
type="bar"
width={1000}
height={250}
series={[
{
//   name: "Social Media Subscriber",
  data: useractivedatayear,
},
]}
options={{
plotOptions:{
    bar:{
        borderRadius:2,
        columnWidth:50,
       
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
    fontSize: 12,
    position: "top",
  },
},
}}
></Chart>
</div>
                                         
                                        </div>
                                       
                                    </div>
                                    
                                    
                                </div>
                                <div className="col-lg-6">
                                  
                                    <div className="card card-flush h-xl-100">
                                       
                                        <div className="card-header pt-7">
                                           
                                            <h3 className="card-title align-items-start flex-column">
                                                <span className="card-label fw-bold text-gray-800">Users Activity</span>
                                                <span className="text-gray-400 mt-1 fw-semibold fs-6">Activity Of Users </span>
                                            </h3>
                                           
                                            <div className="card-toolbar">
                                          
                                                <div data-kt-daterangepicker="true" data-kt-daterangepicker-opens="left" className="btn btn-sm btn-light d-flex align-items-center px-4">
                                                    
                                                    <div className="text-gray-600 fw-bold">Loading date range...</div>
                                                   
                                                    <span className="svg-icon svg-icon-1 ms-2 me-0">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor" />
                                                            <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor" />
                                                            <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                  
                                                </div>
                                              
                                            </div>
                                           
                                        </div>
                                      
                                        <div className="card-body d-flex align-items-end px-0 pt-3 pb-5">
                                            
                                        <div className="bg-white overflow-auto">
<Chart
          type="line"
          width={700}
          height={250}
          series={[
            {
            //   name: "Social Media Subscriber",
              data: [6578, 6787, 3245, 9876, 2324, 5123, 2435],
            },
          ]}
          options={{
            stroke: {
                width: 2
              },
           
            colors: ["#0000ff"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: [
                "Facebook",
                "Twitter",
                "Linkedin",
                "Instagram",
                "GitHub",
                "Stackoverflow",
                "Youtube",
              ],
              title: {
             
                style: { color: "#f90000", fontSize: 0 },
              },
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
            
              },
            //  
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
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      </div>
                                         
                                        </div>
                                       
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>

                        



            

  </div >
</div >
                


                

</div>
           
        </>
    )
}







