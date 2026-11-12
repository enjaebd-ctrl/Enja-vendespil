import Kort from "./Kort";

// Braet viser alle kortene i en liste
function Braet({ alleKort, viste, loeste, onKortKlik }) {
  return (
    <ul id="cards">
      {alleKort.map((kort) => {
        // Et kort er løst, hvis dets tal er blandt de fundne par
        const erLoest = loeste.includes(kort.tal);

        // Et kort er vendt, hvis det er valgt lige nu eller er løst
        const erVist = viste.includes(kort.id) || erLoest;

        return (
          <Kort
            key={kort.id}
            tal={kort.tal}
            erVist={erVist}
            erLoest={erLoest}
            onKlik={() => onKortKlik(kort)}
          />
        );
      })}
    </ul>
  );
}

export default Braet;