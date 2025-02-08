"use client";
import React from "react";
import { useState } from "react";
const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    companyNews: false,
    pushNotification: true,
    weeklyNewsletters: true,
    meetupsNearYou: false,
    ordersNotifications: true,
  });

  const handleToggle = (settingKey) => {
    setSettings((prev) => ({
      ...prev,
      [settingKey]: !prev[settingKey],
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      <div className="space-y-4">
        {[
          { label: "Company News", key: "companyNews" },
          { label: "Push Notification", key: "pushNotification" },
          { label: "Weekly News Letters", key: "weeklyNewsletters" },
          { label: "Meetups Near You", key: "meetupsNearYou" },
          { label: "Orders Notifications", key: "ordersNotifications" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="text-gray-700">{item.label}</span>
            <button
              onClick={() => handleToggle(item.key)}
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${
                settings[item.key] ? "bg-blue-600" : ""
              }`}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform transition ${
                  settings[item.key] ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
