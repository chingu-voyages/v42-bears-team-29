import React, { useState, useEffect, useRef } from "react";
import Chats from "../components/messages/Chats";
import ChatSearchInput from "../components/messages/ChatSearchInput";
import avatar from "../assets/chat/avatar.png";
import person1 from "../assets/chat/person1.jpg";
import person2 from "../assets/chat/person2.jpg";
import person3 from "../assets/chat/person3.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { io } from "socket.io-client";
import Conversations from "../components/messages/Conversations";
import { conversations } from "../features/messages/messages-slice";
import { useDispatch, useSelector } from "react-redux";

const Messaging = () => {
  const [openMsg, setOpenMsg] = useState(false);
  const [seeMessages, setSeeMessages] = useState({});
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const user = useSelector((state) => state.user);
  const conversationList = useSelector((state) => state.messages.conversations);
  const socket = useRef();
  const dispatch = useDispatch();

  // console.log(conversationList);
  useEffect(() => {
    if (user.id !== null) {
      dispatch(conversations(user.id));
    }
  }, [user.id]);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER);
  }, []);

  useEffect(() => {
    socket.current.on("connect", (data) => {});

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);
  return (
    <>
      {screenSize <= 940 ? (
        <div className="h-screen overflow-auto ">
          {!openMsg ? (
            <div className="px-4 w-full">
              <h2 className="font-bold font-title text-2xl text-primary pb-2">
                Chats
              </h2>
              <ChatSearchInput text="text" placeholder="Search" />
              {conversationList?.map((value) => {
                return (
                  <Chats
                    key={value?.user.id}
                    avi={`${value?.user.profilePic}`}
                    name={`${value?.user.first_name} ${value?.user.last_name}`}
                    date="Yesterday"
                    message="Hey David, are you still available for our class at 2pm tomorrow?"
                    setOpenMsg={setOpenMsg}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full">
              <div className="z-10 bg-white max-w-full">
                <div className="flex items-center w-44 justify-between p-4">
                  <IoIosArrowBack
                    className="cursor-pointer text-primary text-2xl"
                    onClick={() => setOpenMsg(false)}
                  />
                  <div className="flex items-center">
                    <div className="h-10 w-10">
                      <img
                        src={avatar}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="ml-4 text-primary text-lg font-bold">
                      John
                    </span>
                  </div>
                </div>
              </div>

              <Conversations message="Hey David, are you still available for our class at 2pm tomorrow?" />
            </div>
          )}
        </div>
      ) : (
        <div className="h-chatScreenHeight flex overflow-x-hidden">
          <div className="px-4 max-w-sm overflow-auto ">
            <h2 className="font-bold font-title text-2xl text-primary pb-2">
              Chats
            </h2>
            <ChatSearchInput text="text" placeholder="Search" />
            {conversationList?.map((value) => {
              return (
                <Chats
                  key={value?.user.id}
                  avi={`${value?.user.profilePic}`}
                  name={`${value?.user.first_name} ${value?.user.last_name}`}
                  conversationId={value?.conversation_id}
                  date="Yesterday"
                  message="Hey David, are you still available for our class at 2pm tomorrow?"
                  setOpenMsg={setOpenMsg}
                  setSeeMessages={setSeeMessages}
                />
              );
            })}
          </div>
          <div className="w-full overflow-auto ">
            <div className="bg-white w-full">
              <div className="flex items-center w-44 justify-between p-4">
                {screenSize <= 940 && (
                  <IoIosArrowBack
                    className="cursor-pointer text-primary text-2xl"
                    onClick={() => setOpenMsg(false)}
                  />
                )}
                {openMsg && (
                  <div className="flex items-center">
                    <div className="h-10 w-10">
                      <img
                        src={`${seeMessages?.avi}`}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="ml-4 font-bold text-primary">{`${seeMessages?.name}`}</span>
                  </div>
                )}
              </div>
            </div>

            <Conversations
              openMsg={openMsg}
              conversationId={seeMessages?.conversationId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Messaging;
