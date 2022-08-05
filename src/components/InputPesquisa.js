const SearchInput = ({ value, onChange }) => {

    function handleChange(event) {
        onChange(event.target.value)
    }
    return (
        <input type="date" value={value} onChange={handleChange} />
    )
}

export default SearchInput;