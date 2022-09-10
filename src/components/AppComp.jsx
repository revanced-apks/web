import React from "react";

const AppComp = (props) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border px-2 py-4 border-red-200 space-y-1">
      <h1 className="text-white">File: <span className="font-bold">{props.name}</span></h1>
      <p className="text-white">Size: <span className="font-bold">{props.size}</span> MB</p>
      <button className="border px-1 py-2 w-1/2 min-w-fit rounded-xl text-white border-white bg-red-500 font-medium hover:bg-red-700" onClick={() => (document.location.href = props.download)} >Download</button>
    </div>
  );
};

export default AppComp;
