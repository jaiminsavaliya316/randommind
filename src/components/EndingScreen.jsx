export default function EndingScreen({ ending, onPlayAgain, onBack }) {
  return (
    <div className="page-ending">
      <div className="ending__content">
        <div className="ending__label">THE CAVE</div>
        <h1 className="ending__title">{ending.title}</h1>
        <p className="ending__text">{ending.text}</p>
        <div className="ending__actions">
          <button className="ending__btn ending__btn--primary" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="ending__btn ending__btn--secondary" onClick={onBack}>
            Back to Library
          </button>
        </div>
      </div>
    </div>
  );
}
