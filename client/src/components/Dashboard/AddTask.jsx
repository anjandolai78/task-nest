import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTask = ({ setAddTaskDiv, fetchUserDetails }) => {
  const defaultValues = {
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
    dueDate: "",
  };

  const [Values, setValues] = useState(defaultValues);

  //  Reset form every time 
  useEffect(() => {
    setValues(defaultValues);
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://task-nest-backend-2rr3.onrender.com/api/v1/addTask",
        Values,
        { withCredentials: true }
      );

      alert(res.data.success);

      // reset and close
      setValues(defaultValues);
      setAddTaskDiv("hidden");
      fetchUserDetails();
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  };

  
  const handleCancel = (e) => {
    e.preventDefault();
    setValues(defaultValues);
    setAddTaskDiv("hidden");
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />

      <form className="flex flex-col gap-4" onSubmit={submit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={Values.title}
          onChange={change}
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          required
        />

        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              value={Values.priority}
              onChange={change}
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              value={Values.status}
              onChange={change}
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={Values.description}
          onChange={change}
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
        ></textarea>
         <input
          type="date"
          name="dueDate"
          value={Values.dueDate}
          onChange={change}
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
        />
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="w-full bg-blue-800 py-2 text-white hover:bg-blue-700 transition-all duration-300 rounded"
          >
            Add Task
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;