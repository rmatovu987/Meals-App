import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.hide}></div>;
};

const Overlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portal = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop hide={props.hide} />, portal)}
      {createPortal(<Overlay>{props.children}</Overlay>, portal)}
    </Fragment>
  );
};

export default Modal;
