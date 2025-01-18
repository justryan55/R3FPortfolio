import "./style.css";

export default function Fallback() {
  return (
    <div className="loading-text-container">
      <p className="loading-text">Loading</p>
      <span className="loading-dots">
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </span>
    </div>
  );
}
