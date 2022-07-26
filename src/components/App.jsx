/* eslint-disable react-hooks/exhaustive-deps */
import {useState,useEffect,} from "react";
import React from "react";
import { Spiner } from './SpinnerApp/Spiner';
import { ToastContainer,toast } from 'react-toastify';
import { SearchBar } from "./SearchBarApp/Searchbar";
import { ImageGallery } from "./ImageGalleryApp/ImageGallery";
import { Button } from "./ButtonLoadMore/Button";
import * as PictureService from "Service/API";
import {UncorrectSearchMessage} from './UncorrectSearchMessageApp/UccorrectSearchMessage';

export const App=()=>{
  const [status,setStatus]=useState('idle');
  const [query,setQuery]=useState('')
    // ()=>{return JSON.parse(sessionStorage.getItem("query")) ?? ''});
  const [searchedPictures,setSearchedPictures]=useState([]);
  const [page,setPage]=useState(1);
  const [totalHits,setTotalHits]=useState('');
  const [imageModal,setImageModal]=useState('');
  const [isVisibleBtn,setIsVisibleBtn]=useState(false);

  useEffect(()=>{
    sessionStorage.setItem("query", JSON.stringify(query))},[query])
  
  useEffect(()=>{
    if(!query) return; 
    setIsVisibleBtn(false)
      setStatus("pending")
    const getPictures= async(page,query)=>{
      try {
      const pictures=await PictureService.fetchPictures(page,query);
      showingButton(pictures)
      setSearchedPictures((prevState)=>[...prevState, ...pictures.hits]);
      setTotalHits(pictures.totalHits)}
      catch { toast.warn('Error')} 
      finally {
        setStatus('resolved')}
    }  
    getPictures(page, query) 
},[page, query])



useEffect(()=>{
  if(page===1) return;
  window.scrollBy({
  top: document.body.scrollHeight,
  behavior: 'smooth',
});
}, [searchedPictures])

const showingButton=(pictures)=>{
  const {per_page}= PictureService.options;
  if (totalHits%per_page===0){
  let lastPage=totalHits/per_page
  pictures.hits.length>=per_page && page !==lastPage ?
  setIsVisibleBtn(true) : setIsVisibleBtn(false)}
  else{pictures.hits.length>=per_page ?
    setIsVisibleBtn(true) : setIsVisibleBtn(false)}}

const onMoreButton=()=>{
    setPage((prev)=>prev+1)
      }
  
  const handleSubmit=(searchData)=>{
      if (query===searchData && query !== '') return;
      if (searchData.trim()===''){
        return toast.warn('Enter Something fo search!')}
      setQuery(searchData);
      setPage(1);
      setSearchedPictures([]);
  }

  const openModal=(largeImgLink)=> {setImageModal(largeImgLink)};

  const closeModal=(ev)=>{
    if (ev.key ==='Escape' || ev.target === ev.currentTarget){
      setImageModal('');
      }
  };
 
  return (<><SearchBar onSubmit={handleSubmit}/>
    {searchedPictures.length !== 0 && <ImageGallery 
    searchedPictures={searchedPictures}
    openModal={openModal}
    closeModal={closeModal}
    imageModal={imageModal}
    />}
    {isVisibleBtn && <Button
      type='button' 
      onClick={onMoreButton}
      title='Load more'/>}
    {status==='pending' && <Spiner/>}
    {status==="resolved" && searchedPictures.length === 0 && <UncorrectSearchMessage 
    message='Sorry, no results were found for your search'/>}
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      </>)}

