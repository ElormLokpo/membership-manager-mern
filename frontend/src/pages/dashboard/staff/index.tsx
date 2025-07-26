
import { DashboardTable } from "./components/table"
import { DashboardTopNav } from "./components/topNav"

export const StaffPage = ()=>{
    return(
         <div className="h-screen w-full">
             <div className="mb-1">
               <DashboardTopNav title="Staff" />
             </div>
       
             <div className=" h-screen">
               <div className="">
               
                 <div>
                   <DashboardTable />
                 </div>
               </div>
       
              
             </div>
           </div>
    )
}