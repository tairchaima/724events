import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(() => resolve(), 1000); })

const Form = ({ onSuccess = () => {}, onError = () => {} }) => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false); // Nouvel état pour suivre l'état de succès

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
    
      try {
        await mockContactApi();
        setSending(false);
        setSuccess(true); // Marquer le succès après l'envoi réussi
        onSuccess(); // Call onSuccess callback upon successful submission
      } catch (err) {
        setSending(false);
        onError(err); // Call onError callback if an error occurs
      }
    },
    [onSuccess, onError]
  );

  useEffect(() => {
    const sendingState = localStorage.getItem("sending");
    if (sendingState === "true") {
      setSending(true);
      localStorage.removeItem("sending");
    }
  }, []);

  useEffect(() => {
    if (sending) {
      localStorage.setItem("sending", "true");
    } else {
      localStorage.removeItem("sending");
    }
  }, [sending]);

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Votre message ici..."
            label="Message" // Ajout de l'étiquette associée au champ de message
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
      {success && ( // Afficher le message de succès uniquement lorsque success est vrai
        <div className="success-message">Message envoyé avec succès!</div>
      )}
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default Form;
