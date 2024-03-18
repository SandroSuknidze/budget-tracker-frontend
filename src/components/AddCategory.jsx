import plusIcon from "../assets/raw-plus-icon.svg";

function AddCategory({open}) {
    return (
        <div onClick={open}
             className="flex border border-solid bg-[#B9E2E6] rounded-[10px] py-[5px] px-[11px] gap-[7px] cursor-pointer">
            <div className={"sm-circle bg-white p-[5px]"}>
                <img src={plusIcon} alt="plus-icon"/>
            </div>
            <div className="mt-auto mb-auto">
                Add Category
            </div>
        </div>
    );
}

export default AddCategory;
