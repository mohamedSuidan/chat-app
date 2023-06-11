import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Link } from "react-router-dom";
import Chating from "./Chating";
function App() {
  const socket = io.connect("http://localhost:4000"); // backend server link
  const user = JSON.parse(localStorage.getItem("user"));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let usersData = await axios.get("http://localhost:4000/get-users");
      setUsers(usersData.data);
    };
    fetchData();
    console.log(users);
    socket.emit("addUser", { name: user.name, user_id: user.user_id });
    // listen for updates from the Socket.io client
    socket.on("updateUsers", (users) => {
      setOnlineUsers(users);
    });

    // disconnect the Socket.io client when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  const startChat = (e) => {
    e.preventDefault();
    setUserId(e.target.id);
    setName(e.target.dataset.name);
  };
  return (
    <div className="chat">
      <div className="row">
        <div className="col-1 border">
          {users.users
            ? users.users.map((ele, i) => {
                return (
                  <div className="row color" key={i}>
                    <div className="col-img">
                      <img src="https://www.w3schools.com/w3images/avatar2.png" />
                    </div>
                    <div className="col-text">
                      <Link
                        to={`/chat/${ele._id}`}
                        onClick={startChat}
                        id={ele._id}
                        data-name={ele.name}
                      >
                        {ele.name === user.name ? "me" : ele.name}
                      </Link>
                      {/* <p className="online">online</p> */}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="col-2">
          {userId !== "" ? (
            <Chating
              userId_recever={userId}
              socket={socket}
              user={user}
              name={name}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
