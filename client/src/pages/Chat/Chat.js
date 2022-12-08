import React, { useContext, useState, useEffect, useRef } from "react";
import { ContextOfProduct } from "../../context/MyContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Avatar from "react-avatar";
import styles from "./Chat.module.scss";
import { AiTwotoneStar } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import moment from "moment";

const Chat = ({ socket }) => {
  let { show, setShow, users } = useContext(ContextOfProduct);
  const [messages, setMessages] = useState([]);
  const [googleUser, setGoogleUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  useEffect(() => {
    setShow(true);
  }, [show, setShow]);

  useEffect(() => {
    const userG = googleUser?.user;
    axios
      .get("/api/chat")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));

    socket.on("receive_message", async (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  function dateFormatter(date) {
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    let year = date.slice(0, 4);
    let hour = date.slice(11, 13);
    let minute = date.slice(14, 16);
    const fecha = `${day}/${month}/${year} ${hour}:${minute}`;
    const myText = moment(fecha).calendar();
    return myText;
  }

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().trim().required("Message is required"),
    }),

    onSubmit: async (values) => {
      try {
        const chatData = await axios.post("/api/chat", {
          message: values.message,
          date: values.date,
          email: users?.email || googleUser?.user?.email,
          type:
            (users?.email || googleUser?.user?.email) ===
            "onecomfortclothes@gmail.com"
              ? "admin"
              : "user",
        });
        await socket.emit("send_message", chatData);
        values.message = "";
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className={styles.chatContainer}>
      <div
        className={styles.chat}
        style={{
          backgroundColor: "#222",
        }}
      >
        <div className={styles.chatTitle}>
          <h1>ONE COMFORT MESSAGING</h1>
          <h2>🟢 Live</h2>
          <figure className={styles.avatarPrincipal}>
            <Avatar
              name="ONE COMFORT"
              size="40"
              round={true}
              color="#060b26"
              style={{ marginRight: "10px" }}
              className={styles.avatarMenu}
            />
          </figure>
        </div>

        <div className={styles.messages} id="messages">
          <div className={styles.messagesContent}>
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={
                  message.type === "user" && message.email === users?.email
                    ? styles.message + " " + styles.messagePersonal
                    : message.type !== "user" && message.email === users?.email
                    ? styles.message + " " + styles.messagePersonal
                    : message.type === "user" &&
                      message.email === googleUser?.user?.email
                    ? styles.message + " " + styles.messagePersonal
                    : message.type !== "user" &&
                      message.email === googleUser?.user?.email
                    ? styles.message + " " + styles.messagePersonal
                    : styles.message + " " + styles.new
                }
              >
                <figure className={styles.avatar}>
                  <Avatar
                    name={message.email}
                    size="30"
                    round={true}
                    style={{ marginRight: "30px" }}
                    className={styles.avatarChat2}
                    color={message.type === "user" ? "#343b29" : "gold"}
                  />
                </figure>

                <div className={styles.messsageContent}>
                  <p>{message.message}</p>
                  <p
                    className={
                      message.type === "user" ? styles.datetime : styles.datetime2
                    }
                  >
                    <span className={styles.nameUser}>
                      <strong>{message.email},</strong>
                    </span>{" "}
                    <span>
                      {dateFormatter(message.date)}
                      {message.type === "user" ? (
                        <HiUser className={styles.userIcon} />
                      ) : (
                        <AiTwotoneStar className={styles.starAdmin} />
                      )}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={styles.messageBox}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              formik.handleSubmit();
            }
          }}
        >
          <textarea
            type="text"
            className={styles.messageInput}
            placeholder="Type message here..."
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="message"
          ></textarea>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className={styles.messageSubmit}
          >
            &#9658;
          </button>
        </div>
      </div>
      <div className={styles.bg}></div>
    </div>
  );
};

export default Chat;
