import {useState} from "react";
import PropTypes from 'prop-types';
import {ImSearch} from "react-icons/im";
import { SearchBarContainer,SearchForm,SearchFormInput,SearchFormButton } from "./SearchBar.styled";

export const SearchBar=({onSubmit})=>{
    
    const [searchPicture,setSearchPictures]=useState(()=>{
        return JSON.parse(sessionStorage.getItem("query")) ?? '';
    })
    
    const onInputSearch=(e)=>{
        setSearchPictures(e.currentTarget.value)
    }

    const onClickSearch=(e)=>{
        e.preventDefault()
        onSubmit(searchPicture)
    }

    return(<SearchBarContainer>
    <SearchForm 
    onSubmit={onClickSearch}>
    <SearchFormButton
    type='submit'>
    <ImSearch/>
    </SearchFormButton>
    <SearchFormInput
    type='text'
    name='searchPicture'
    placeholder="Enter something for search pictures"
    onChange={onInputSearch}
    value={searchPicture}
    />
    </SearchForm>
    </SearchBarContainer>)
    }

    SearchBar.propTypes={
        onSubmit:PropTypes.func.isRequired,
    }