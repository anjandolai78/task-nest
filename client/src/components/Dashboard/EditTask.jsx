import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ setEditTaskDiv, EditTaskId, fetchUserDetails }) => {
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
    if (!EditTaskId) {
      setValues(defaultValues);
    }
  }, []); 

  // Fetch task when editing
  useEffect(() => {
    if (EditTaskId) {
      const fetch = async () => {
        try {
          const res = await axios.get(
            `http://localhost:1000/api/v1/getTask/${EditTaskId}`,
            { withCredentials: true }
          );

          setValues({
            title: res.data.taskDetails.title || "",
            description: res.data.taskDetails.description || "",
            priority: res.data.taskDetails.priority || "low",
            status: res.data.taskDetails.status || "yetToStart",
            dueDate: res.data.taskDetails.dueDate
    ?        res.data.taskDetails.dueDate.split("T")[0]
            : "",
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetch();
    }
  }, [EditTaskId]);

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const url = EditTaskId
        ? `http://localhost:1000/api/v1/editTask/${EditTaskId}`
        : `http://localhost:1000/api/v1/addTask`;

      const res = await axios({
        method: EditTaskId ? "put" : "post",
        url,
        data: Values,
        withCredentials: true,
      });

      alert(res.data.success);

      setValues(defaultValues);
      setEditTaskDiv("hidden");
      window.sessionStorage.removeItem("editTaskId");
      fetchUserDetails();
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  };

  const deleteTask = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:1000/api/v1/deleteTask/${EditTaskId}`,
        { withCredentials: true }
      );

      alert(res.data.success);

      setValues(defaultValues);
      setEditTaskDiv("hidden");
      window.sessionStorage.removeItem("editTaskId");
      fetchUserDetails();
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setValues(defaultValues);
    setEditTaskDiv("hidden");
    window.sessionStorage.removeItem("editTaskId");
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">
        {EditTaskId ? "Edit Task" : "Add Task"}
      </h1>
      <hr className="mb-4 mt-2" />

      <form className="flex flex-col gap-4" onSubmit={editTask}>
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
          <input
  type="date"
  name="dueDate"
  value={Values.dueDate}
  onChange={change}
  className="border px-2 py-1 rounded border-zinc-300 outline-none"
/>
        <textarea
          name="description"
          placeholder="Description"
          value={Values.description}
          onChange={change}
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
        ></textarea>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="w-full bg-blue-800 py-2 text-white hover:bg-blue-700 transition-all duration-300 rounded"
          >
            {EditTaskId ? "Update Task" : "Add Task"}
          </button>

          {EditTaskId && (
            <button
              type="button"
              onClick={deleteTask}
              className="w-full border border-red-600 text-red-600 py-2 hover:bg-red-100 transition-all duration-300 rounded"
            >
              Delete Task
            </button>
          )}

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

export default EditTask;