import { useState, useEffect } from "react";
import Braet from "./Braet";
import Status from "./Status";

// Hvor mange par kort der skal være i spillet
const antalPar = 4;

// Laver kortene og blander dem
function lavKort() {
  const kortListe = [];

  // Hvert tal skal bruges to gange, så der er et par at finde
  for (let tal = 0; tal < antalPar; tal++) {
    kortListe.push({ id: tal * 2, tal: tal });
    kortListe.push({ id: tal * 2 + 1, tal: tal });
  }

  // Blander kortene tilfældigt (det gjorde _.shuffle før).
  // Vi går bagfra og bytter hvert kort med et tilfældigt kort foran det
  for (let i = kortListe.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const gemt = kortListe[i];
    kortListe[i] = kortListe[j];
    kortListe[j] = gemt;
  }

  return kortListe;
}

function App() {
  // Kortene bliver lavet og blandet, når siden starter
  const [alleKort, setAlleKort] = useState(lavKort);

  // Id'erne på de kort der er vendt lige nu (højst to ad gangen)
  const [viste, setViste] = useState([]);

  // Tallene på de par som spilleren allerede har fundet
  const [loeste, setLoeste] = useState([]);

  // Hvor mange gange man har vendt to kort
  const [traek, setTraek] = useState(0);

  // Spillet er vundet, når alle par er fundet
  const erVundet = loeste.length === antalPar;

  // Hvis to kort er vendt og ikke matcher, vender de tilbage efter et sekund
  useEffect(() => {
    if (viste.length !== 2) {
      return;
    }

    const foerste = alleKort.find((k) => k.id === viste[0]);
    const andet = alleKort.find((k) => k.id === viste[1]);

    // Matcher de, skal de blive liggende
    if (foerste.tal === andet.tal) {
      return;
    }

    const timer = setTimeout(() => setViste([]), 1000);

    // Rydder timeren op, hvis man når at klikke inden for det sekund
    return () => clearTimeout(timer);
  }, [viste, alleKort]);

  // Kører hver gang man klikker på et kort
  function haandterKlik(kort) {
    // Kort der er løst, må man ikke klikke på mere
    if (loeste.includes(kort.tal)) {
      return;
    }

    // Hvis kortet allerede er vendt, sker der ingenting
    if (viste.includes(kort.id)) {
      return;
    }

    // Hvis der ikke er vendt noget (eller to kort er vendt),
    // starter vi et nyt forsøg. De gamle kort vender så tilbage.
    if (viste.length !== 1) {
      setViste([kort.id]);
      return;
    }

    // Hvis vi når hertil, er det det andet kort i forsøget.
    // Først finder vi det første kort, så vi kan sammenligne
    const foersteKort = alleKort.find((k) => k.id === viste[0]);

    // Nu vender vi begge kort, og det tæller som ét træk
    setViste([foersteKort.id, kort.id]);
    setTraek(traek + 1);

    // Hvis de har samme tal, er det et par, og så gemmer vi det
    if (foersteKort.tal === kort.tal) {
      setLoeste([...loeste, kort.tal]);
    }
  }

  // Starter forfra: nye blandede kort og nulstillet tilstand
  function nytSpil() {
    setAlleKort(lavKort());
    setViste([]);
    setLoeste([]);
    setTraek(0);
  }

  return (
    <div>
      <h1>Vendespil</h1>
      <Status traek={traek} erVundet={erVundet} onNytSpil={nytSpil} />
      <Braet
        alleKort={alleKort}
        viste={viste}
        loeste={loeste}
        onKortKlik={haandterKlik}
      />
    </div>
  );
}

export default App;