import React, {useContext} from 'react';
import axios from 'axios';


const TranslateContext = React.createContext({strings : []});

function Translate(props) {
    const valueObj = useContext(TranslateContext);
    const href = window.location.href;
    const stringObj = valueObj.strings instanceof Array && valueObj && valueObj.strings ? valueObj.strings.filter(string => string.language_id === valueObj.language_id && string.string_id === props.sid) : null;
    let translatedString = stringObj && stringObj.length > 0 ? stringObj[0].string : null;
    let span = null;

    if(!translatedString){
        translatedString=props.children;
        if (process.env.REACT_APP_STEAFISH_ACCESS_KEY) {
            translatedString = props.children;
            const baseURL = 'https://www.steafish.com/api/string';
            const apiKey = process.env.REACT_APP_STEAFISH_ACCESS_KEY
            const stringObj = {
                string_id: props.sid,
                language_id: null,
                string: props.children,
                context: href,
                project_name: null,     //TODO: Enter the name of the project
                src_language: process.env.REACT_APP_STEAFISH_SRC_LANGUAGE_ID,
                language_ids: process.env.REACT_APP_STEAFISH_TRANSLATE_TO_LANGUAGE_IDS ? process.env.REACT_APP_STEAFISH_TRANSLATE_TO_LANGUAGE_IDS.split(',') : [],
            };
            axios.defaults.withCredentials = true;
            axios.post(baseURL, stringObj, {headers: {Authorization: 'Bearer ' + apiKey}}).then((response) => {
                console.log(response.data);
            });
        }else{
            console.log('react-steafish: Environment variable for the api-key is missing. See documentation')
        }
    }


    const isSelected = href.indexOf('?sid=') > 0 ? props.sid === href.substr(href.indexOf('?sid=') + 5) : false;

    if (isSelected) {
        span = React.createElement('div', {style: {background: "yellow", color: "black"}}, '${translatedString}');
    } else {
        span = React.createElement('div', {style: {background: "inherit"}}, '${translatedString}');
    }
    /*}*/
    return (
        /*<div style={{background: isSelected ? "yellow" : "inherit"}}>
            {span}
        </div>*/

        span
    )
}


function TranslateMessage(valueObj, string, string_id){
    const stringObj = valueObj && valueObj.strings instanceof Array && valueObj && valueObj.strings ? valueObj.strings.filter(string => string.language_id===valueObj.language_id && string.string_id===string_id):null;
    let translatedString = stringObj && stringObj.length>0?stringObj[0].string:null;

    if(!translatedString) {
        translatedString = string;
        if(process.env.REACT_APP_STEAFISH_ACCESS_KEY) {
            const baseURL = 'https://www.steafish.com/api/string';
            const apiKey = process.env.REACT_APP_STEAFISH_ACCESS_KEY
            const stringObj = {
                string_id: string_id,
                language_id: valueObj && valueObj.language_id ? valueObj.language_id : null,
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
        }else{
            console.log('react-steafish: Environment variable for the api-key is missing. See documentation')
        }
    }
    return translatedString;
}



export {Translate, TranslateMessage, TranslateContext}