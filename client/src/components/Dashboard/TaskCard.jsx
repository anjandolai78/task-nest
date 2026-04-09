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

  // Safely format priority
  const displayPriority =
  data.priority?.charAt(0).toUpperCase() + data.priority?.slice(1) || "Low";

  // Determine badge color safely
  const priorityClass =
  data.priority === "high"
    ? "text-red-600 bg-red-100"
    : data.priority === "medium"
    ? "text-yellow-600 bg-yellow-100"
    : "text-green-600 bg-green-100";
  return (
    <button
      className="bg-white rounded px-4 w-full py-2 hover:shadow transition-all duration-300"
      onClick={(event)=>showEditDiv(event,data._id)}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-medium">{data.title}</h1>

        <span
          className={`text-xs font-medium ${priorityClass} px-2 py-0.5 rounded-full`}
        >
          {displayPriority}
        </span>
      </div>

      <hr className="my-2" />

      <p className="text-sm text-zinc-500 text-start">{data.description}</p>

      {formattedDate && (
        <p className="text-xs text-zinc-400 mt-1 text-start">
          Due: {formattedDate}
        </p>
      )}

      {formattedCreatedAt && (
        <p className="text-xs text-zinc-400 mt-1 text-start">
          Created: {formattedCreatedAt}
        </p>
      )}
    </button>
    
  );
};

export default TaskCard;