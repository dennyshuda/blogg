import { SyntheticEvent, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

interface IsLogin {
  isLogin: boolean;
}

export default function CreatePost({ isLogin }: IsLogin) {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
  }, []);

  async function createPost(event: SyntheticEvent) {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        text,
      });
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Create A Post</h1>
      <form onSubmit={createPost} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="block w-6/12 md:w-4/12  input input-bordered"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          className="block w-6/12 md:w-4/12 textarea textarea-bordered"
          placeholder="Post"
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></textarea>
        <button className="btn">Submit Post</button>
      </form>
    </div>
  );
}
