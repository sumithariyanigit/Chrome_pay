import React from "react";


const Check_box_malti = (props) =>{

        return  <div className="col-lg-6">
                        <div className="card-detail">
                        <div className="switch-toggle bg-white">
                            <label>
                            <h6>{props.item_name}  { props.myselect}</h6>
                            <div className="switch">
           {(props.myselect > 0)?  <input type="checkbox"
                                  name= 'chack_val[]' multiple value={props.id}
                                  checked />  : <input type="checkbox"
                                   name= 'chack_val[]' multiple value={props.id}
                              /> }                    
                                <span className="slider round"></span>
                            </div>
                            </label>
                        </div>
                        </div>
                    </div> 
}

export default Check_box_malti ;


