import styles from './modal-overlay.module.css';

import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div className={styles.modalOverlay} onClick = {props.onOverlayClick}>
        </div>
    )
}

ModalOverlay.propTypes = {
    onOverlayClick: PropTypes.func.isRequired
}

export default ModalOverlay