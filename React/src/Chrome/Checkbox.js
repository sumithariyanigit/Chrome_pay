import { useState } from "react"

 const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false)

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }
   
  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"

        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor="checkbox">I agree to Terms of Service </label>
      <p>The checkbox is {isChecked ? "checked" : "unchecked"}</p>
    </div>
  ////////////////////

//   <div className="col-lg-4 mb-2" key = {index}>
//   <div className="card-detail bg-white">
//     <div className="switch-toggle">
//       <label>
//         <h6>{item.name}</h6>
//         <div className="switch">
//          <input type="checkbox" multiple  name = 'checkStatus[]' />
      
//       <input type = 'hidden' multiple  name = 'features_ids[]'  value={item.fs_id} />
//           <span className="slider round"></span>
//         </div>
//       </label>
//     </div>
//   </div>
// </div>



  )
}


export default Checkbox;