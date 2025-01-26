import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal-header.module.css";

import PropTypes from 'prop-types';


const ModalHeader = (props) => {
    return (
        <>
            <div className={styles.modalHeader}>
                <h2 className="text text_type_main-large">{props.heading}</h2>
                <div className={styles.closeBtn} onClick={props.onClose}>
                    <CloseIcon />
                </div>
            </div>
        </>
    )
}

ModalHeader.propTypes = {
    heading: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default ModalHeader;