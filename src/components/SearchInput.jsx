import search from "../assets/search.svg";

function SearchInput({value, onChange}) {
    return (
        <>
            <input value={value} onChange={onChange} type="text" placeholder="Search" className="pt-[15px] px-[48px] pb-[16px] rounded-[10px] w-full"/>
            <img src={search} alt="search-icon" className="w-[22px] h-[22px] absolute top-[15px] left-[20px]"/>
        </>
    );
}

export default SearchInput;