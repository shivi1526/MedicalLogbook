import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextareaAutosize from "react-textarea-autosize";

const CreateTaskPglogbook = () => {
  const [studentCount, setStudentCount] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [formData, setFormData] = useState({
    Task_ID: "",
    Task_Name: "",
    Task_Description: "",
    start_Date: "",
    End_Date: "",
    Submit_Time: "",
    Students: [],
  });

  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleStartDateChange = (date) => {
    const formattedDate = date.toLocaleDateString();
    //console.log(formattedDate)
    setStartDate(formattedDate);
    setFormData({ ...formData, start_Date: formattedDate });
  };

  const handleEndDateChange = (date) => {
    // const formattedDate = date.toLocaleDateString();
    const formattedDate = date.toLocaleDateString();
    console.log(formattedDate)
    setEndDate(formattedDate);
    setFormData({ ...formData, End_Date: formattedDate });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/faculty/saveandemailtask", formData);
      console.log(response.data);
      alert("Task created successfully");
      setFormData({
        Task_ID: "",
        Task_Name: "",
        Task_Description: "",
        start_Date: "",
        End_Date: "",
        Submit_Time: "",
        Students: [],
      });
      setStudentCount(1);
      // Optionally, clear form data or perform other actions upon successful submission
    } catch (error) {
      console.error("Error:", error.response); // Log the error response for debugging
      // alert("Failed to create task. Please try again.");
    }
  };

  const handleAddStudent = () => {
    setStudentCount((prevCount) => prevCount + 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      students: [...prevFormData.Students, { Regno: "", Name: "" }],
    }));
  };

  const handleRemoveStudent = () => {
    if (studentCount > 1) {
      setStudentCount((prevCount) => prevCount - 1);
      setFormData((prevFormData) => ({
        ...prevFormData,
        students: prevFormData.Students.slice(0, -1),
      }));
    }
  };

  const handleStudentInputChange = (e, index, field) => {
    const { value } = e.target;

    const updatedStudents = [...formData.Students];

    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      Students: updatedStudents,
    });
  };



  return (
    <section className="fixed">
      <div className="fixed flex left-5 top-32 ml-50 w-auto">
        <button className="bg-sky-500 rounded-md w-auto text-lg" onClick={handleSubmit}>
          Create Task
        </button>
      </div>
      <div className="fixed p-4 flex left-5 ml-50 top-45 flex-wrap w-fit border-sky-500 border-3 rounded-md bg-gray-200">
        <form onSubmit={handleSubmit} className="overflow-auto">
          <div className="flex mb-1 gap-10">
            <label className="block text-gray-700 font-bold mb-2 text-start">
              Task ID
              <input
                type="text"
                id="TaskID"
                className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleInputChange(e, "Task_ID")}
                value={formData.Task_ID}
              />
            </label>
            <label className="block text-start text-gray-700 font-bold mb-2">
              Task Name
              <input
                type="text"
                id="TaskName"
                className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.Task_Name}
                onChange={(e) => { handleInputChange(e, "Task_Name") }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-start text-gray-700 font-bold mb-2">
              Task Description
              <TextareaAutosize
                id="Description"
                placeholder="Enter Task Description Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none min-h-10 focus:shadow-outline"
                value={formData.Task_Description}
                onChange={(e) => { handleInputChange(e, "Task_Description") }}
              />
            </label>
          </div>

          <div className="flex justify-center gap-10 mb-4">
            <label className="block text-start text-gray-700 font-bold mb-2">
              Start Date
              <br />
              <DatePicker
                value={startDate}
                onChange={handleStartDateChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label className="block text-start text-gray-700 font-bold mb-2">
              End Date
              <br />
              <DatePicker
                value={endDate}
                onChange={handleEndDateChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>

            <label className="block text-start text-gray-700 font-bold mb-2">
              Submit Before
              <br />
              <input
                id="submittime"
                type="time"
                className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.Submit_Time}
                onChange={(e) => { handleInputChange(e, "Submit_Time") }}
              />
            </label>
          </div>

          <div className=" flex justify-center gap-10 pb-3">
            <button
              type="button"
              onClick={handleAddStudent}
              className="bg-blue-500 text-base rounded-md w-auto"
            >
              Add Student
            </button>
            <button
              type="button"
              onClick={handleRemoveStudent}
              className="bg-blue-500 text-base  rounded-md w-auto"
            >
              Remove Student
            </button>
          </div>
          {/* Dynamic Roll number and student name input fields */}
          <div className="overflow-auto max-h-40 mb-3">
            <div className=" w-auto">
              {[...Array(studentCount)].map((_, index) => (
                <div key={index} className="flex justify-center gap-10  overflow-auto">
                  <label
                    htmlFor={`subject${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Roll Number {index + 1}
                    <input
                      type="text"
                      id={`subject${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => handleStudentInputChange(e, index, "regno")}
                      value={formData.Students[index]?.regno || ""}
                    />
                  </label>
                  <label
                    htmlFor={`faculty${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Student Name {index + 1}
                    <input
                      type="text"
                      id={`faculty${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.Students[index]?.Name || ""}
                      onChange={(e) => handleStudentInputChange(e, index, "Name")}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTaskPglogbook;