# react-steafish

This simple plugin will enable your application having in-context translated text in your application. It will also make it simple to do translation of the texts to other languages.


# How does it work?


```
import React from "react";
import {Translate, TranslateContext, TranslateMessage} from 'react-steafish'
//Place your translated strings in a file that can be imported
import {allStrings} from "./assets/Strings";

function App() {
const valueObj = {
strings: allStrings,
language_id: 'it'
}

return (
<TranslateContext.Provider className="App" value={valueObj}>
<header className="App-header">
This is a header
</header>
<p>{TranslateMessage(valueObj, 'TestMessage', 'message_string_id')}</p>
<Translate sid="test_string_id">A test string that will be sent to https://steafish.com</Translate>
</TranslateContext.Provider>
);
}
```
Another requirement before you start using the steafish-library is the string.js and the env-file. First of all the String.js can be placed in a folder under the src-folder. Let us call this foler assets. Before there is any translated strings the content of this file can be the following:

src/asset/Strings.js
```
const allStrings = [];
export {allStrings}
```

In the root of your project folder you need to add the following in your env-file, and since it will only be used during development, your can name this file .env.local

The content of your .env.local file will have three lines. The first  line describes the access-key that you will obtain from http://www.steafish.com
The second line describes the source language of your strings in your tags. The last line describes the languages it is required to translate to. In the example below it is required to translate from English and translate to Dutch, Danish and Italian.

.env.local
```
REACT_APP_STEAFISH_ACCESS_KEY=********************
REACT_APP_STEAFISH_SRC_LANGUAGE_ID=en
REACT_APP_STEAFISH_TRANSLATE_TO_LANGUAGE_IDS=nl,dk,de
```
## Translated strings
To make your translated strings available for App.js, place your translated strings in a folder under src and name it assets
the content of strings.js should be:
src/asset/Strings.js
```
const allStrings = [
        {"string_id":"message_string_id", "category_id": "front_page_of_app", "string": "Message: Here it is...", "language_id": "en"},
        {"string_id":"message_string_id", "category_id": "front_page_of_app", "string": "Messagio: Qui allora...", "language_id": "it"},
        {"string_id":"test_string_id", "category_id": "front_page_of_app", "string": "That is a word...", "language_id": "en"},
        {"string_id":"test_string_id", "category_id": "front_page_of_app", "string": "Quello e un parole", "language_id": "it"}];

export {allStrings}
```

## In your components

Use the tag <translation></translate> in your components in the follwing way:
```
<template>
...
<translate cid="optional-category" sid="string-id-for-your-string">String that will be visible</translate>
...
</template>
```
(the cid-attribute is a optional).

### What attributes do I need?

You are required to have sid as a parameter like the following:
 ```
<translate sid="i_like_react">I really like React</translate>
```
The parameter sid is used to fetch your translated strings when you deploy your app into production
### Special cases

In somecases you would have a sting that looks like this
```
"In many places January is {summer_or_winter}"
```

Using the tag above will not do a correct translation. Do the following:

```
<div>{{placesInJanuary()}}</div>
...


    function placesInJanuary(){
        const string = this.getMessage('In many places January is {summer_or_winter}', 'string-id-for-your-string', 'optional-category', this.$getLanguage());
        const summer = this.getMessage('summer', 'string-id-for-summer', this.$getLanguage());
        const winter = this.getMessage('winter', 'string-id-for-winter', this.$getLanguage());
        if(southernHemisphere(this.getLanguage()))
            return string.replace('{summer_or_winter}',summer);
        else{
            return string.replace('{summer_or_winter}',winter);
        }    
    }    
</script>
```
In some cases the translate tag cannot be used. In these cases we can use a computed variable or use the this.$getMessage(...) directly. The this.$getMessage(...) string "In many places January is {summer_or_winter}". In return it will give the translated string if that exsists. We do the same for the translation for both summer and winter. Depending upon if the language stems from countries at the southers hemisphere or not, the translated string is returned, where the correct season is returned.

From the above we can conclude that there is a good idea to use a language-code that includes the country-code, like this:
```
    language = languageCode + '-' + countryCode;
```

## In production

With a import-statement you can get all of your translations into memory while running in production environment. If you do not like that you can read it from Firebase or your own server. You decide the location of your strings.

## While developing

1. Use it as it was a ordinary non-blocking-tag (not breaking the line of elements). It does not have any styling. This means that you are in control of the styling.
3. Use your server/database for your translations. In the setup you decide where the strings should be recorded. You write the strings in program-code, and your strings will be recorded in the way you specify. Note that the strings will be recorded in the language you specify. This will be your source language
4. When you are ready, you can translate your strings in your application, just by setting two variables, all of your strings are editable in the language you require


The setup options will be exlained in more detailed below. First of all you should do some basic tests before using it in your application

# Project setup

Install the component using npm or using your gui. Here is how you would do it using npm:
```
npm install react-steafish
```

## Use it in your project

The component will need to be imported and initiated. The basic initiation is done in mail.js

### Initial configuration

In your App.js you need to include the following:
```
import translater from 'react-steafish'
```
##### Webhooks
When the translator or the previewer presses "Translation done" or "Preview done" a webhook is triggered, where a post is sent to the address that you specify.This means that your can create a function in your system that should start downloading the strings from Steafish when the translation is done.

##### Get all strings
At any point in time you can get your strings at the following address:
```
const url = 'http://www.steafish.com/api/allstrings';
const api_key = '*****GET YOUR KEY FROM THE ADMIN USER WHEN LOGGED INTO STEAFISH ********';
let props = {
    headers:{
        Authorization : 'Bearer '+api_key
    }
};
axios.get(url, props).then((result) => {
  console.log("Result: ", result);
});  
```
## Read more
[This documentation is also available at www.steafish.com](https://www.steafish.com/#/documentation). The site offers a free web based application for translate your text in context.
