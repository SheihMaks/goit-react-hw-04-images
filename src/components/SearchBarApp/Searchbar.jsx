import React from "react";
import {ImSearch} from "react-icons/im";
import { SearchBarContainer,SearchForm,SearchFormInput,SearchFormButton } from "./SearchBar.styled";

export class SearchBar extends React.Component{
    state={
        searchPicture:''
    }

    onInputSearch=(e)=>{
        this.setState({searchPicture:e.currentTarget.value})
    }

    onClickSearch=(e)=>{
        e.preventDefault()
        this.props.onSubmit(this.state.searchPicture)
    }

    render(){
        const {searchPicture}=this.state;
        const {onClickSearch,onInputSearch}=this;
        return(<SearchBarContainer>
<SearchForm onSubmit={onClickSearch}>
<SearchFormButton
type='submit'
><ImSearch/></SearchFormButton>
<SearchFormInput
type='text'
name='searchPicture'
placeholder="Enter something for search pictures"
onChange={onInputSearch}
value={searchPicture}
/>
</SearchForm>
            </SearchBarContainer>
        )
    }
}