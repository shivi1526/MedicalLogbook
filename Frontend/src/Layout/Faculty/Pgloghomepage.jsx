import React,{useState} from 'react'
import CreateTaskPglogbook from './CreateTaskPglogbook';
import LogoNav from '../../Components/Admin/LogoNav'
import FacultyNavbar from '../../Components/Faculty/FacultyNavbar';
import Dashboardpglog from './Dashboardpglog';
const Pgloghomepage = () => {
    const [showcreatetask, setshowcreatetask] = useState(false);
    const [showDashboardpglog, setshowDashboardpglog]=useState(false);

    const handleOptions = (component) => {
      if (component === "Createtask") {
        setshowcreatetask(true);
        setshowDashboardpglog(false);
      }else if(component === "Dashboardpglog"){
        setshowcreatetask(false);
        setshowDashboardpglog(true);
      }
    };
  return (
    <section>
      <LogoNav/>
      <FacultyNavbar/>
      
      <div className="fixed h-full">
        <nav className="sideb h-83vh flex flex-col bg-blue-950">
          <button onClick={() => handleOptions("Dashboardpglog")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-chalkboard p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Dashboard</p>
          </button>
        
          <button onClick={() => handleOptions("Createtask")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i class="fa-solid fa-list-check" style={{ color: "#ffffff" }}/>
            <p className="relative top-2 text-base">&nbsp;Create Task</p>
          </button>
          
          </nav>
          
      </div>
      {showcreatetask && <CreateTaskPglogbook/>}
      {showDashboardpglog && <Dashboardpglog/>} 
    </section>
  )
}

export default Pgloghomepage