interface Props {
  onContinue: () => void;
  onLeave: () => void;
}

export default function ConfirmModal({ onContinue, onLeave }: Props) {
  return (
    <div className="overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="leave-title">
        <h3 id="leave-title">Leave the quiz?</h3>
        <p>If you go back to the home page, your progress will be reset and you will start from the beginning.</p>
        <div className="actions">
          <button className="btn" onClick={onContinue}>Continue quiz</button>
          <button className="btn ghost" onClick={onLeave}>Go to home</button>
        </div>
      </div>
    </div>
  );
}
