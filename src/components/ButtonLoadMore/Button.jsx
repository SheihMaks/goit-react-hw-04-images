import PropTypes from 'prop-types';
import { ButtonLoad } from "./Button.styled"

export const Button=({title,onClick})=>{
    return (<ButtonLoad onClick={onClick}>{title}</ButtonLoad>)
}

Button.propTypes={
    title:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired,
}