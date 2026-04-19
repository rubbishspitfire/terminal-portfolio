import { useEffect, useRef, useState } from "react";
import "./App.css";

const resume = "/terminal-portfolio/Patience_Condell_Frontend_Developer_Resume.pdf";

const COMMANDS = {
  help: [
    "Available commands:",
    "about      - Learn more about me",
    "skills     - View my technical skills",
    "projects   - View featured projects",
    "contact    - Contact information",
    "resume     - Open resume",
    "clear      - Clear terminal",
    "github     - Open GitHub",
    "linkedin   - Open LinkedIn",
  ],
  about: [
    "Hi, I'm Patience Condell.",
    "Frontend Developer focused on React, JavaScript, and modern web UI.",
    "I build responsive applications and portfolio projects that showcase clean design and interactivity.",
  ],
  skills: [
    "Frontend: React, JavaScript, HTML, CSS, Tailwind",
    "Backend: Node.js, Express, MongoDB",
    "Tools: Git, GitHub, VS Code, REST APIs",
  ],
  projects: [
    "1. Terminal Portfolio Website",
    "   Interactive terminal-style developer portfolio built with React.",
    "",
    "2. Monster Rolodex",
    "   Built a React app with REST API integration and real-time search filtering.",
    "",
    "3. Hangman Game (React)",
    "   Built a responsive word guessing game using React with dynamic state management and interactive UI.",
    "",
    "4. Pomodoro Timer App",
    "   Created a customizable productivity timer using React hooks with session management and responsive UI.",
  ],
  contact: [
    "Email: condellp@gmail.com",
    "GitHub: https://github.com/rubbishspitfire",
    "LinkedIn: https://www.linkedin.com/in/patiencecondell/",
  ],
};

function App() {
  const [history, setHistory] = useState([
    "Welcome to my terminal portfolio.",
    "Type 'help' to see available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  const handleCommand = (rawInput) => {
    const cmd = rawInput.trim().toLowerCase();
    if (!cmd) return;

    let output = [`visitor@patience:~$ ${rawInput}`];

    switch (cmd) {
      case "help":
      case "about":
      case "skills":
      case "projects":
      case "contact":
        output = [...output, ...COMMANDS[cmd], ""];
        break;

      case "resume":
        output = [...output, "Opening resume...", ""];
        openLink(resume);
        break;

      case "github":
        output = [...output, "Opening GitHub...", ""];
        openLink("https://github.com/rubbishspitfire");
        break;

      case "linkedin":
        output = [...output, "Opening LinkedIn...", ""];
        openLink("https://www.linkedin.com/in/patiencecondell/");
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        output = [
          ...output,
          `Command not found: ${cmd}`,
          "Type 'help' to see available commands.",
          "",
        ];
    }

    setHistory((prev) => [...prev, ...output]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="app">
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="title">patience-terminal</span>
        </div>

        <div className="terminal-body">
          {history.map((line, index) => (
            <div key={index} className="terminal-line">
              {line}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="input-row">
            <span className="prompt">visitor@patience:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="terminal-input"
              autoFocus
            />
          </form>

          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}

export default App;