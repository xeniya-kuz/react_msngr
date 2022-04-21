import { AUTHORS } from "../../utils/constants";

export const ADD_MESSAGE = "MESSAGES_ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES_DELETE_MESSAGE";
export const CHANGE_MESSAGE = "MESSAGES_CHANGE_MESSAGE";
export const IS_CHANGE_MESSAGE = "MESSAGES_IS_CHANGE_MESSAGE";

export const addMessage = (chatId, message) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text: message.text,
        author: message.author,
    }
});

export const deleteMessage = (chatId, deletingId) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        deletingId,
    },
});

export const changeMessage = (chatId, idToChange, newText) => ({
    type: CHANGE_MESSAGE,
    payload: {
        chatId, idToChange, newText
    }
});

export const isChangingMessage = (change, changeId) => ({
    type: IS_CHANGE_MESSAGE,
    payload: {
        change,
        changeId,

    }
})


let timeout;

// addMessageWithReply - MiddleWare (посредник), где chaId, message - аргументы, dispatch - коллбэк
export const addMessageWithReply = (chaId, message) => (dispatch) => {
    dispatch(addMessage(chaId, message));

    if (message.author !== AUTHORS.bot) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            const bot = {
                author: AUTHORS.bot,
                text: 'Вам ответит первый освободившийся оператор.',
            };
            dispatch(addMessage(chaId, bot));
        }, 1500);
    }
}

