import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Link } from "react-router-dom";
function App() {
  const socket = io.connect("http://localhost:4000"); // backend server link
  const user = JSON.parse(localStorage.getItem("user"));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div className="chat">
      <div className="row">
        <div className="col-1 border">
          {users.users
            ? onlineUsers.map((ele, i) => {
                return (
                  <div className="row color" key={i}>
                    <div className="col-img">
                      <img src="https://www.w3schools.com/w3images/avatar2.png" />
                    </div>
                    <div className="col-text">
                      <Link to={`/chat/${ele.user_id}`}>
                        {ele.name === user.name ? "me" : ele.name}
                      </Link>
                      <p className="online">online</p>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
