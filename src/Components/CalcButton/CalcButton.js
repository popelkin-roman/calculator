import React from "react";

const Button = ({id, content, func}) => {
    return (
        <button className="btn" id = {id} onClick={()=> func(content)}>{content}</button>
    )
}

export default Button;
