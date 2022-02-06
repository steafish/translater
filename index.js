import Translate from  './Translate.js'
import TranslateContext from  './TranslateContext.js'
import TranslateMessage from "./TranslateMessage";

const steafish = () => {
    return {
        Translate: Translate,
        TranslateContext: TranslateContext,
        TranslateMessage: TranslateMessage
    }
}
export default steafish()