// Viser hvor mange træk man har brugt, og om man har vundet
function Status({ traek, erVundet, onNytSpil }) {
  return (
    <div className="status">
      <p className="status-traek">Træk: {traek}</p>

      {/* Beskeden vises kun, hvis alle par er fundet */}
      {erVundet && (
        <p className="status-vundet">Du vandt på {traek} træk! 🎉</p>
      )}

      <button className="status-knap" onClick={onNytSpil}>
        Nyt spil
      </button>
    </div>
  );
}

export default Status;