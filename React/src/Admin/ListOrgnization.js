
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import {useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import Modal from "react-responsive-modal";
import { Button } from "react-bootstrap";
import moment from 'moment';
var jwt = require('jsonwebtoken');

const ListOrgnization = () => {

const [data, setData] = useState([]);
const [pageCount, setpageCount] = useState('');
const [orgmenu, setOrgMenu] = useState([]);
const [open, setOpen] = useState(false);
const [orgID2, setorgID2] = useState("");

const limit = 10;
let token = localStorage.getItem('token')
    var decode1  = jwt.decode(token);
    let adminID = decode1.admminID
const AddFormData = async (e, page) => {
    e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData =  Formvlaues
        console.log(Formvlaues);
            axios.post(`/OrganisationList`,formData)
            .then(resp =>{
                const data = resp.data.filter;
                setData(data)
                const total = resp.data.totlaRow
                console.log(total);
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
            })
        
}


    const userlist = async () => {
        await axios.post(`/OrganisationList`)
            .then(resp => {
                const data = resp.data.filter;
                setData(data)
                // console.log(data);
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
   axios.post(`/OrganisationList`, senData)
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
    
/////////////unblocked user api call ////////////
const handleunblocked = (_id) => 
{
console.log(_id);
  axios.put(`/unsuspend/${_id}`)
    .then(res => {
        if (res.status) {
               let data = res.data;
              toast.success(data.msg);
              return userlist();
            } 
        
    })
}

/////////////blocked user api call ////////////
// const handlesuspend = (_id) => 
// {
// axios.put(`/suspend/${_id}`)
// .then(res => {
//     if (res.status) {
//         let data = res.data;
//           toast.success(data.msg);
//           return  userlist();
//         } 
// })
// }
/////////////Delete orgnization api Call///////

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
            axios.put(`/suspend/${_id}`)
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
// const handledelete =(_id) => 
// {

// axios.delete(`/deleteOrganization/${_id}`)
// .then(res =>{
//     if(res.status){
//         let data = res.data;
//         toast.success(data.msg);
//         return userlist();
//     }
// })
// }
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
            axios.delete(`/deleteOrganization/${_id}`)
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
    // console.log(_id)
    window.location =`/organzation-view-admin/${_id}`;
    return false;
}
const handleVerfiy = (_id) => {
    const {orgID} = {orgID : _id}
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
            axios.post(`/orgVerify/${orgID}/${adminID}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'verified!',
                             "organisation verified successfully",
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


const handleUserView =(_id) =>{
    console.log(_id);
    window.location =`/user-customer-view/${_id}`;
    return false;
}






// add admin license


const Addlicense = (_id)=>{
  console.log(_id)

}


// add document function
const Adddocument=()=>{
    alert("hello");
}

const subAdminlist = async () =>{
    await axios.post(`/subAdminRole/${adminID}`)
    .then(resp=>{
        let data = resp.data.find
        // console.log('@@@@@',data.customer.addCustomer)
        // setMenu(data.customer);
        setOrgMenu(data.Organisation)
        // setAgent(data.Agent)
        // setIP(data.IP)
    })

}



useEffect(() => {
    subAdminlist();
}, [])


const onOpenModal = (orgID) => 
    {
        setOpen(true);
   
        console.log(orgID);
       
        setorgID2(orgID)
    
    }

const onCloseModal = () => setOpen(false);

const UpdateFormData = async (e)=>{
    e.preventDefault();

    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    const formData =Formvlaues;
 
  //   alert(orgID2);
    axios.post(`/add_Licenses/${orgID2}`,formData )
    .then(resp =>{
      // console.log("api is work hhhhhhhhhhhhhhhhhhhhhhhh",resp.data);
      let data1 = resp.data;
       if(data1.status){
          toast.success(data1.msg);
              setOpen(false);
              
          // let data = resp.data.update
          // if(data.status){
          //     toast.success(data.msg);
          //     setOpen(false);

          // }else{
          //     toast.error(data.msg);
          // }
       }else{
          toast.error(data1.msg);

      }
    }).catch(error=>console.log("api errrorllllllllllllllllllll",error));


}




    return (
    
    <div>
        <ToastContainer/>
       <Header/>
       <Sidebar/>
        <div className="d-flex flex-column flex-root">

            <div className="page d-flex flex-row flex-column-fluid">
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">


                        <div className="container-xxl" id="kt_content_container">

                            <div className="row g-5 g-xl-8">

                                <div className="col-lg-12">
                                    {/* style="background-color: #2c486d;background-size: auto 100%; background-image: url(assets_new/images/taieri.svg)" */}
                                    <div className="card bg_card rounded-15 bgi-no-repeat bgi-position-x-end bgi-size-cover">

                                        <div className="card-body container-xxl pt-10 pb-8">

                                            <div className="d-flex align-items-center">
                                                <h1 className="fw-semibold me-3 text-white">Filter</h1>
                                                <span className="fw-semibold text-white opacity-50">
                                                    Organization List
                                                </span>
                                            </div>

                                            <div className="d-flex flex-column">

                                                <div className="d-lg-flex align-lg-items-center">
                                                <form  onSubmit={(e) => AddFormData(e)}>
                                                        <div className="rounded d-flex flex-column flex-lg-row align-items-lg-center bg-body w-xxl-850px  me-lg-10 my-5">

                                                            <div className="row flex-grow-1 mb-5 mb-lg-0 h-lg-60px">

                                                                <div
                                                                    className="col-lg-4 d-flex input-container align-items-center mb-3  mb-lg-0">
                                                                    <label className="small_label">Start Date</label>
                                                                    <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                        <i className="fad fa-calendar fs-2"></i>
                                                                    </span>
                                                                    <input type="date"
                                                                        className="form-control unstyled form-control-flush flex-grow-1"
                                                                        name="fromDate" placeholder="User Name.." />
                                                                    <div
                                                                        className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className="col-lg-4 d-flex align-items-center mb-3 input-container mb-lg-0">
                                                                    <label className="small_label">End Date</label>
                                                                    <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                        <i className="fad fa-calendar fs-2"></i>
                                                                    </span>
                                                                    <input type="date"
                                                                        className="form-control unstyled form-control-flush flex-grow-1"
                                                                        name="toDate" placeholder="User Name.." />

                                                                </div>





                                                                <div className="col-lg-4 d-flex align-items-center mb-5 mb-lg-0">
                                                                    <div
                                                                        className="bullet bg-secondary d-none d-lg-block h-30px w-2px me-5">
                                                                    </div>
                                                                    <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24"
                                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <rect x="2" y="2" width="9" height="9" rx="2"
                                                                                fill="currentColor" />
                                                                            <rect opacity="0.3" x="13" y="2" width="9"
                                                                                height="9" rx="2" fill="currentColor" />
                                                                            <rect opacity="0.3" x="13" y="13" width="9"
                                                                                height="9" rx="2" fill="currentColor" />
                                                                            <rect opacity="0.3" x="2" y="13" width="9"
                                                                                height="9" rx="2" fill="currentColor" />
                                                                        </svg>
                                                                    </span>
                                                                    <select className="form-select border-0 flex-grow-1"
                                                                        data-control="select2" data-placeholder="Status"
                                                                        data-hide-search="true" name='status'>
                                                                        <option value=""></option>
                                                                        <option value="1" selected="selected">Category</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="Confirmed">Confirmed</option>
                                                                        <option value="verify">verify</option>
                                                                    </select>

                                                                </div>

                                                            </div>

                                                            <div className="min-w-150px text-center">
                                                                <button type="submit" className="btn btn-dark"
                                                                    id="kt_advanced_search_button_1">Search</button>
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
            <span className="card-label fw-bold fs-3 mb-1">Organization List</span>
            <span className="text-muted mt-1 fw-semibold fs-7">Over 50 Organization </span>
        </h3>

    </div>

    <div className="card-body py-3">

        <div className="table-responsive">

            <table
                className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">

                <thead>
                    <tr className="fw-bold text-muted th-title">
                        <th className="min-w-100px">Image</th>
                        <th className="min-w-150px">Code</th>
                        <th className="min-w-150px">Organization </th>
                        <th className="min-w-150px">Country</th>
                        <th className="min-w-150px">Date of Creation    </th>
                        <th className="min-w-150px ">Status</th>
                        <th className="min-w-150px ">Number of Users</th>
                        <th className="min-w-150px text-end">Action</th>
                    </tr>
                </thead>

                <tbody>

                    {data.map((item)=>
                    <tr>
                        <td><img src={item.logo} width="100px" /></td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.country}</td>
                        <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                         <td><span className="badge badge-light-pending fs-5">{item.status}</span>
                        </td>
                       
                        <td>0</td>


                        <td>
                            <div className="d-flex justify-content-end flex-shrink-0">
                            <button onClick={(e)=>{ handleUserView(item._id)}}
                                    className="btn btn-icon  btn-active-color-primary btn-sm me-1 mr-4"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-trigger="hover" title="Customer View">
                                    <span className="svg-icon svg-icon-3">
                                        {/* <i className="fad fa-eye-slash"></i> */}
                                        <img src="/assets_new/images/usercustomer.png" width="30px" />
                                    </span>
                            </button>
                        
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
                            
                                                               {/* <button  onClick={(e) => {  handleunblocked(item._id); }}
                                                               className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                               data-bs-toggle="tooltip" data-bs-placement="top" 
                                                               data-bs-trigger="hover" title="Delete ">
                                                               <span className="svg-icon svg-icon-3">
                                                                  <img src="/assets_new/images/blocked.png" width="20px" />
                                                               </span>
                                                               </button>  */}

                                                            
                                                            {orgmenu.blockorganisation == 1 ? <><button  onClick={(e) => { handlesuspend(item._id); }}
                                                               className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                               data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Password Reset "
                                                               data-bs-trigger="hover" title="Suspend ">
                                                               <span className="svg-icon svg-icon-3">
                                                               {/* <img src="/assets_new/images/suspand.png" width="20px" /> */}
                                                               <img src="/assets_new/images/blocked.png" width="20px" />
                                                               </span>
                                                               </button></>:""}
                                                               
                                                               






                               
                                <button onClick= {(e) => {handleView(item._id)}}
                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-trigger="hover" title="View Detail">
                                    <span className="svg-icon svg-icon-3">
                                        <i className="fad fa-eye fs-4"></i>
                                    </span>

                                </button>
                                {/* added driving-license new button */}

                                
                                <button onClick={(e)=>{ onOpenModal(item._id)}}
                                    className="btn btn-icon  btn-active-color-primary btn-sm me-1 mr-4"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-trigger="hover" title="Add Licenses">
                                    <span className="svg-icon svg-icon-3">
                                        {/* <i className="fad fa-eye-slash"></i> */}
                                        <img src="\assets\images\driving-license.png" width="30px" height="50px" />
                                    </span>
                            </button>

                            {orgmenu.deleteOrganisation == 1 ? <><button  onClick={(e) => { handledelete(item._id); }}
                                                               className="btn btn-icon btn-danger1 btn-active-color-primary btn-sm me-1 mr-4"
                                                               data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Password Reset "
                                                               data-bs-trigger="hover" title="Delete ">
                                                               <span className="svg-icon svg-icon-3">
                                                               <img src="/assets_new/images/cross.png" width="20px" />
                                                               </span>
                                                               </button></>:"" }
                                

                                <a href='#'
                                    className="btn btn-icon btn-detail btn-active-color-primary btn-sm me-1 mr-4"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-trigger="hover" title="Disable OTP">
                                    <span className="svg-icon svg-icon-3">
                                        <i className="fad fa-eye-slash"></i>
                                    </span>

                                </a>




                                {/* add document button */}

                                <Link to={`/Add_admin_document/${item._id}`}>
                                <button 
                                    className="btn btn-icon  btn-active-color-primary btn-sm me-1 mr-4"
                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-trigger="hover" title="Add Licenses">
                                    <span className="svg-icon svg-icon-3">
                                        {/* <i className="fad fa-eye-slash"></i> */}
                                        <img src="\assets\images\document.png" width="30px" />
                                    </span>
                            </button>
                            </Link>
                            </div>
                        </td>
                    </tr>
                     )}
                    {/* <tr>
                         <td><img src="/assets_new/images/ide.png" width="60px" /></td>
                        <td>ZXUDAC</td>
                        <td>Ide</td>
                        <td>Ethiopia</td>
                        <td>18/02/2018</td>


                       
                         <td><span className="badge badge-light-info fs-5">Confirmed</span>
                        </td>
                    
                        <td>505433</td>


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

                                    <Modal open={open} onClose={onCloseModal} center>
                                                      <h2 className="mb-4 text-white">Update Tips & Tricks</h2>
                                                    <div className="mx-500">
                                                        <form className="mt-3 w-100"  onSubmit={(e) => UpdateFormData(e)}>
                                                        <div className="form-group mb-4">

                                                        <label className="title-col"> Organisation </label>
                                                          {/* <input type="hidden" className="form-control" name="id" defaultValue={catView._id} /> */}
                                                
                                                          {/* <input type="text" autoComplete="off" className="form-control" name="tips_trick" defaultValue="" />  */}
                                                          </div>

                                                          <label className="title-col"> Add Licenses</label>
                                                          <input type="number" id="Licenses" autoComplete="off"  className="form-control mb-4" name="Licenses"
                                                       
                                                        />

                                                            <div className="mt-3 mb-3">
                                                             <Button type='submit' className="mr-3 btn-pd btnBg">Update</Button>
                                                                </div>
                                                        </form>
                                                    </div>
                                                </Modal>
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


            );
}

            

export default ListOrgnization