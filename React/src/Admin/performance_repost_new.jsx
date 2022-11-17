import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from './Header'
import Sidebar from "./Sidebar";
import { Line } from 'react-chartjs-2';
import Chart from "react-apexcharts";
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


    let token = localStorage.getItem('token')
    var decode1 = jwt.decode(token);
    let agentID = decode1.admminID
    const [Today_date, setToday_date] = useState([]);
    const [Last_Month, setLast_Month] = useState([]);
    const [useractivedata, setuseractivedata] = useState([]);
    const [useractivedatayear, setuseractivedatayear] = useState([]);

    const UserPermoance = async () => {

        await axios.post(`/agentPerformanceReport/632054b68053a62338ea14d2`)
            .then(res => {
                const userData = res.data.Today_date;
                const userData2 = res.data.positive;
                const userData3 = res.data;
                // console.log("++++++++++++++", res);
                setToday_date(userData);
                setLast_Month(userData2);
                setuseractivedata(userData3);

            })
    }


    const UserPermoanceyear = async () => {

        await axios.post(`/agentAddCustByMonth/632054b68053a62338ea14d2`)
            .then(res => {
                const userData = res.data.Data;
             
                console.log("++++++++++++++", userData);
             
                     setuseractivedatayear(Object.values(userData));
                  
console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjj",useractivedatayear)
            })
    }
    useEffect(() => {
        UserPermoance();
        UserPermoanceyear();

    }, []);



    return (
        <>

            <Header />
            <Sidebar />
            <div className="wrapper d-flex flex-column flex-row-fluid mb-0" id="kt_wrapper">
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
                                                    <img src="" alt="image" />
                                                    <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px">
                                                    </div>
                                                </div>
                                            </div>


                                            {/* <!--end::Pic--> */}


                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="container bg-white py-5">

                    <div className="row pt-5">
                        <div className="col-12 col-md-12">

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
              :<div className="col-4">



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
        <span data-kt-countup="true" data-kt-countup-value={useractivedata.nexttarget.toFixed(0)} className="text-gray-700 fz-230 mt-3 fw-bolder d-block fs-4qx lh-1 ls-n1 mb-1  " >
           {useractivedata.nexttarget.toFixed(0)}</span>
           <h6 className="nz-2">
        <span className="text-gray-500 fw-semibold fs-6  ">
             Expected Next Month Target</span>
             </h6>
    </div>

</div>

</div>

                            </div>
                        </div>

                   
            



{/* seconed graph  */}


{/* <div className="row pt-5 mt-5  bg-light">
                        <div className="col-6 overflow-auto ">




            <div className="bg-white overflow-auto">
            <Chart
          type="bar"
          width={700}
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
                    borderRadius:6,
                    columnWidth:30,
                   
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
                fontSize: 8,
                position: "top",
              },
            },
          }}
        ></Chart>
      </div>

</div>


<div className="col-6 overflow-auto">


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
</div> */}


</div>
</div>

</div>
           
        </>
    )
}







