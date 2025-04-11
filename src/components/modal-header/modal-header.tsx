import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal-header.module.css";

type TModalHeaderProps = {
    heading?: string;
    isOpen: boolean;
    onClose?: () => void;
}

const ModalHeader = (props : TModalHeaderProps) : React.JSX.Element => {
    return (
        <>
            <div className={styles.modalHeader}>
                <h2 className="text text_type_main-large">{props.heading}</h2>
                <div className={styles.closeBtn} onClick={props.onClose} data-testid="close-btn">
                    <CloseIcon type="primary"/>
                </div>
            </div>
        </>
    )
}

export default ModalHeader;