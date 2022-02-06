import axios from 'axios';

export function TranslateMessage(valueObj, string, string_id){
    const stringObj = valueObj && valueObj.strings instanceof Array && valueObj && valueObj.strings ? valueObj.strings.filter(string => string.language_id===valueObj.language_id && string.string_id===string_id):null;
    const translatedString = stringObj && stringObj.length>0?stringObj[0].string:null;

    if(process.env.REACT_APP_STEAFISH_ACCESS_KEY) {
        const baseURL = 'https://www.steafish.com/api/string';
        const apiKey = process.env.REACT_APP_STEAFISH_ACCESS_KEY
        const stringObj = {
            string_id: string_id,
            language_id: valueObj && valueObj.language_id?valueObj.language_id:null,
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
    return translatedString;
}