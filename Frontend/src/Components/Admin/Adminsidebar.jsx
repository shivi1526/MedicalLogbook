import React, { useState } from "react";
import "../Style/style.css";
import Button from "react-bootstrap/Button";
import "../../Components/Style/samp.css";

const AddFaculty = () => {
  return <div>Faculty</div>;
};

const AddStudent = () => {
  return <div>Student</div>;
};

const Adminsidebar = () => {
  const [showFacultyOptions, setShowFacultyOptions] = useState(false);
  const [showStudentOptions, setShowStudentOptions] = useState(false);

  const toggleFacultyOptions = () => {
    setShowFacultyOptions(!showFacultyOptions);
    setShowStudentOptions(false);
  };

  const toggleStudentOptions = () => {
    setShowStudentOptions(!showStudentOptions);
    setShowFacultyOptions(false);
  };

  return (
    <div className="container">
      <div className="side-bar">
        <nav className="left-navbar">
          <button className="sidelink" onClick={toggleFacultyOptions}>
            Student
          </button>
          {showFacultyOptions && (
            <div>
              <button
                className="sidebaritem"
                onClick={() => console.log("Add / Edit Student clicked")}
              >
                Add / Edit Student
              </button>
              <button
                className="sidebaritem"
                onClick={() => console.log("Search Student clicked")}
              >
                Search Student
              </button>
            </div>
          )}

          <button className="sidelink" onClick={toggleStudentOptions}>
            Faculty
          </button>
          {showStudentOptions && (
            <div >
              <button 
              className="sidebaritem"
              onClick={() => console.log("Add / Edit Faculty clicked")}>
                Add / Edit Faculty
              </button>
              <button
              className="sidebaritem"
              onClick={() => console.log("Search Faculty clicked")}>
                Search Faculty
              </button>
            </div>
          )}

          {showFacultyOptions && <AddFaculty />}
          {showStudentOptions && <AddStudent />}
        </nav>
      </div>
    </div>
  );
};

export default Adminsidebar;
