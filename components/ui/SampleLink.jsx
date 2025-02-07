import React from "react";
import { FiDownload } from "react-icons/fi";
const SampleLink = ({ url }) => {
  return (
    <div className="flex justify-center p-2 rounded-xl ">
      <a
        href={`${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 px-4 py-2 rounded-2xl  border border-blue-400"
      >
        <FiDownload className="inline text-sm" />{" "}
        <span className="text-sm">Sample</span>
      </a>
    </div>
  );
};

export default SampleLink;
