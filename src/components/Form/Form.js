import React, { useRef, useState, useEffect} from 'react';
import {  addMessageWithReply} from "../../store/messages/actions"
import {  useDispatch } from "react-redux";
import { AUTHORS } from '../../utils/constants';
import './Form.sass';
import { Button } from '../Button/Button';


export const Form = ({ chatId }) => {
    let [value, setValue] = useState('');
    const inputRef = useRef();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => { inputRef.current?.focus() }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value !== '') {
            const user = {
                author: AUTHORS.user,
                text: value,
            };
            dispatch(addMessageWithReply(chatId, user));
        }

        inputRef.current?.focus();
        setValue('');
    }

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <input className='form__input' type="text" value={value}
                    ref={inputRef}
                    placeholder='Введите сообщение' onChange={handleChange}>
                </input>
                <Button addStyle='button__mt20 button__submit' onChange={handleChange} inputType="submit" name='Отправить' />
            </form>
        </>
    )
}