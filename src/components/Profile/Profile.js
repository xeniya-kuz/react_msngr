import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from 'react';
import { changeName } from "../../store/profile/actions";
import { getProfileName } from "../../store/profile/selectors";
import { Button } from "../Button/Button";

export function Profile() {
    // так нельзя, потому что в мы напрямую изменяет стор, к тому же Реакт не среагирует на изменение стора и не обновится
    // const state = store.getState();

    const dispatch = useDispatch();

    const name = useSelector(getProfileName);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    // value - значение инпута
    const [value, setValue] = useState('');

    const setName = useCallback(() => {
        dispatch(changeName(value));
    }, [dispatch, value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== '') {
            setName(value);
        }
        setValue('');
    };

    return (
        <div>
            <h1>Profile page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                />
                <div>Name = {name}</div>
                <div>
                    <Button addStyle="button__mt20" inputType="submit" name="Change Name" />
                </div>
            </form>
        </div>
    )
}