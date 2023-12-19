import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chat</span>

      <div className="user">
        <img
          // lấy ảnh user
          src={currentUser.photoURL}
          alt=""
        />
        {/* Hiển thị tên user hiện tại */}
        <span>{currentUser.displayName}</span>
        {/* onClick={() => signOut(auth)} */}
        <button onClick={() => signOut(auth)}>Đăng Xuất</button>
      </div>
    </div>
  );
}

export default Navbar;
