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

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/userDetails`, { withCredentials: true });
      setTasks(res.data.tasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    const editId = window.sessionStorage.getItem("editTaskId");
    if (editId) {
      setEditTaskDiv("block");
      setEditTaskId(editId);
    }
  }, []);

  const totalTasks = (Tasks?.[0]?.yetToStart?.length || 0) + (Tasks?.[1]?.inProgress?.length || 0) + (Tasks?.[2]?.completed?.length || 0);
  const completedTasks = Tasks?.[2]?.completed?.length || 0;
  const pendingTasks = (Tasks?.[0]?.yetToStart?.length || 0) + (Tasks?.[1]?.inProgress?.length || 0);

  const filterAndSortTasks = (tasksArray) => {
    if (!tasksArray) return [];
    let filtered = [...tasksArray];
    if (searchTerm) {
      filtered = filtered.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    if (sortOrder !== "none") {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return sortOrder === "asc" ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate);
      });
    }
    return filtered;
  };

  return (
    <div className="w-full relative bg-gray-50 min-h-screen">
      {/* 1. Header with soft border */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <Header
          setAddTaskDiv={(val) => {
            setEditTaskId(null);
            setAddTaskDiv(val);
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* 2. Stats Section - Changed to White Cards with colored accents */}
        {Tasks && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Tasks</h3>
              <p className="text-3xl font-extrabold text-blue-600">{totalTasks}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Completed</h3>
              <p className="text-3xl font-extrabold text-green-500">{completedTasks}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Pending</h3>
              <p className="text-3xl font-extrabold text-orange-400">{pendingTasks}</p>
            </div>
          </div>
        )}

        {/* 3. Search & Filters - Made cleaner and more professional */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="relative flex-1 min-w-[300px]">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white shadow-sm"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none bg-white shadow-sm text-sm font-medium text-gray-600 cursor-pointer hover:border-gray-300"
            >
              <option value="all">All Status</option>
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none bg-white shadow-sm text-sm font-medium text-gray-600 cursor-pointer hover:border-gray-300"
            >
              <option value="none">Sort by Due Date</option>
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>
          </div>
        </div>

        {/* 4. Kanban Columns - Added background containers for depth */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
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

          <div className="w-full md:w-1/3 bg-gray-100/50 p-4 rounded-2xl border border-gray-200/60 min-h-[600px]">
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

          <div className="w-full md:w-1/3 bg-gray-100/50 p-4 rounded-2xl border border-gray-200/60 min-h-[600px]">
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

      {/* Modals with better backdrop blur */}
      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity`}></div>
      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center z-50`}>
        <AddTask setAddTaskDiv={setAddTaskDiv} fetchUserDetails={fetchUserDetails} />
      </div>

      <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity`}></div>
      <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center z-50`}>
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
    </div>
  );
};

export default Dashboard;