
import  React, { useState } from 'react';
import Select from 'react-select'



function Risk_assessment_drop() {
   
    const high ="red";
    const medium ="#f77a04";
    const low ="#008000" 

   
    const  optionColor =[
    {
        value:high,    
        label:"High",  
    },
    {
        value:medium, 
        label:"Medium"
    },
   
    {
        value:low, 
        label:"Low"
    },
   ];


    //const [setbgcolor, ddllabel] = useState(optionColor.value)
    const [setbgcolor, ddllabel] = useState('red');
    const ddlhandle = e =>
    {
     ddllabel(e.value);
    }
 
    return (
   
        <>
        <style>{'.css-319lph-ValueContainer{background-color:'+setbgcolor+';}'}</style>
        <Select options={optionColor}  onChange={ddlhandle}></Select>
        </>

            );
        }
        
export default Risk_assessment_drop;