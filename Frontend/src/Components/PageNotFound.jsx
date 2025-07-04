import React from 'react'
import { useNavigate,  } from 'react-router-dom'
const PageNotFound = () => {
  
  
  const navigate = useNavigate();
    return (
  <>

    <div>404 PageNotFound</div>
    <button onClick={()=>{navigate('/')}}>Redirect</button>
 </> 
 )

}

export default PageNotFound