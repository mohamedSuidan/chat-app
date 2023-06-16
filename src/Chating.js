import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Chating({ userId_recever, socket, user, name }) {
  const [chatId, setChatId] = useState();
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const create_chat_id = async () => {
      let chat_id = await axios.post(
        "https://chat-apps-server.onrender.com/add-chat-info",
        {
          user_id_1: user.user_id,
          user_id_2: userId_recever,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setChatId(chat_id.data.chat_id);
      console.log(chat_id.data.chat_id);
      const dataOfChat = await axios.get(
        "https://chat-apps-server.onrender.com/chat",
        {
          params: {
            chat_id: chat_id.data.chat_id,
          },
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log(dataOfChat);
      setData(dataOfChat.data.chat);
      socket.emit("join_room", chat_id.data.chat_id._id);
    };
    create_chat_id();
  }, [userId_recever]);
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
      user_id_reciver: userId_recever,
    });
    setData((ele) => [
      ...ele,
      {
        chatId: chatId._id,
        msg: msg,
        user_id_sender: user.user_id,
        name_sender: user.name,
        time: `${new Date(Date.now()).getHours()} : ${new Date(
          Date.now()
        ).getMinutes()}`,
        user_id_reciver: userId_recever,
      },
    ]);
    await axios.post(
      "https://chat-apps-server.onrender.com/chat",
      {
        chatId: chatId._id,
        msg: msg,
        user_id_sender: user.user_id,
        name_sender: user.name,
        time: `${new Date(Date.now()).getHours()} : ${new Date(
          Date.now()
        ).getMinutes()}`,
        user_id_reciver: userId_recever,
      },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
  };

  return (
    <div className="">
      <div className="navbar">
        {userId_recever ? (
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
                <i className="fas fa-comment-alt"></i> {name}
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

export default Chating;
