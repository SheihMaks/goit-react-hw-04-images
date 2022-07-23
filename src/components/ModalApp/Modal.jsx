import React from "react";
import PropTypes from 'prop-types';
import { ModalWindow, Overlay,ModalImage } from "./Modal.styled"

export const Modal=({onCloseModal,imageModal})=>{
        return(<Overlay onClick={onCloseModal}>
    <ModalWindow>
    <ModalImage src={imageModal} alt="" />
    </ModalWindow>
</Overlay>)
}

Modal.propTypes={
    imageModal:PropTypes.string.isRequired,
    onCloseModal:PropTypes.func.isRequired,
}
