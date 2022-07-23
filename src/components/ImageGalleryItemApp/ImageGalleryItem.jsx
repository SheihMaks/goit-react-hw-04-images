import React from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/ModalApp/Modal";
import { ImageGalleryItemContainer,Img } from "./ImageGalleryItem.styled"

export const ImageGalleryItem=({webFormat,closeModal,imageModal,largeImgLink,onOpenModal})=>{
    return (<ImageGalleryItemContainer>
       <Img 
       src={webFormat} 
       alt="Picture" 
       onClick={()=>onOpenModal(largeImgLink)} />
       {imageModal !=='' && <Modal 
       imageModal={imageModal} 
       onCloseModal={closeModal}/>}
        </ImageGalleryItemContainer>
        )
}

ImageGalleryItem.propTypes={
webFormat:PropTypes.string.isRequired,
largeImgLink:PropTypes.string.isRequired,
onOpenModal:PropTypes.func.isRequired,
}