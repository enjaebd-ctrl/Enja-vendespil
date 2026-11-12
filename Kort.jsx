// Et enkelt kort
function Kort({ tal, erVist, erLoest, onKlik }) {
  // Vi starter med klassen "card" og tilføjer de andre klasser efter behov.
  // "show" vender kortet, og "done" gør det grønt (det styrer main.css)
  let klasser = "card";

  if (erVist) {
    klasser = klasser + " show";
  }

  if (erLoest) {
    klasser = klasser + " done";
  }

  return (
    <li className={klasser} onClick={onKlik}>
      <span className="front">Card</span>
      <span className="back">{tal}</span>
    </li>
  );
}

export default Kort;