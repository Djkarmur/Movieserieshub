import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const CustPagination = ({setpage,numofpage}) => {
  const HandlePageChange =(page) =>{
    setpage(page);
    window.scroll(0,0);
    
  }
  return (
    <div style={{
      width:'100%',
      display:"flex",
      justifyContent:"center",
      marginTop:"10",
      color:'azure'
    }}>
        <Pagination onChange={(e)=>HandlePageChange(e.target.textContent)} count={numofpage} color="primary"
        hideNextButton
        hidePrevButton
        />
       
    </div>
  )
}

export default CustPagination
