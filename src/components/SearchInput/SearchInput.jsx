import React from 'react'
import styled from 'styled-components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function SearchInput(props) {
  return (
    <SearchContainer {...props}>
        <SearchOutlinedIcon style={{marginRight: 8}}/>
        <input 
          type= {props.type ? props.type : 'text'}
          placeholder={props.placeholder || ''}
          onClick = {props.onClick}
        ></input>
    </SearchContainer>
  )
}

export default SearchInput

const SearchContainer = styled.div`
    background-color: white;
    width: ${props => props.width || ''};
    height: ${props => props.height || ''};
    border: 1px solid gray;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 12px;

    input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
    }
`
