import { Outlet } from "react-router-dom";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import './ChatList.sass'
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addChat} from "../../store/chatList/actions"
import { getChatList } from "../../store/chatList/selectors";
import { ModalWindow } from "../ModalWindow/ModalWindow";



export function ChatList() {

    //с использованием хука, но у него есть минусы:
    // Повторение кода (селектор для имени профиля используется дважды в разных компонентах, и каждый раз создается новая стрелочная функция)
    // react-redux не может закэшировать результат вызова селектора, т.к. функция-селектор каждый раз создается заново
    //const chats = useSelector(state => state.chatList.chatList);
    
    const dispatch = useDispatch();

    //С использование selectors
    //shallowEqual - т.к. в UseSelectors используется ссылочное сравнение старых и новых данных, иногда компонент может обновляться лишний раз
    //shallowEqual - функция для поверхностного сравнения двух значений(старого и нового) и лишний раз не вызывается)
    const chats = useSelector(getChatList, shallowEqual);

    //для показа модального окна
    const [modalIsShown, setModalIsShown] = useState(false);
    const [modalId, setModalId] = useState();
    const modalCkickHandler = (id) => {
        setModalIsShown((prev) => !prev);
        setModalId(id);
    }

    //для показа инпута
    const [addInputIsShown, setAddInputIsShown] = useState(false);    


    const [value, setValue] = useState('');

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    }

    const inputRef = useRef();

    const handleAddChat = (e) => {
        e.preventDefault();

        setAddInputIsShown(!addInputIsShown);

        if (value !== '') {
            dispatch(addChat(value));
        }

        setValue('');
        inputRef.current?.focus();
    }


    return (
        <>
            <div className="flex">
                <ul className="list">
                    <h3>Список чатов</h3>
                    {chats.map(chat => (
                        <span key={chat.id}>
                            <li className="list__li">
                                <NavLink className="list__link"
                                    style={({ isActive }) => ({ className: isActive ? "active" : "" })}
                                    to={`/chats/${chat.id}`} >
                                    {chat.name}
                                </NavLink>
                                <div className="list__modal" >
                                    <div className="list__modal__mark"
                                        onClick={() => modalCkickHandler(chat.id)}
                                    >:
                                    </div>
                                    {modalIsShown && modalId === chat.id && <ModalWindow active={modalIsShown} item={chat.id} setModalIsShown={setModalIsShown}></ModalWindow>}

                                </div>
    

                            </li>
                        </span>
                    ))}
                    <form onSubmit={handleAddChat}>
                        <Button addStyle="button__mt20" inputType="submit" name={addInputIsShown && value === "" ? "Скрыть форму" : "Добавить"}></Button>
                        <div className="list__input">
                            {addInputIsShown && <Input placeholder='Впишите название чата' value={value} handleChange={handleChangeValue} />}
                        </div>
                    </form>
                </ul>
                <Outlet />
            </div>

        </>
    )
}