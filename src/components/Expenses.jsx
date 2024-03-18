
function Expenses({src, alt, onClick, isActive}) {
    return (
        <div onClick={onClick}
             className={`${isActive && 'border-black'} flex border border-solid bg-white rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer`}>
            <div className={"sm-circle bg-[#EE3F19] p-[5px]"}>
                <img src={src} alt={alt}/>
            </div>
            <div className="mt-auto mb-auto">
                Expenses
            </div>
        </div>
    );
}

export default Expenses;