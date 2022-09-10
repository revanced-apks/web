import React from "react";
import Download from "../icon/Download";

const AppComp = (props) => {
  const size = (Math.round(props.size/1024/1024));
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border px-2 py-4 border-red-200 space-y-1 bg-gray-900 shadow shadow-red-400">
      <h1 className="text-white">File: <span className="font-bold">{props.name}</span></h1>
      <div className="flex items-center justify-around w-full">
        <p className="text-white">Size: <span className="font-bold">{size}</span> MB</p>
      </div>
      <button className="border px-6 py-2 min-w-fit rounded-full text-gray-100 border-gray-100 font-bold bg-red-500 hover:bg-red-700 text-xs flex items-center" onClick={() => (document.location.href = props.download)} ><Download style="w-4 h-4" />&nbsp; Download</button>
    </div>
  );
};

export default AppComp;
