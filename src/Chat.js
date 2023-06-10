import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

function Chat() {
  const socket = io.connect("http://localhost:4000"); // backend server link
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [chatId, setChatId] = useState();
  const [userRecive, setUser] = useState();
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const create_chat_id = async () => {
      let chat_id = await axios.post("http://localhost:4000/add-chat-info", {
        user_id_1: user.user_id,
        user_id_2: id,
      });
      setChatId(chat_id.data.chat_id);
      setUser(chat_id.data.reciver);
      const dataOfChat = await axios.get("http://localhost:4000/chat", {
        params: {
          chat_id: chat_id.data.chat_id,
        },
      });
      console.log(dataOfChat);
      setData(dataOfChat.data.chat);
      socket.emit("join_room", chat_id.data.chat_id._id);
    };
    create_chat_id();
  }, [id]);
  useEffect(() => {
    socket.on("receved", (data) => {
      setData((ele) => [...ele, data]);
    });
  }, [socket]);
  const sendMsg = async () => {
    await socket.emit("send_msg", {
      chatId: chatId._id,
      msg: msg,
      user_id_sender: user.user_id,
      name_sender: user.name,
      time: `${new Date(Date.now()).getHours()} : ${new Date(
        Date.now()
      ).getMinutes()}`,
      user_id_reciver: id,
    });
    await axios.post("http://localhost:4000/chat", {
      chatId: chatId._id,
      msg: msg,
      user_id_sender: user.user_id,
      name_sender: user.name,
      time: `${new Date(Date.now()).getHours()} : ${new Date(
        Date.now()
      ).getMinutes()}`,
      user_id_reciver: id,
    });
  };
  return (
    <div className="center">
      <div className="navbar">
        {userRecive ? (
          // <>
          //   <div classNameName="user">
          //     <img src="https://www.w3schools.com/w3images/avatar2.png" />
          //     <p>{userRecive.name}</p>
          //   </div>
          //   <div classNameName="input">
          //     <input
          //       type="text"
          //       placeholder="write text"
          //       classNameName="text"
          //       onChange={(e) => setMsg(e.target.value)}
          //     />
          //     <button onClick={sendMsg}>send</button>
          //   </div>
          //   <div classNameName="all">
          //     {data.map((ele) => {
          //       return <div classNameName="msg">{ele.msg}</div>;
          //     })}
          //   </div>

          // </>
          <section className="msger">
            <header className="msger-header">
              <div className="msger-header-title">
                <i className="fas fa-comment-alt"></i> SimpleChat
              </div>
              <div className="msger-header-options"></div>
            </header>

            <main className="msger-chat">
              {data
                ? data.map((ele, i) => {
                    if (ele.user_id_sender === user.user_id) {
                      return (
                        <div className="msg left-msg" key={i}>
                          <div className="msg-bubble">
                            <div className="msg-info">
                              <div className="msg-info-name">
                                {ele.name_sender}
                              </div>
                              <div className="msg-info-time">{ele.time}</div>
                            </div>
                            <div className="msg-text">{ele.msg}</div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="msg right-msg">
                          <div className="msg-bubble">
                            <div className="msg-info">
                              <div className="msg-info-name">
                                {ele.name_sender}
                              </div>
                              <div className="msg-info-time">{ele.time}</div>
                            </div>

                            <div className="msg-text">{ele.msg}</div>
                          </div>
                        </div>
                      );
                    }
                  })
                : ""}
            </main>

            <div className="msger-inputarea">
              <input
                type="text"
                className="msger-input"
                placeholder="Enter your message..."
                onChange={(e) => setMsg(e.target.value)}
              />
              <button
                onClick={sendMsg}
                type="submit"
                className="msger-send-btn"
              >
                Send
              </button>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Chat;
