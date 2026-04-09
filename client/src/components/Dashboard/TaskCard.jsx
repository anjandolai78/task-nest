// import React from 'react';

// const TaskCard = ({data}) => {
//   const showEditDiv = (e,id)=>{
//     e.preventDefault();
//     window.sessionStorage.setItem("editTaskId",id);
//     window.location.reload();
//   };

//   // Safely parse dueDate
//   const formattedDate = data.dueDate
//     ? (() => {
//         const d = new Date(data.dueDate);
//         return isNaN(d.getTime()) ? null : d.toLocaleDateString("en-GB", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         });
//       })()
//     : null;

//   // Safely parse createdAt
//   const formattedCreatedAt = data.createdAt
//     ? (() => {
//         const d = new Date(data.createdAt);
//         return isNaN(d.getTime()) ? null : d.toLocaleDateString("en-GB", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         });
//       })()
//     : null;

//   // Safely format priority
//   const displayPriority =
//   data.priority?.charAt(0).toUpperCase() + data.priority?.slice(1) || "Low";

//   // Determine badge color safely
//   const priorityClass =
//   data.priority === "high"
//     ? "text-red-600 bg-red-100"
//     : data.priority === "medium"
//     ? "text-yellow-600 bg-yellow-100"
//     : "text-green-600 bg-green-100";
//   return (
//     <button
//       className="bg-white rounded px-4 w-full py-2 hover:shadow transition-all duration-300"
//       onClick={(event)=>showEditDiv(event,data._id)}
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="font-medium">{data.title}</h1>

//         <span
//           className={`text-xs font-medium ${priorityClass} px-2 py-0.5 rounded-full`}
//         >
//           {displayPriority}
//         </span>
//       </div>

//       <hr className="my-2" />

//       <p className="text-sm text-zinc-500 text-start">{data.description}</p>

//       {formattedDate && (
//         <p className="text-xs text-zinc-400 mt-1 text-start">
//           Due: {formattedDate}
//         </p>
//       )}

//       {formattedCreatedAt && (
//         <p className="text-xs text-zinc-400 mt-1 text-start">
//           Created: {formattedCreatedAt}
//         </p>
//       )}
//     </button>
    
//   );
// };

// export default TaskCard;

import React from 'react';

const TaskCard = ({data}) => {
  const showEditDiv = (e,id)=>{
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId",id);
    window.location.reload();
  };

  // Safely parse dueDate
  const formattedDate = data.dueDate
    ? (() => {
        const d = new Date(data.dueDate);
        return isNaN(d.getTime()) ? null : d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      })()
    : null;

  // Safely parse createdAt
  const formattedCreatedAt = data.createdAt
    ? (() => {
        const d = new Date(data.createdAt);
        return isNaN(d.getTime()) ? null : d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      })()
    : null;

  const displayPriority = data.priority?.charAt(0).toUpperCase() + data.priority?.slice(1) || "Low";

  const priorityClass =
  data.priority === "high"
    ? "text-red-600 bg-red-50"
    : data.priority === "medium"
    ? "text-orange-600 bg-orange-50"
    : "text-green-600 bg-green-50";

  return (
    <button
      className="bg-white rounded-xl p-4 w-full shadow-sm hover:shadow-md border border-transparent hover:border-gray-200 transition-all duration-300 group text-start mb-4"
      onClick={(event)=>showEditDiv(event,data._id)}
    >
      <div className="flex items-center justify-between mb-3">
        {/* Title set to font-medium for a clean, normal look */}
        <h1 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{data.title}</h1>
        <span className={`text-[10px] uppercase tracking-wider font-medium ${priorityClass} px-2 py-1 rounded-md`}>
          {displayPriority}
        </span>
      </div>

      <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed font-normal">
        {data.description}
      </p>

      {/* Date Section - Side-by-Side as requested */}
      <div className="flex items-center gap-8 border-t border-gray-50 pt-3">
        {formattedDate && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-normal text-gray-400 uppercase tracking-tight">Due</span>
            <div className="flex items-center gap-1.5 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-normal">{formattedDate}</span>
            </div>
          </div>
        )}

        {formattedCreatedAt && (
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-normal text-gray-400 uppercase tracking-tight">Created</span>
            <div className="flex items-center gap-1.5 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-normal">{formattedCreatedAt}</span>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default TaskCard;