// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "../components/Dashboard/Header";
// import AddTask from "../components/Dashboard/AddTask";
// import EditTask from "../components/Dashboard/EditTask";
// import StackTitle from "../components/Dashboard/StackTitle";
// import YetToStart from "../components/Dashboard/YetToStart";
// import InProgress from "../components/Dashboard/InProgress";
// import Completed from "../components/Dashboard/Completed";

//  const backendUrl = "https://task-nest-backend-2rr3.onrender.com";

// const Dashboard = () => {
//   const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
//   const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
//   const [EditTaskId, setEditTaskId] = useState(null);
//   const [Tasks, setTasks] = useState();

//   // Search , Filter , Sort state
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortOrder, setSortOrder] = useState("none");

//   // Fetch tasks WITH TOKEN
//   const fetchUserDetails = async () => {
//     try {
//       const res = await axios.get(
//       `${backendUrl}/api/v1/userDetails`,
//       { withCredentials: true }  
//       );
     
//       setTasks(res.data.tasks);
//     } catch (error) {
//       console.log("Error fetching tasks:", error);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchUserDetails();
//     const editId = window.sessionStorage.getItem("editTaskId");
//     if (editId) {
//       setEditTaskDiv("block");
//       setEditTaskId(editId);
//     }
//   }, []);

//   // Calculate task count
//   const totalTasks =
//     (Tasks?.[0]?.yetToStart?.length || 0) +
//     (Tasks?.[1]?.inProgress?.length || 0) +
//     (Tasks?.[2]?.completed?.length || 0);

//   const completedTasks = Tasks?.[2]?.completed?.length || 0;
//   const pendingTasks =
//     (Tasks?.[0]?.yetToStart?.length || 0) +
//     (Tasks?.[1]?.inProgress?.length || 0);

//   // Filter and sort tasks
//   const filterAndSortTasks = (tasksArray) => {
//     if (!tasksArray) return [];

//     let filtered = [...tasksArray];

//     // Search
//     if (searchTerm) {
//       filtered = filtered.filter((task) =>
//         task.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(
//         (task) => task.status === statusFilter
//       );
//     }

//     // Sort
//     if (sortOrder !== "none") {
//       filtered.sort((a, b) => {
//         if (!a.dueDate) return 1;
//         if (!b.dueDate) return -1;

//         return sortOrder === "asc"
//           ? new Date(a.dueDate) - new Date(b.dueDate)
//           : new Date(b.dueDate) - new Date(a.dueDate);
//       });
//     }

//     return filtered;
//   };

//   return (
//     <div className="w-full relative">
//       {/* Header */}
//       <div className="bg-white">
//         <Header
//           setAddTaskDiv={(val) => {
//             setEditTaskId(null);
//             setAddTaskDiv(val);
//           }}
//         />
//       </div>

//       {/* Stats */}
//       {Tasks && (
//         <div className="px-12 py-4 flex gap-4 bg-zinc-100">
//           <div className="flex-1 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow text-center">
//             <h3 className="text-sm font-medium">Total Tasks</h3>
//             <p className="text-lg font-semibold">{totalTasks}</p>
//           </div>
//           <div className="flex-1 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-center">
//             <h3 className="text-sm font-medium">Completed</h3>
//             <p className="text-lg font-semibold">{completedTasks}</p>
//           </div>
//           <div className="flex-1 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-center">
//             <h3 className="text-sm font-medium">Pending</h3>
//             <p className="text-lg font-semibold">{pendingTasks}</p>
//           </div>
//         </div>
//       )}

//       {/* Search + Filter + Sort */}
//       <div className="px-12 py-2 flex gap-4 items-center bg-zinc-100">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border border-zinc-300 rounded px-2 py-1 outline-none w-1/3"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border border-zinc-300 rounded px-2 py-1 outline-none"
//         >
//           <option value="all">All Status</option>
//           <option value="yetToStart">Yet To Start</option>
//           <option value="inProgress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="border border-zinc-300 rounded px-2 py-1 outline-none"
//         >
//           <option value="none">Sort by Due Date</option>
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       {/* Columns */}
//       <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh]">
//         <div className="w-1/3">
//           <StackTitle title={"Yet To Start"} />
//           <YetToStart
//             task={filterAndSortTasks(Tasks?.[0]?.yetToStart)}
//             setEditTaskDiv={setEditTaskDiv}
//             setEditTaskId={setEditTaskId}
//           />
//         </div>

//         <div className="w-1/3">
//           <StackTitle title={"In Progress"} />
//           <InProgress
//             task={filterAndSortTasks(Tasks?.[1]?.inProgress)}
//             setEditTaskDiv={setEditTaskDiv}
//             setEditTaskId={setEditTaskId}
//           />
//         </div>

//         <div className="w-1/3">
//           <StackTitle title={"Completed"} />
//           <Completed
//             task={filterAndSortTasks(Tasks?.[2]?.completed)}
//             setEditTaskDiv={setEditTaskDiv}
//             setEditTaskId={setEditTaskId}
//           />
//         </div>
//       </div>

//       {/* Add Task Modal */}
//       <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
//       <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
//         <AddTask setAddTaskDiv={setAddTaskDiv} fetchUserDetails={fetchUserDetails} />
//       </div>

//       {/* Edit Task Modal */}
//       <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
//       <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
//         <EditTask
//           key={EditTaskId || "new"}
//           EditTaskId={EditTaskId}
//           setEditTaskDiv={(val) => {
//             setEditTaskDiv(val);
//             if (val === "hidden") setEditTaskId(null);
//           }}
//           fetchUserDetails={fetchUserDetails}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

// Dashboard Components
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import EditTask from "../components/Dashboard/EditTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";

const backendUrl = "https://task-nest-backend-2rr3.onrender.com";

const Dashboard = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
  const [EditTaskId, setEditTaskId] = useState(null);
  const [Tasks, setTasks] = useState();

  // Search, Filter, Sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  // Fetch tasks
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/userDetails`,
        { withCredentials: true }  
      );
      setTasks(res.data.tasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUserDetails();
    const editId = window.sessionStorage.getItem("editTaskId");
    if (editId) {
      setEditTaskDiv("block");
      setEditTaskId(editId);
    }
  }, []);

  // Calculate task counts
  const totalTasks =
    (Tasks?.[0]?.yetToStart?.length || 0) +
    (Tasks?.[1]?.inProgress?.length || 0) +
    (Tasks?.[2]?.completed?.length || 0);

  const completedTasks = Tasks?.[2]?.completed?.length || 0;
  const pendingTasks =
    (Tasks?.[0]?.yetToStart?.length || 0) +
    (Tasks?.[1]?.inProgress?.length || 0);

  // Filter and sort tasks
  const filterAndSortTasks = (tasksArray) => {
    if (!tasksArray) return [];

    let filtered = [...tasksArray];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (task) => task.status === statusFilter
      );
    }

    // Sort
    if (sortOrder !== "none") {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return sortOrder === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      });
    }

    return filtered;
  };

  return (
    // Update 1: Main background changed to light gray
    <div className="w-full relative bg-gray-50 min-h-screen">
      
      {/* Update 2: Header section remains white with shadow */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <Header
          setAddTaskDiv={(val) => {
            setEditTaskId(null);
            setAddTaskDiv(val);
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        
        {/* Update 3: Stats Section refactored to specific design */}
        {Tasks && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Tasks */}
            <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm flex items-center gap-5">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Tasks</p>
                <p className="text-3xl font-black text-slate-800">{totalTasks}</p>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm flex items-center gap-5">
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Completed</p>
                <p className="text-3xl font-black text-slate-800">{completedTasks}</p>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white p-6 rounded-xl border border-yellow-300 shadow-sm flex items-center gap-5">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending</p>
                <p className="text-3xl font-black text-slate-800">{pendingTasks}</p>
              </div>
            </div>
          </div>
        )}

        {/* Update 4: Search + Filter Bar section made white and distinct */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-none bg-gray-50 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/10 text-sm"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 md:flex-none border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white font-medium text-gray-600 outline-none"
            >
              <option value="all">All Status</option>
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="flex-1 md:flex-none border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white font-medium text-gray-600 outline-none"
            >
              <option value="none">Sort by Due Date</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Update 5: Main Kanban Area refactored to separate columns */}
        <div className="flex flex-col md:flex-row gap-8 items-start min-h-[70vh]">
          
          {/* Column 1 - Gray backdrop */}
          <div className="w-full md:w-1/3 bg-gray-100/50 p-4 rounded-2xl border border-gray-200/60 min-h-[600px]">
            <div className="mb-4 px-2 flex items-center justify-between">
                <StackTitle title={"Yet To Start"} />
                <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {Tasks?.[0]?.yetToStart?.length || 0}
                </span>
            </div>
            <YetToStart
              task={filterAndSortTasks(Tasks?.[0]?.yetToStart)}
              setEditTaskDiv={setEditTaskDiv}
              setEditTaskId={setEditTaskId}
            />
          </div>

          {/* Column 2 - Light Blue backdrop */}
          <div className="w-full md:w-1/3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/60 min-h-[600px]">
            <div className="mb-4 px-2 flex items-center justify-between">
                <StackTitle title={"In Progress"} />
                <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {Tasks?.[1]?.inProgress?.length || 0}
                </span>
            </div>
            <InProgress
              task={filterAndSortTasks(Tasks?.[1]?.inProgress)}
              setEditTaskDiv={setEditTaskDiv}
              setEditTaskId={setEditTaskId}
            />
          </div>

          {/* Column 3 - Light Green backdrop */}
          <div className="w-full md:w-1/3 bg-green-50/50 p-4 rounded-2xl border border-green-100/60 min-h-[600px]">
            <div className="mb-4 px-2 flex items-center justify-between">
                <StackTitle title={"Completed"} />
                <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {Tasks?.[2]?.completed?.length || 0}
                </span>
            </div>
            <Completed
              task={filterAndSortTasks(Tasks?.[2]?.completed)}
              setEditTaskDiv={setEditTaskDiv}
              setEditTaskId={setEditTaskId}
            />
          </div>
        </div>
      </div>

      {/* Add Task Modal with Backdrop Blur */}
      {AddTaskDiv === "block" && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50 p-4">
            <AddTask setAddTaskDiv={setAddTaskDiv} fetchUserDetails={fetchUserDetails} />
          </div>
        </>
      )}

      {/* Edit Task Modal with Backdrop Blur */}
      {EditTaskDiv === "block" && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50 p-4">
            <EditTask
              key={EditTaskId || "new"}
              EditTaskId={EditTaskId}
              setEditTaskDiv={(val) => {
                setEditTaskDiv(val);
                if (val === "hidden") setEditTaskId(null);
              }}
              fetchUserDetails={fetchUserDetails}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;