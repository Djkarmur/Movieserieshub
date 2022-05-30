const useGenre = (selectedgenres)=>{
   if(selectedgenres.length <1) return "";
   
   const genreid = selectedgenres.map((c)=>(c.id))
   return  genreid.reduce((acc,cur)=>  acc + "," + cur);
   
// let clone =[...selectedgenres]

// return clone.join() 
 
}
export default useGenre;