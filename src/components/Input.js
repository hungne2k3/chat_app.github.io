import React, { useContext, useState } from "react";
import Img from "../Image/img.png";
import Active from "../Image/attach.png";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Input() {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [img, setImage] = useState(null);

  const handleSend = async () => {
    console.log("Chat ID:", data.chatId);
    console.log(img);

    if (img) {
      const storageRef = ref(storage, uuid());
      console.log("StorageRef:", storageRef);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.error("Upload Error:", error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            }
          );
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        // arrayUnion là một phương thức trong một số ngôn ngữ lập trình hoặc thư viện cung cấp để thêm các phần tử vào một mảng mà không tạo ra các phần tử trùng lặp.
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      // cập nhập tin nhắn cuối cùng
      [data.chatId + ".lastMessage"]: {
        text,
      },

      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      // cập nhập tin nhắn cuối cùng
      [data.chatId + ".lastMessage"]: {
        text,
      },

      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type sometime..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="send">
        <img src={Active} alt="" />

        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
