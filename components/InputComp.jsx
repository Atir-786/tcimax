import React from "react";

const InputField = ({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
}) => {
  return (
    <div className="relative mb-4 rounded-sm">
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="text-lg pl-10 pr-4 py-4 w-full border border-gray-100 rounded-xl bg-gray-100 focus:outline-gray-400"
      />
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      )}
    </div>
  );
};

export default InputField;
