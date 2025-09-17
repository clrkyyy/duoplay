import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// ✅ Updated helper: convert Google Drive link to working thumbnail link (2024 method)
const formatImageUrl = (url) => {
  if (!url) return null;

  // Handle different Google Drive URL formats
  let fileId = null;

  // Format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const match1 = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (match1) {
    fileId = match1[1];
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID
  const match2 = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (match2) {
    fileId = match2[1];
  }

  // Format 3: https://drive.google.com/uc?id=FILE_ID (old format)
  const match3 = url.match(/uc\?.*id=([a-zA-Z0-9-_]+)/);
  if (match3) {
    fileId = match3[1];
  }

  if (fileId) {
    // Use the working 2024 method: thumbnail with large size
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=s4000`;
  }

  return url; // return as-is if not a Google Drive link
};

const CouplesWall = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fullscreenImage, setFullscreenImage] = useState(null);

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
    if (!newComment.trim() && !imageUrl.trim()) return;

    // ✅ Use the formatImageUrl helper function
    const processedImageUrl = formatImageUrl(imageUrl.trim());

    await addDoc(collection(db, "comments"), {
      text: newComment.trim() || null,
      image: processedImageUrl || null,
      createdAt: serverTimestamp(),
    });

    // clear inputs
    setNewComment("");
    setImageUrl("");
  };

  const openFullscreen = (imageUrl) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900 py-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          {/* Modern Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
              Memory Wall
            </h1>
            <p className="text-slate-300 text-lg">Share your favorite moments with friends</p>
          </motion.div>

          {/* Sleek Instructions Card */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 p-6 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-600/30 shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">ℹ</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-200">How to Share Images</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-300 mb-2">🔗 Google Drive Method:</h3>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-2">
                  <li>Upload image to Google Drive</li>
                  <li>Right-click → Share → "Anyone with link"</li>
                  <li>Set to "Viewer" permissions</li>
                  <li>Copy & paste the link below</li>
                </ol>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-teal-300 mb-2">🌐 Direct Links:</h3>
                <p className="text-slate-300">Use direct image URLs from:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">Imgur</span>
                  <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">Discord</span>
                  <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">Image hosts</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleAddComment}
            className="mb-12 p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/20 shadow-xl"
          >
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share what's on your mind..."
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image link here (Google Drive or direct URL)"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-xl font-semibold text-white shadow-lg transition-all duration-200"
              >
                Share Memory
              </motion.button>
            </div>
          </motion.form>

          {/* Enhanced Comments List */}
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/20 shadow-xl hover:bg-slate-800/40 transition-all duration-300"
              >
                {comment.text && (
                  <p className="text-slate-200 mb-4 leading-relaxed">{comment.text}</p>
                )}
                
                {comment.image && (
                  <div className="mb-4 flex justify-center">
                    <div 
                      className="relative inline-block group cursor-pointer"
                      onClick={() => openFullscreen(comment.image)}
                    >
                      <img
                        src={comment.image}
                        alt="Shared memory"
                        className="rounded-xl max-h-80 w-auto object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02] relative z-10"
                        onError={(e) => {
                          console.error('Image failed to load:', comment.image);
                          e.target.style.display = 'none';
                          if (!e.target.parentNode.parentNode.parentNode.querySelector('.error-message')) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'error-message text-red-400 text-sm p-3 bg-red-900/20 rounded-xl border border-red-700/50 mt-2';
                            errorDiv.textContent = 'Image failed to load. Please check if the file is publicly accessible.';
                            e.target.parentNode.parentNode.parentNode.appendChild(errorDiv);
                          }
                        }}
                      />
                      
                      {/* Enhanced visible gradient border */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 p-[3px] pointer-events-none">
                        <div className="w-full h-full rounded-[9px] bg-slate-800/80"></div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center z-20">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center text-slate-400 text-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mr-2"></div>
                  {comment.createdAt?.toDate().toLocaleString() || "Just now"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Fullscreen Modal with Zoom & Pan */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrollable container for large images */}
              <div className="w-full h-full overflow-auto flex items-center justify-center">
                <img
                  src={fullscreenImage}
                  alt="Fullscreen view"
                  className="max-w-none max-h-none min-w-full min-h-full object-contain rounded-xl shadow-2xl cursor-move"
                  style={{
                    maxWidth: 'none',
                    maxHeight: 'none'
                  }}
                />
              </div>
              
              {/* Enhanced close button */}
              <button
                onClick={closeFullscreen}
                className="absolute top-6 right-6 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-3 transition-all duration-200 shadow-lg backdrop-blur-sm border border-white/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Instructions for users */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                Scroll to zoom • Click outside to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CouplesWall;