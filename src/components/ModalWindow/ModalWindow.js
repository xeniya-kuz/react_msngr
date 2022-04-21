import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { changeChatName, deleteChat, deleted } from "../../store/chatList/actions"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import './ModalWindow.sass'

export function ModalWindow({ item, setModalIsShown }) {
    const dispatch = useDispatch();
    const [changingChatName, setChangingChatName] = useState();
    const [changeInputIsShown, setChangeInputIsShown] = useState(false);
    const [chatName, setChatName] = useState('');

    const handleChangeName = (e) => {
        setChatName(e.target.value);
    }

    const handleDeleteChat = (id) => {
        dispatch(deleted(true));
        dispatch(deleteChat(id));
        setModalIsShown(false);
    }

    const handleChangeChatName = (id) => {
        setChangingChatName(id);
        setChangeInputIsShown((prevState) => !prevState);

        if (chatName !== '') {
             dispatch(changeChatName(id, chatName));
        }
        setChatName('');
    }

    return (
        <div className={'modalWindow'}>
            <div className="modalWindow__content" >
                <Button name={"Удалить"} inputType="button" onPress={() => handleDeleteChat(item)}></Button>
                <Button name={changeInputIsShown && chatName === "" ? "Скрыть форму" : "Изменить название"} inputType="button" onPress={() => handleChangeChatName(item)}></Button>
                {changingChatName === item && changeInputIsShown && <Input placeholder='Впишите название чата' name={chatName} handleChange={handleChangeName} ></Input>}
            </div>
        </div>
    )
} 