import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import Swal from 'sweetalert2';
var jwt = require("jsonwebtoken");


function CommisionList() {

    const [data,setData]=useState([])
    const [pageCount, setpageCount] = useState('');
    const [menu ,setMenu] = useState([]);

    const limit = 10;
     
    let token = localStorage.getItem('token')
    var decode1  = jwt.decode(token);
    let adminID =decode1.admminID

    const AddFormData = async (e, page) => {
        e.preventDefault();
            const data = new FormData(e.target);
            const Formvlaues = Object.fromEntries(data.entries());
            const formData =  Formvlaues
            console.log(Formvlaues);
            axios.post(`/CustomerList`,formData)
            .then(resp =>{
                const data = resp.data.filter;
                setData(data);
                // console.warn(data);
                const total = resp.data.totlaRow
                console.log(total);
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
            })
            
    }
    



  const userlist = async () => {
        await axios.post(`/CustomerList`)
            .then(resp => {
                const data = resp.data.filter;
                setData(data)
                console.log(data);
                const total = resp.data.totlaRow
                console.log(total);
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
            })
    }
    useEffect(() => {
        userlist()
    }, [])

///////////////pagenestion///////////////
const fetchComments = async (page) => {
    const senData = { page: page }
    // const cosole = Fromvalue;
    // console.log(Fromvalue);
   axios.post(`/CustomerList`, senData)
        .then(resp => {
            const data = resp.data.filter;
            setData(data);
        })
    return data;
};

const handlePageClick = async (data) => {
    // console.log(data.selected);
    const page = data.selected + 1;
    const commentsFormServer = await fetchComments(page);
    setData(commentsFormServer);
};


/////////////// unblocked  ////////////////////////
const  handleunblocked = (_id) =>
{
console.warn(_id);
axios.put(`/Unsuspendcustomer/${_id}/${adminID}`)
.then(res =>{
    if(res.status){
        let data = res.data;
        toast.success(data.msg);
        return userlist();
    }
})
}

// const handlesuspend = (_id) =>
// {
//     console.log(_id);
//     axios.put(`/suspendcustomer/${_id}/${adminID}`)
//     .then(res => {
//         if(res.status){
//             let data =res.data;
//             toast.success(data.msg);
//             return userlist();

//         }

//     })
// }
 /////////////////delete api call /////////////////
 const handlesuspend = (_id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to Suspend selected Customer ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Suspend it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.put(`/suspendcustomer/${_id}/${adminID}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Suspend!',
                             "Customer Suspend successfully",
                            'success'
                          )
                         return userlist();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
        }
      })
}


// const handledelete = (_id) => {
//     console.log(_id);
//     axios.delete(`/deleteCustomer/${_id}`)
//     .then(res =>{
//         if(res.status){
//             let data = res.data;
//             toast.success(data.msg);
//             return userlist();

//         }
//     })
// }
  /////////////////delete api call /////////////////
  const handledelete = (_id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to delete selected Customer ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/deleteCustomer/${_id}/${adminID}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             "Customer deleted successfully",
                            'success'
                          )
                         return userlist();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
        }
      })
}
const handleView = (_id) =>{
    console.log(_id)
    window.location = `/customer-view-admin/${_id}`;
    return false;  
}

const handleVerfiy = (_id) => {
    const {custID} = {custID : _id}
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to verify selected Customer ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, verify it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.post(`/customerVerify/${custID}/${adminID}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'verified!',
                             "Customer verified successfully",
                            'success'
                          )
                         return userlist();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
        }
      })
}

const subAdminlist = async () =>{
    await axios.post(`/subAdminRole/${adminID}`)
    .then(resp=>{
        let data = resp.data.find
        // console.log('@@@@@',data.customer.addCustomer)
        setMenu(data.customer);
        // setOrgMenu(data.Organisation)
        // setAgent(data.Agent)
        // setIP(data.IP)
    })

}



useEffect(() => {
    subAdminlist();
}, [])

    return (
        <>
        <ToastContainer/>
            <Sidebar />
            <Header />
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">

                    <div className="container-xxl" id="kt_content_container">
                        <div className="row g-5 g-xl-8">
                            <div className="col-lg-12">
                                <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover" style={{ marginTop: '2rem' }}>

                                    <div className="card-body container-xxl pt-10 pb-8">

                                        <div className="d-flex align-items-center">
                                            <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                            <span className="fw-semibold text-white opacity-50">Customers</span>
                                        </div>

                                        <div className="d-flex flex-column">

                                            <div className="d-lg-flex align-lg-items-center">
                                              <form onSubmit={(e) => AddFormData(e)}>
                                                <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body p-5  h-lg-60px me-lg-10 my-5">

                                                    <div className="row flex-grow-1 mb-5 mb-lg-0">


                                                        <div className="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="ID"
                                                                placeholder="Enter D-ID" />

                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-3 mb-lg-0">
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                                </svg>
                                                            </span>
                                                            <input type="text" className="form-control form-control-flush flex-grow-1" name="phone"
                                                                placeholder="Mobile Number" />

                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-5 mb-lg-0">
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
                                                            <select className="form-select border-0 flex-grow-1" name="status" data-control="select2"
                                                                data-placeholder="Category" data-hide-search="true">
                                                                <option defaultValue="" selected disabled>Status</option>
                                                                <option defaultValue="In Progress">In Progress</option>
                                                                <option defaultValue="Verified">Verified</option>
                                                                <option defaultValue="pending">pending</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-5 mb-lg-0">
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
                                                            <select className="form-select border-0 flex-grow-1" data-control="select2" data-placeholder="Category" data-hide-search="true" name="nationality">
                                                            <option value="" selected disabled>Country</option>
                                                                <option value="India">India</option>
                                                                <option value="USA">USA</option>
                                                                <option value="Uganda">Uganda</option>
                                                            </select>

                                                        </div>


                                                        <div className="col-lg-2 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                            <label className="small_label">Start Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="fromDate" placeholder="from Date.." />
                                                            <div className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                            <label className="small_label">End Date</label>
                                                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                <i className="fad fa-calendar fs-2"></i>
                                                            </span>
                                                            <input type="date" className="form-control unstyled form-control-flush flex-grow-1" name="toDate" placeholder="to Date.." />

                                                        </div>

                                                    </div>

                                                    <div className="min-w-150px d-flex">
                                                        <button type="submit" className="btn btn-dark" id="kt_advanced_search_button_1">Search</button>
                                                        <button type="reset" onClick={userlist} className="btn btn-secondary" id="kt_advanced_search_button_1">Reset</button>
                                                    </div>

                                                </div>

                                                </form>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-12">

                                <div className="card card-xxl-stretch mb-5 mb-xl-8">

                                    <div className="card-header border-0 pt-5">
                                        <h3 className="card-title align-items-start flex-column">
                                            <span className="card-label fw-bold fs-3 mb-1">Customers List</span>
                                            <span className="text-muted mt-1 fw-semibold fs-7"></span>
                                        </h3>

                                    </div>

                                    <div className="card-body py-3">

                                        <div className="table-responsive">

                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                                                <thead>
                                                    <tr className="fw-bold text-muted th-title">


                                                        <th className="min-w-125px">D-ID</th>
                                                        <th className="min-w-125px">Name</th>
                                                        <th className="min-w-150px">Email Address</th>
                                                        <th className="min-w-150px">Mobile No. </th>
                                                        <th className="min-w-100px">DOB</th>
                                                        <th className="min-w-100px">Date of Creation</th>
                                                        <th className="min-w-100px">Country</th>
                                                        <th className="min-w-100px ">Status</th>
                                                        <th className="min-w-100px text-end">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                     {data.map((item)=>
                                                    <tr>
                                                        <td>{item._id}</td>
                                                        <td> {item.fullname} </td>
                                                        <td> {item.email} </td>
                                                        <td><span>{item.phone}</span> </td>
                                                        
                                                        <td>{Moment(item.dateOfBirth).format("DD/MM//YYYY")}</td>
                                                        <td>{Moment(item.createdAt).format("DD/MM//YYYY")}</td>
                                                        <td><span class="badge badge-light-info fs-5">{item.nationality}</span></td>
                                                        <td>{item.status}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                           {menu.approveDID == 1 ?<>
                                                            {item.status == "pending" ? <>     
                                                            <button onClick={(e)=>{handleVerfiy(item._id)}}
                                                                    className="btn btn-icon btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Pendding ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        {/* <i className="fad fa-eye-slash"></i> */}
                                                                      
                                                                        <img src="/assets_new/images/pendding1.png" width="30px" />
                                                                    </span>

                                                                </button>
                                                                </>:
                                                                <>
                                                            <button onClick={(e)=>{handleVerfiy(item._id)}}
                                                                    className="btn btn-icon btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Verify">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        {/* <i className="fad fa-eye-slash"></i> */}
                                                                      
                                                                        <img src="/assets_new/images/verify.png" width="28px" />
                                                                    </span>

                                                                </button>
                                                                </>
                                                             }
                                                           </>:""}
                                                            
                                                            {menu.blockCustomer == 1 ? <><button  onClick={(e) => { handlesuspend(item._id); }}
                                                               className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                               data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Password Reset "
                                                               data-bs-trigger="hover" title="Suspend ">
                                                               <span className="svg-icon svg-icon-3">
                                                               <img src="/assets_new/images/blocked.png" width="20px" />
                                                               {/* <img src="/assets_new/images/suspand.png" width="20px" /> */}
                                                               </span>
                                                               </button></>
                                                               : ""}
                                                                
                                                               {/* <button  onClick={(e) => {  handleunblocked(item._id); }}
                                                               className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                               data-bs-toggle="tooltip" data-bs-placement="top" 
                                                               data-bs-trigger="hover" title=" ">
                                                               <span className="svg-icon svg-icon-3">
                                                                  <img src="/assets_new/images/blocked.png" width="20px" />
                                                               </span>
                                                               </button>  */}

                                                               
                                                                {menu.viewCustomer == 1 ?
                                                                <><button onClick={(e) => {handleView(item._id)}}
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </button></>:""}

                                                                {menu.deleteCustomer == 1 ? <><button onClick = {(e) => { handledelete(item._id) ;}}
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Delete">
                                                                    <span className="svg-icon svg-icon-3">
                                                                    <img src="/assets_new/images/cross.png" width="20px" />
                                                                    </span>

                                                                </button></>:""}
                                                                {menu.disableOtp == 1 ? <><a href='#'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Disable OTP">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye-slash"></i>
                                                                    </span>

                                                                </a></>:""}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                     )}
                                                    {/* <tr>
                                                        <td>##41e8bd3f3ca</td>
                                                        <td> Virendra Shilpkar </td>
                                                        <td> virendra@gmail.com </td>
                                                        <td><span>+221 123-456-7840</span> </td>
                                                        <td>05/06/1980</td>
                                                        <td>05/08/2020</td>
                                                        <td>Ethiopia</td>
                                                        <td>
                                                        <td><span class="badge badge-light-info fs-5">Verified</span></td> 
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-end flex-shrink-0">
                                                                <a href="#"
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Suspend ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-minus-circle fs-4"></i>
                                                                    </span>
                                                                </a>
                                                                <a href="#"
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Password Reset ">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fas fa-repeat-alt"></i>
                                                                    </span>
                                                                </a>
                                                                <a href='organization_detail.html'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="View Detail">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye fs-4"></i>
                                                                    </span>

                                                                </a>
                                                                <a href='#'
                                                                    className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Delete">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-trash-alt"></i>
                                                                    </span>

                                                                </a>
                                                                <a href='#'
                                                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                                    data-bs-trigger="hover" title="Disable OTP">
                                                                    <span className="svg-icon svg-icon-3">
                                                                        <i className="fad fa-eye-slash"></i>
                                                                    </span>

                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr> */}


                                                </tbody>

                                            </table>

                                        </div>
                                          
                                        <div className="col-lg-12 mt-2 text-end">
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
                                    </div>




                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default CommisionList