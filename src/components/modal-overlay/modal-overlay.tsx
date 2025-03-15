import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
    onOverlayClick?: () => void;
}

const ModalOverlay = (props: TModalOverlayProps): React.JSX.Element => {
    return (
        <div className={styles.modalOverlay} onClick = {props.onOverlayClick}>
        </div>
    )
}

export default ModalOverlay;