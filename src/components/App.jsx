import React from "react";
import { Spiner } from './SpinnerApp/Spiner';
import { ToastContainer,toast } from 'react-toastify';
import { SearchBar } from "./SearchBarApp/Searchbar";
import { ImageGallery } from "./ImageGalleryApp/ImageGallery";
import { Button } from "./ButtonLoadMore/Button";
import * as PictureService from "Service/API";
import {UncorrectSearchMessage} from './UncorrectSearchMessageApp/UccorrectSearchMessage';

export class App extends React.Component {
  state={
    status:'idle',
    query:'',
    searchedPictures:[],
    page:1,
    totalHits:'',
    imageModal:'',
    isVisibleBtn: false,
  }

  componentDidMount(){
    window.addEventListener('keydown',this.closeModal)
  }

  componentDidUpdate=(prevProps,prevState)=>{
    const {page,query}=this.state;
    if(query !== prevState.query || page !== prevState.page){
      this.getPictures(page,query)
      }}

  componentWillUnmount(){
        window.removeEventListener('keydown',this.closeModal)
    }
  
  getPictures=async(page,query)=>{
    this.setState({status:"pending",isVisibleBtn:false})
    try {
    const pictures=await PictureService.fetchPictures(page,query);
    this.showingButton(pictures)
    this.setState(prevState=>({
      searchedPictures:[...prevState.searchedPictures,...pictures.hits],
      totalHits:pictures.totalHits,
    }))} catch { toast.warn('Error')} finally {
    this.setState({status:'resolved'})
      }
}

  showingButton=(pictures)=>{
    const {totalHits,page}= this.state;
    const {per_page}= PictureService.options;
    if (totalHits%per_page===0){
    let lastPage=totalHits/per_page
    pictures.hits.length>=per_page && page !==lastPage ?
    this.setState({isVisibleBtn:true}) : this.setState({isVisibleBtn:false})}
    else{pictures.hits.length>=per_page ?
    this.setState({isVisibleBtn:true}) : this.setState({isVisibleBtn:false})}}

  onMoreButton=()=>{
    const {page}= this.state;
    this.setState({page: page +1})
      }
  
  handleSubmit=(searchData)=>{
    const {query}=this.state;
    if (query===searchData && query !== '') return;
    if (searchData.trim()===''){
    return toast.warn('Enter Something fo search!')}
    this.setState({query: searchData, page:1,searchedPictures:[]})
  }

  openModal=(largeImgLink)=> this.setState({imageModal:largeImgLink})

  closeModal=(ev)=>{
    if (ev.key ==='Escape' || ev.target === ev.currentTarget){
        this.setState({imageModal:''})}
  }

  render(){ 
    const {handleSubmit,onMoreButton,openModal,closeModal,}=this;
    const {searchedPictures,status,isVisibleBtn,imageModal}= this.state;
    return (<><SearchBar onSubmit={handleSubmit}/>
    {status==="resolved" && searchedPictures.length !== 0 && <ImageGallery 
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
}
