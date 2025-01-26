import {React, useEffect} from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";

import styles from './modal.module.css';

import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = (props) => {

    function escPress(e) {
        if (e.key === "Escape") {
            if (props.onEscPress) {
            props.onEscPress();
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escPress);
        return () => {
            document.removeEventListener("keydown", escPress);
        };
    }, []);


    return ReactDOM.createPortal(
        props.isOpen &&
        <>
            <ModalOverlay onOverlayClick={props.onOverlayClick}/>
            <div className={`${styles.modal} p-10 pb-15`}>
                <ModalHeader isOpen={props.isOpen} heading={props.heading} onClose={props.onClose}/>
                {props.children}
            </div>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    onEscPress: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    heading: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default Modal;