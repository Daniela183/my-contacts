import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

import { Overlay } from "./styles";

export default function Loader({isLoading}) {
    if(!isLoading){
        return null
    }
    return ReactDom.createPortal(
        <Overlay>
            <div className="loader"/>
        </Overlay>,
        document.getElementById("loader-root")
    );
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};
