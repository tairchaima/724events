import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const ModalEvent = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened);

  return (
    <>
      {children({ isOpened, setIsOpened })}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)}
              aria-label="Fermer la fenêtre modale"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

ModalEvent.propTypes = {
  opened: PropTypes.bool.isRequired,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
};

export default ModalEvent;
