import React, { useState } from "react";
import { Send, RotateCcw, AlertCircle } from "lucide-react";
import ResultBox from "./ResultBox";
import Loader from "./Loader";
import { paraphraseText } from "../services/api";

// Import test functions for debugging
import { runAPITests, testAPIConnection } from "../test-api.js";

const ParaphraseForm = () => {
  // Make test functions available in browser console for development
  React.useEffect(() => {
    if (typeof window !== "undefined" && import.meta.env.DEV) {
      window.runAPITests = runAPITests;
      window.testAPIConnection = testAPIConnection;
      window.testParaphrasing = async () => {
        const testText =
          "This is a test to check if the paraphrasing works correctly.";
        try {
          const result = await paraphraseText(testText);
          return result;
        } catch (error) {
          throw error;
        }
      };
    }
  }, []);
  const [inputText, setInputText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!inputText.trim()) {
      setError("Please enter some text to paraphrase");
      return;
    }

    if (inputText.trim().length < 3) {
      setError("Please enter some text");
      return;
    }

    setIsLoading(true);
    setError("");
    setParaphrasedText("");

    try {
      const result = await paraphraseText(inputText.trim());
      setParaphrasedText(result);
    } catch (err) {
      setError(err.message || "Failed to paraphrase text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setInputText("");
    setParaphrasedText("");
    setError("");
  };

  const isFormValid = inputText.trim().length >= 3;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Form */}
      <div className="glass-card p-8 animate-fade-in-up">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-white/90 animate-fade-in">
              Enter your text to paraphrase
            </label>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setError("");
                }}
                placeholder="Paste or type your text here..."
                className="glass-input w-full h-40 p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:scale-102 transition-transform duration-300"
                maxLength={5000}
              />
              <div className="absolute bottom-3 right-3 text-sm text-white/50">
                {inputText.length}/5000
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 animate-slide-down">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="relative flex-1 px-8 py-4 font-bold text-white rounded-2xl transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 shadow-lg shadow-indigo-500/25 hover:shadow-purple-500/40 hover:border-purple-300/50 hover:scale-85 active:scale-95"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="transition-transform duration-300 hover:rotate-180 hover:scale-50">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">
                  {isLoading ? "Processing..." : "Paraphrase Text"}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="relative px-6 py-4 font-bold text-white rounded-2xl transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 shadow-lg shadow-indigo-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="transition-transform duration-300 hover:-rotate-180">
                  <RotateCcw className="w-5 h-5" />
                </div>
                Reset
              </div>
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && <Loader />}

      {/* Results */}
      {paraphrasedText && !isLoading && (
        <div className="animate-fade-in-up">
          <ResultBox
            originalText={inputText}
            paraphrasedText={paraphrasedText}
          />
        </div>
      )}
    </div>
  );
};

export default ParaphraseForm;
