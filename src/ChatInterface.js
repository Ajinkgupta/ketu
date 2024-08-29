import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Loader,
  Check,
  Moon,
  Sun,
  Zap,
  Star,
  Volume2,
  VolumeX,
  HelpCircle,
  ArrowLeft,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const Preloader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#1e1e2f] z-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#4a90e2]"></div>
      <h2 className="mt-4 text-2xl font-semibold text-[#4a90e2]">Ketu AI</h2>
      <p className="mt-2 text-[#7f7fd5]">Aligning celestial algorithms...</p>
    </div>
  </div>
);

const ChatInterface = ({ theme, toggleTheme }) => {
  const [messages, setMessages] = useState([
    {
      text: "Greetings! I am Ketu, your AI Assistant to Help building Datasets!",
      sender: "ai",
    },
    { text: "Hello Ketu AI!", sender: "user" },
    {
      text: "I'm here to assist you with any questions or tasks you may have.",
      sender: "ai",
    },
    { text: "I want to get a dataset for my task.", sender: "user" },
    {
      text: "Certainly! I'd be happy to help you find a dataset. What's the topic or query for your task?",
      sender: "ai",
    },
    { text: "My topic is a dataset for Sanskrit grammar.", sender: "user" },
    {
      text: "Querying -> Accepted. Your request for a Sanskrit grammar dataset has been recorded. It will be processed in the upcoming job batch. You can ask me about the progress at any time after it's completed.",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [starCount, setStarCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [datasetGenerated, setDatasetGenerated] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setIsQuerying(true);
      setIsTyping(true);

      setTimeout(() => {
        setIsQuerying(false);
        setIsTyping(false);
        const aiResponse =
          "The Ketu algorithms have processed your inquiry. Your Sanskrit grammar dataset has been generated successfully!";
        setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
        setDatasetGenerated(true);
        if (!isMuted) {
          console.log("Speaking:", aiResponse);
        }
      }, 3000);
    }
  };

  const incrementStars = () => setStarCount((prevCount) => prevCount + 1);
  const toggleMute = () => setIsMuted((prev) => !prev);
  const toggleTutorial = () => setShowTutorial((prev) => !prev);

  if (isLoading) return <Preloader />;

  return (
    <div
      className={`flex h-screen ${
        theme === "light"
          ? "bg-gradient-to-br from-[#e6e6fa] to-[#b0e0e6]"
          : "bg-gradient-to-br from-[#1e1e2f] to-[#2a1b3d]"
      } transition-colors duration-500`}
    >
      <div className="flex-grow p-8">
        <Link
          to="/"
          className={`flex items-center mb-6 ${
            theme === "light" ? "text-[#4a90e2]" : "text-[#7f7fd5]"
          } hover:text-opacity-80`}
        >
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              theme === "light" ? "text-[#4a90e2]" : "text-[#7f7fd5]"
            }`}
          >
            Ketu AI Chat
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTutorial}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#7f7fd5] text-[#2d2d44]"
              }`}
            >
              <HelpCircle size={20} />
            </button>
            <button
              onClick={incrementStars}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#7f7fd5] text-[#2d2d44]"
              }`}
            >
              <Star size={20} />
              <span className="ml-1">{starCount}</span>
            </button>
            <button
              onClick={toggleMute}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#7f7fd5] text-[#2d2d44]"
              }`}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#7f7fd5] text-[#2d2d44]"
              }`}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-[#2d2d44]"
          } rounded-lg shadow-lg p-6 mb-6 h-[calc(100vh-250px)] overflow-y-auto`}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-end ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {message.sender === "ai" ? (
                  <Bot
                    className={`h-8 w-8 rounded-full ${
                      theme === "light" ? "bg-[#4a90e2]" : "bg-[#7f7fd5]"
                    } p-1 text-white mr-2`}
                  />
                ) : (
                  <User className="h-8 w-8 rounded-full bg-[#7f7fd5] p-1 text-white ml-2" />
                )}
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-[#7f7fd5] text-white"
                      : theme === "light"
                      ? "bg-[#f0e6fa] text-[#4a90e2]"
                      : "bg-[#3d3d5c] text-[#7f7fd5]"
                  } transition-colors duration-500`}
                >
                  {message.text.includes("Querying -> Accepted") ? (
                    <div className="flex items-center">
                      <Loader className="animate-spin mr-2" />
                      <span>Querying</span>
                      <span className="mx-2">-&gt;</span>
                      <Check className="mr-2 text-green-500" />
                      <span>Accepted</span>
                    </div>
                  ) : null}
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div
                className={`flex items-center ${
                  theme === "light"
                    ? "bg-[#f0e6fa] text-[#4a90e2]"
                    : "bg-[#3d3d5c] text-[#7f7fd5]"
                } rounded-lg px-4 py-2`}
              >
                <span className="mr-2">Ketu is channeling cosmic wisdom</span>
                <span className="animate-pulse">•</span>
                <span className="animate-pulse animation-delay-200">•</span>
                <span className="animate-pulse animation-delay-400">•</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {isQuerying && (
          <div
            className={`mb-4 p-4 ${
              theme === "light"
                ? "bg-[#f0e6fa] text-[#4a90e2]"
                : "bg-[#3d3d5c] text-[#7f7fd5]"
            } rounded-lg flex items-center justify-center transition-colors duration-500`}
          >
            <Zap className="animate-pulse mr-2" />
            <span>Channeling cosmic energies to process your request...</span>
          </div>
        )}
        {datasetGenerated && (
          <div
            className={`mb-4 p-4 ${
              theme === "light"
                ? "bg-[#f0e6fa] text-[#4a90e2]"
                : "bg-[#3d3d5c] text-[#7f7fd5]"
            } rounded-lg flex items-center justify-center transition-colors duration-500`}
          >
            <Download className="mr-2" />
            <a href="#" className="underline">
              Click here to download your Sanskrit grammar dataset
            </a>
          </div>
        )}
        <div
          className={`flex items-center ${
            theme === "light" ? "bg-white" : "bg-[#2d2d44]"
          } rounded-lg shadow-md transition-colors duration-500`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className={`flex-grow px-4 py-2 rounded-l-lg focus:outline-none ${
              theme === "light"
                ? "bg-[#f0e6fa] text-[#4a90e2]"
                : "bg-[#3d3d5c] text-[#7f7fd5]"
            } transition-colors duration-500`}
            placeholder="Transmit your cosmic query..."
          />
          <button
            onClick={handleSend}
            className={`px-4 py-2 ${
              theme === "light"
                ? "bg-[#4a90e2] text-white"
                : "bg-[#7f7fd5] text-[#2d2d44]"
            } rounded-r-lg hover:opacity-80 focus:outline-none transition-colors duration-300`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              theme === "light" ? "bg-white" : "bg-[#2d2d44]"
            } p-6 rounded-lg max-w-md ${
              theme === "light" ? "text-[#4a90e2]" : "text-[#7f7fd5]"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Welcome to Ketu AI</h2>
            <ul className="list-disc pl-5 mb-4">
              <li>Ask Ketu anything about the cosmos and beyond</li>
              <li>Toggle theme for your preferred viewing experience</li>
              <li>Star your favorite responses</li>
              <li>Mute/Unmute Ketu's voice responses</li>
              <li>Enjoy the cosmic journey of knowledge!</li>
            </ul>
            <button
              onClick={toggleTutorial}
              className={`${
                theme === "light"
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#7f7fd5] text-[#2d2d44]"
              } px-4 py-2 rounded hover:opacity-80`}
            >
              Start Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
