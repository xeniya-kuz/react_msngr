import "./Input.sass"
export function Input({ placeholder, value, handleChange }) {


    return (
        <input className="input" value={value} onChange={handleChange} placeholder={placeholder}></input>
    )
}