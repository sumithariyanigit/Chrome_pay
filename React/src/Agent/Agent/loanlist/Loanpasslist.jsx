import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function Loanpasslist() {
    const [loanlist,setloanlist]=useState([])
    let token = localStorage.getItem('token')


const customerloanlistapply=()=>{

    axios.post(`/get_Agent_pass_Loans/${token}`)
    .then(resp => {
        let data = resp.data.find;
        setloanlist(data);

    
        console.log("custer loan apply list2 ",data);
      


    }).catch(console.error());

}


    useEffect(()=>{
customerloanlistapply();
    },[]);

    const handleView = (_id) =>{
  
    alert(_id);
        return false;  
    }

  return (
    <>
    

<Sidebar />
<Header />
<div className="wrapper d-flex flex-column flex-row-fluid mb-0 back-color mt-5"id="kt_wrapper">
    <div className="content d-flex flex-column flex-column-fluid mb-0 py-0 mt-5"id="kt_content">
        <div className="container-xxl mb-0" id="kt_content_container">
        <div className="col-lg-12">
        <div className="card card-xxl-stretch mb-5 mb-xl-8">

<div className="card-header border-0 pt-5">
<h3 className="card-title align-items-start flex-column">
<span className="card-label fw-bold fs-3 mb-1"> Loan  Apply  Coustomer List</span>
<span className="text-muted mt-1 fw-semibold fs-7"></span>
</h3>

</div>


        <div className="card-body py-3">

<div className="table-responsive">

<table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

<thead>
<tr className="fw-bold text-muted th-title">


   
    <th className="min-w-125px">D-ID</th>
    <th className="min-w-125px">Customer Name</th>
    <th className="min-w-125px">Orgnization Name</th>
    <th className="min-w-125px">Loan Type</th>
    <th className="min-w-150px">Interest Rate</th>
    <th className="min-w-150px">EMI </th>
    <th className="min-w-100px">Total Amount</th>
    <th className="min-w-100px">Duration Year</th>
    <th className="min-w-100px">Total Interest Amount</th>
    <th className="min-w-100px ">Status</th>
    {/* <th className="min-w-100px text-end">Actions</th> */}
</tr>
</thead>

<tbody>
{loanlist.map((item) => 

<tr>

    
    <td>{item._id}</td>
    <td>{item.CustomerID.fullname}</td>
    <td>{item.OrganisationID.name}</td>
    <td>{item.Loan_type}</td>
    <td> {item.Interest_Rate} </td>
    <td> {item.EMI} </td>
    <td><span>{item.Total_Amount}</span> </td>
    <td>{item.Duration_Month}</td>
    <td>{item.Total_Interest_Amount}</td>
  
    <td>
    <td> {item.Loan_status=="PENDING"? <span class="badge badge-danger fs-5">{item.Loan_status}</span>:<span class="badge badge-light-info fs-5">{item.Loan_status}</span>}    </td> 
    </td>
    <td>
        <div className="d-flex justify-content-end flex-shrink-0">
            
        <button onClick={(e) =>{handleView(item._id)}}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </button>
        </div>
    </td>
</tr>
)}

</tbody>

</table>

</div>

{/* <div className="col-lg-12 mt-2 text-end">
<ReactPaginate
previousLabel={"previous"}
nextLabel={"next"}
breakLabel={"..."}
pageCount={pageCount}
marginPagesDisplayed={2}
pageRangeDisplayed={3}
onPageChange={handlePageClick}
containerClassName={"pagination justify-content-end"}
pageClassName={"page-item"}
pageLinkClassName={"page-link"}
previousClassName={"page-item"}
previousLinkClassName={"page-link pagestyle"}
nextClassName={"page-item"}
nextLinkClassName={"page-link"}
breakClassName={"page-item"}
breakLinkClassName={"page-link"}
activeClassName={"active"}
/>
</div> */}




</div>
</div>
</div>



        </div>
    </div>
</div>


    
    
    
    
    
    
    
    </>
  )
}
