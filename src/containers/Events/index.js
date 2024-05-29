import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import { useData } from "../../contexts/DataContext";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  // 2 var : type et currentPage
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error } = useData();

  const filteredEvents = ( // stockes dans filteredEvents
    (!type
      ? data?.events // si pas de type, sélectionne les tous
      : data?.events.filter(event => event.type === type)) || [] // sinon filtre les events en fonction du type
  ).filter((_, index) => { // n'affiche qu'un certain nombre d'event en fonction de PER_PAGE
    if (
      (currentPage - 1) * PER_PAGE <= index && // si l'index fait partie de la plage de la page et
      PER_PAGE * currentPage > index // si que l'event est > à l'index ( donc ce qui reste )
    ) {
      return true; // ne filtre pas l'event'
    }
    return false; // filtre l'event
  });

  const changeType = (evtType) => { // quand le dropDown renvoi un changement de type
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1; // définit le numéro de page
  const typeList = new Set(data?.events.map((event) => event.type)); // création de la liste de catégorie (avec un Set pour éviter les doublons)

  return (
    <div data-testid="event-list">
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <div className="categoryContainer">
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 1)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;