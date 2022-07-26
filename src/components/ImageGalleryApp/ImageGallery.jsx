
import PropTypes from 'prop-types';
import {ImageGalleryList} from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItemApp/ImageGalleryItem';

export const ImageGallery=({searchedPictures, openModal, closeModal,imageModal})=>{
    return (<ImageGalleryList >
    {searchedPictures.map(el=>{ 
        const {webformatURL,largeImageURL,id}=el;
        return(<ImageGalleryItem key={id} 
        webFormat={webformatURL} 
        onOpenModal={openModal}
        closeModal={closeModal} 
        imageModal={imageModal}
        largeImgLink={largeImageURL}/>)})}
    </ImageGalleryList>)
}

ImageGallery.propTypes={
    searchedPictures:PropTypes.array.isRequired,
}