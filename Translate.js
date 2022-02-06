import React, {useContext} from 'react';
//import {  useLocation} from "react-router-dom";
import axios from 'axios';
import {TranslateContext} from "./TranslateContext";

export default function Translate(props){ // extends React.Component {
    //const search = useLocation().search;
    //const location = useLocation();
    //const name = new URLSearchParams(search).get('selected');
    const valueObj = useContext(TranslateContext);
    const href = window.location.href;
    const stringObj = valueObj.strings instanceof Array && valueObj && valueObj.strings ? valueObj.strings.filter(string => string.language_id===valueObj.language_id && string.string_id===props.sid):null;
    let span = null;
    const string = stringObj && stringObj.length>0?stringObj[0].string:null;

    if (string){
        span = <span>{string}</span>
    }else{
        //React.useEffect(() => {
            const baseURL = 'https://www.steafish.com/api/string';
            const apiKey = process.env.REACT_APP_STEAFISH_ACCESS_KEY
            const stringObj = {
                string_id: props.sid,
                language_id: null,
                string: props.children,
                context: href,
                project_name: null,     //TODO: Enter the name of your project
                src_language: process.env.REACT_APP_STEAFISH_SRC_LANGUAGE_ID,                //TODO: Enter the source language for your project
                language_ids : process.env.REACT_APP_STEAFISH_TRANSLATE_TO_LANGUAGE_IDS?process.env.REACT_APP_STEAFISH_TRANSLATE_TO_LANGUAGE_IDS.split(','):[],
            };
            axios.defaults.withCredentials = true;
            axios.post(baseURL, stringObj, {headers : { Authorization : 'Bearer ' + apiKey}}).then((response) => {
                console.log(response.data);
            });
        //}, [props]);
        span= <span>{props.children}</span>
    }

    const isSelected = href.indexOf('?sid=')>0?props.sid===href.substr(href.indexOf('?sid=')+5):false;

    return (
        <div style={{ background: isSelected?"yellow":"inherit" }}>
            {span}
        </div>
    )
}

