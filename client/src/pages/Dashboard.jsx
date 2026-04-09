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
    <div className="w-full relative bg-[#F9FAFB] min-h-screen font-sans antialiased">
      
      {/* 1. Header with the Blue "Add Task" Button Integrated */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm px-10 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-900 tracking-tight">TaskNest</div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setAddTaskDiv("block")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-md active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
             {/* Profile Image placeholder */}
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user27" alt="avatar" />
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-10 py-10">
        
        {/* 2. Stats Section */}
        {Tasks && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white p-7 rounded-2xl border border-blue-100 shadow-sm flex items-center gap-6">
              <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Total Tasks</p>
                <p className="text-4xl font-black text-slate-800 leading-none">{totalTasks}</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-green-100 shadow-sm flex items-center gap-6">
              <div className="p-4 bg-green-50 rounded-xl text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Completed</p>
                <p className="text-4xl font-black text-slate-800 leading-none">{completedTasks}</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-6">
              <div className="p-4 bg-orange-50 rounded-xl text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Pending</p>
                <p className="text-4xl font-black text-slate-800 leading-none">{pendingTasks}</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Search + Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-10 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="relative flex-1 w-full group">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-3 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 md:flex-none border border-gray-200 rounded-xl px-5 py-3 text-sm bg-white font-medium text-slate-600 outline-none hover:border-blue-300 transition-colors cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="flex-1 md:flex-none border border-gray-200 rounded-xl px-5 py-3 text-sm bg-white font-medium text-slate-600 outline-none hover:border-blue-300 transition-colors cursor-pointer"
            >
              <option value="none">Sort by Due Date</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* 4. Kanban Columns */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          <div className="w-full lg:w-1/3 bg-gray-100/40 p-5 rounded-[2rem] border border-gray-200/50 min-h-[600px]">
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  <StackTitle title={"Yet To Start"} />
                </div>
                <span className="text-xs font-bold bg-white text-gray-500 px-3 py-1 rounded-full shadow-sm border border-gray-100">
                  {Tasks?.[0]?.yetToStart?.length || 0}
                </span>
            </div>
            <YetToStart
              task={filterAndSortTasks(Tasks?.[0]?.yetToStart)}
              setEditTaskDiv={setEditTaskDiv}
              setEditTaskId={setEditTaskId}
            />
          </div>

          <div className="w-full lg:w-1/3 bg-blue-50/30 p-5 rounded-[2rem] border border-blue-100/50 min-h-[600px]">
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                  <StackTitle title={"In Progress"} />
                </div>
                <span className="text-xs font-bold bg-white text-blue-600 px-3 py-1 rounded-full shadow-sm border border-blue-100">
                  {Tasks?.[1]?.inProgress?.length || 0}
                </span>
            </div>
            <InProgress
              task={filterAndSortTasks(Tasks?.[1]?.inProgress)}
              setEditTaskDiv={setEditTaskDiv}
              setEditTaskId={setEditTaskId}
            />
          </div>

          <div className="w-full lg:w-1/3 bg-green-50/30 p-5 rounded-[2rem] border border-green-100/50 min-h-[600px]">
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <StackTitle title={"Completed"} />
                </div>
                <span className="text-xs font-bold bg-white text-green-600 px-3 py-1 rounded-full shadow-sm border border-green-100">
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

      {/* Modals with Premium Backdrop */}
      {AddTaskDiv === "block" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"></div>
          <div className="relative z-10 w-full max-w-lg animate-in zoom-in-95 duration-300">
            <AddTask setAddTaskDiv={setAddTaskDiv} fetchUserDetails={fetchUserDetails} />
          </div>
        </div>
      )}

      {EditTaskDiv === "block" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"></div>
          <div className="relative z-10 w-full max-w-lg">
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
      )}
    </div>
  );
};

export default Dashboard;