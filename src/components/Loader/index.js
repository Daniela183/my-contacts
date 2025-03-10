import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

import { Overlay } from "./styles";
import Spinner from "../Spinner";

export default function Loader({isLoading}) {
    if(!isLoading){
        return null
    }
    return ReactDom.createPortal(
        <Overlay>
            <Spinner size={90}/>
        </Overlay>,
        document.getElementById("loader-root")
    );
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};
