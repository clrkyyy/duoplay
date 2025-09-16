import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const CouplesWall = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Listen to Firestore comments (realtime)
  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  // Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await addDoc(collection(db, "comments"), {
      text: newComment,
      createdAt: serverTimestamp(),
    });

    setNewComment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black py-10 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
        >
          💖 Couples Wall
        </motion.h1>

        {/* Freedom Wall Form */}
        <form
          onSubmit={handleAddComment}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a sweet message..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white shadow-lg"
          >
            Post
          </motion.button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 shadow-md"
            >
              <p className="text-gray-200">{comment.text}</p>
              <span className="text-sm text-gray-400">
                {comment.createdAt?.toDate().toLocaleString() || "Just now"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CouplesWall;
