import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, FileText, Sparkles } from "lucide-react";

const ResultBox = ({ originalText, paraphrasedText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paraphrasedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Results Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">
            Paraphrasing Complete!
          </h2>
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </div>
        <p className="text-white/70">
          Your text has been successfully paraphrased with AI precision
        </p>
      </motion.div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Text */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Original Text</h3>
          </div>
          <div className="bg-white/5 rounded-lg p-4 max-h-60 overflow-y-auto">
            <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
              {originalText}
            </p>
          </div>
          <div className="text-sm text-white/50">
            {originalText.length} characters
          </div>
        </motion.div>

        {/* Paraphrased Text */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 space-y-4 relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Paraphrased Text
                </h3>
              </div>

              {/* Copy Button */}
              <motion.button
                onClick={handleCopy}
                className={`px-4 py-2 font-bold rounded-lg transition-all duration-300 ${
                  copied
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/40 border border-emerald-400/30"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-xl shadow-purple-500/40 border border-purple-400/30 hover:shadow-pink-500/50"
                }`}
                whileHover={{
                  scale: 1.15,
                  rotateZ: 5,
                  boxShadow: copied
                    ? "0 20px 40px -12px rgba(16, 185, 129, 0.6)"
                    : "0 20px 40px -12px rgba(236, 72, 153, 0.6)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="flex items-center gap-2">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </div>
              </motion.button>
            </div>

            <motion.div
              className="bg-white/5 rounded-lg p-4 max-h-60 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.p
                className="text-white leading-relaxed whitespace-pre-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.5 }}
              >
                {paraphrasedText}
              </motion.p>
            </motion.div>

            <div className="flex justify-between items-center text-sm text-white/50 mt-4">
              <span>{paraphrasedText.length} characters</span>
              <motion.span
                className="text-green-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                ✨ AI Enhanced
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex justify-center gap-4">
        <motion.button
          onClick={handleCopy}
          className={`px-8 py-3 font-black rounded-xl transition-all duration-300 ${
            copied
              ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-2xl shadow-emerald-500/50 border border-emerald-400/30"
              : "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-400 hover:via-pink-400 hover:to-indigo-400 text-white shadow-2xl shadow-purple-500/50 border border-purple-400/30 hover:shadow-pink-500/60"
          }`}
          whileHover={{
            scale: 1.1,
            y: -4,
            boxShadow: copied
              ? "0 25px 50px -12px rgba(16, 185, 129, 0.7)"
              : "0 25px 50px -12px rgba(168, 85, 247, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
            {copied ? "Copied to Clipboard!" : "Copy Paraphrased Text"}
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultBox;
