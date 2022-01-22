//import React from 'react';
//import {  useLocation} from "react-router-dom";
import axios from 'axios';


export default function translateMessage(string, string_id){
    const translatedString = string;
    if(process.env.REACT_APP_STEAFISH_ACCESS_KEY) {
        //React.useEffect(() => {
        const baseURL = 'https://www.steafish.com/api/string';
        const apiKey = process.env.REACT_APP_STEAFISH_ACCESS_KEY
        const stringObj = {
            string_id: string_id,
            language_id: null,
            string: string,
            context: window.location.href,
            project_name: null,     //TODO: Enter the name of your project
            src_language: process.env.REACT_APP_STEAFISH_SRC_LANGUAGE_ID,                //TODO: Enter the source language for your project
            language_ids: process.env.REACT_APP_STEAFISH_TRANSLATE_TO_LANGUAGE_IDS ? process.env.REACT_APP_STEAFISH_TRANSLATE_TO_LANGUAGE_IDS.split(',') : [],
        };
        axios.defaults.withCredentials = true;
        axios.post(baseURL, stringObj, {headers: {Authorization: 'Bearer ' + apiKey}}).then((response) => {
            console.log(response.data);
        });
    }
    //}, [props]);
    return translatedString;
}