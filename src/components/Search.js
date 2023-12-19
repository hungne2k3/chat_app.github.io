import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

function Search() {
  // dat ten user
  const [userName, setUserName] = useState("");
  // nguoi dung thuc te
  const [user, setUser] = useState(null);
  // loi
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // tìm kiếm bất kỳ user bằng các câu lệnh truy vấn trên firebase
  const handleSearch = async () => {
    // Create a query against the collection.
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  // ham su ly search user
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // ham click chọn người dùng tạo chat
  const handleSelect = async () => {
    // kiểm tra xem liệu nhóm(chats trong firebase) tồn tại không, nếu không tồn tại chỉ cần tạo mới
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      // nếu phản hồi không tồn tại nghĩa là nếu không có cuộc trò chuyện giữa 2 user thì chats trong firebase sẽ được tạo mới
      if (!res.exists()) {
        // tạo mới cuộc trò chuyện
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
      console.log(err);
    }

    // sau khi click vào user thì sẽ đóng tìm kiếm vào xóa text ở input
    setUser(null);
    setUserName("");
    // create user chats
  };

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Tim kiếm mọi người..."
          // lắng nghe thao tác khi nhấn bàn phím xuống và nhấn enter tìm kiếm
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>

      {err && <span>Người dùng không tồn tại!</span>}

      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />

          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
