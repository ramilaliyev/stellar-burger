import React, { ReactNode, useEffect} from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

if (!modalRoot) throw new Error("Ошибка! Не найден modal-root");

type TModalProps = {
    onEscPress?: () => void;
    isOpen?: boolean;
    onOverlayClick?: () => void;
    heading?: string;
    onClose?: () => void;
    children?: ReactNode;
};

const Modal = (props : TModalProps) : React.JSX.Element => {

    function escPress(e: KeyboardEvent ) : void {
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

export default Modal;