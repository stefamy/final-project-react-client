import React from "react";
import Modal from 'react-bootstrap/modal'

const handleYes = (yes, close) => {
  yes();
  close();
}

const ModalConfirm = ({headerText, bodyText, show, handleClose, yesText, yesFunction, yesBtnClass, noBtnClass, noText}) =>

        <Modal show={show} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{headerText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{bodyText}</Modal.Body>
          <Modal.Footer>
            <button className={noBtnClass || "btn btn-secondary"} onClick={() => handleClose()}>
              {noText}
            </button>
            <button className={yesBtnClass || "btn btn-primary"} onClick={() => handleYes(yesFunction, handleClose)}>
              {yesText}
            </button>
          </Modal.Footer>
        </Modal>



export default ModalConfirm;
