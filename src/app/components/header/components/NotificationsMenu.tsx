"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  FemalePlaceholder,
  MalePlaceholder,
} from "../../common/allImages/AllImages";
import { getNotificationsList } from "@/app/lib/api/homeRoutes";
import ProfileImage from "../../common/profileImage/ProfileImage";
import { getformattedTime } from "@/util/util";

const NotificationsMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [notification, setNotifications] = useState<any[]>([]);

  const getNotification = async () => {
    try {
      const { data } = await getNotificationsList();
      if (data) {
        setNotifications(data?.notifications);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (isOpen) {
      getNotification();
    }
  }, [isOpen]);

  const sortedNotifications = useMemo(() => {
    if (!Array.isArray(notification)) return [];

    return [...notification].sort((a, b) => {
      const dateA = new Date(a?.updatedAt || a?.createdAt).getTime();
      const dateB = new Date(b?.updatedAt || b?.createdAt).getTime();
      return dateB - dateA;
    });
  }, [notification]);

  return (
    <div
      className={`sm:absolute sm:top-auto top-0 fixed right-0 sm:mt-2 w-full h-screen sm:w-96 bg-white sm:rounded-2xl sm:h-auto border border-gray z-50 transform transition-all duration-300 ease-in-out ${
        isOpen
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="px-2">
        <div className="flex items-center gap-2 mb-4 py-2 sm:p-4 border-b border-gray ">
          <button onClick={onClose} className="md:hidden block">
            <ArrowLeft width={20} height={20} />
          </button>
          <h2 className="text-lg font-semibold">All Notifications</h2>
        </div>
        <div className="flex gap-2 px-4 border-b border-gray ">
          <button className="text-primary border-b-2 border-primary pb-2 px-3 transition-colors">
            All
          </button>
          {/* <button className="text-gray-500 hover:text-primary pb-2 px-3 transition-colors">
            Unread
          </button> */}
        </div>
      </div>

      <div className="sm:max-h-[400px] overflow-y-auto">
        <div className="p-2">
          <div className="text-sm text-gray-500 px-2 py-1">Today</div>
          {sortedNotifications.length > 0 ?
            sortedNotifications.map((noti, index) => (
              <div
                key={noti._id}
                className="flex items-start p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex-shrink-0 mr-3">
                  <ProfileImage
                    src={
                      Array.isArray(noti?.senderId?.userImages) &&
                      noti?.senderId?.userImages[0]
                        ? noti?.senderId?.userImages[0]
                        : noti?.senderId?.gender === "male"
                        ? MalePlaceholder.src
                        : FemalePlaceholder.src
                    }
                    alt="userImage"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">{noti?.senderId?.name}</p>
                    <span className="text-xs text-gray-500">{getformattedTime(noti?.updatedAt)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{noti?.message}</p>
                </div>
              </div>
            )) : (
              <div className="flex justify-center my-32">
                <h6>No Notifications</h6>
              </div>
            )}
          {/* {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="flex items-start p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex-shrink-0 mr-3">
                {!notification.isRead && (
                  <div className="relative">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -left-1"></div>
                    <div className="bg-red-100 rounded-full text-red-500 w-9 h-9 flex items-center justify-center mt-3">
                      !
                    </div>
                  </div>
                )}
                {notification.isRead && (
                  <div className="relative">
                    <div className="bg-green-100 rounded-full text-green-500 w-9 h-9 flex items-center justify-center mt-3">
                      ✓
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-semibold text-sm">{notification.title}</p>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
            </div>
          ))} */}
        </div>
      </div>

      <div className="sm:p-3 sm:border-t border-gray">
        {/* <button className="text-primary text-sm w-full text-center hover:opacity-80 transition-opacity">
          See All
        </button> */}
      </div>
    </div>
  );
};

export default NotificationsMenu;
