import { MessagesList } from '../MessageList/MessageList';
import { Form } from '../Form/Form';
import { useRef, useEffect } from 'react';
import { Navigate, useParams } from "react-router";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { deleted } from "../../store/chatList/actions"
import './ChatItem.sass'
import { getDeleted } from "../../store/chatList/selectors";
import { getMessages } from "../../store/messages/selectors";


export function ChatItem() {

    // Хук useParams предоставляет нам доступные параметры url и обеспечивает обновление компонента при их изменении
    const { chatId } = useParams();
    //???
    const parentRef = useRef();
    // Автоматически обновляет данные в компоненте при их изменении в сторе, сравнивает ссылки на старые и на новые данные
    //const chatMessages = useSelector(state => state.messages.messageList);

    //функция для изменения данных в сторе
    const dispatch = useDispatch();

    const chatMessages = useSelector(getMessages, shallowEqual);
    const deletedFlag = useSelector(getDeleted);

    useEffect(() => {
        if (deletedFlag) {
            dispatch(deleted(false));
        }

    }, [deletedFlag]);

    if (deletedFlag) {
        return <Navigate replace to="/chats" />;
    } else if (!chatMessages[chatId]) {
        return <Navigate replace to="/*" />;
    }

    return (
        <div ref={parentRef} className='chat__form'>
            <MessagesList chatId={chatId}></MessagesList>
            <Form chatMessages={chatMessages} chatId={chatId} />
        </div>

    )
}