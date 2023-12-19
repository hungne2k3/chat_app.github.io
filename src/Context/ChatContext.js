import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  // create reduce (bộ giảm tốc)
  const INITAL_STATE = {
    chatId: "null", // cập nhập ID trò chuyện
    user: {}, // thay đổi người dùng
  };

  //ở đây sẽ có 1 hành động khi mà click vào user ở sidebar thì cta sẽ thay đổi người dùng cùng lúc và cập nhập ID trò chuyện
  const chatReduce = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReduce, INITAL_STATE);

  return (
    // thiết lập trạng thái: dữ liệu và gửi đi
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
