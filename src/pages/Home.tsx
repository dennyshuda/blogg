import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "../models/post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(true);

  async function getDataFromFirestore() {
    try {
      await getDocs(collection(db, "posts")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(newData);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {loading && <div>Loading...</div>}
      <div className="flex flex-wrap gap-5">
        {posts?.map((post) => {
          return (
            <div key={post.id} className="card my-3 w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h1 className="card-title font-bold">{post.title}</h1>
                <p>{post.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
