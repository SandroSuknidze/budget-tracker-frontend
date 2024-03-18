import Income from "../components/Income.jsx";
import arrowDown from "../assets/arrow-down.svg";
import Expenses from "../components/Expenses.jsx";
import arrowUp from "../assets/arrow-up.svg";
import SearchInput from "../components/SearchInput.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import axiosInstance from "../utils/axios-instance.js";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import pencil from "../assets/pencil.svg";
import trash from "../assets/trash.svg";
import AddCategory from "../components/AddCategory.jsx";
import AddCategoryModal from "../components/AddCategoryModal.jsx";
import {MyContext} from "../App.jsx";

function CategoriesPage() {
    const authState = useAuthHeader();
    const [categories, setCategories] = useState([]);

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const context = useContext(MyContext);

    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOption, setFilterOption] = useState(null);


    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('auto');


    useEffect(() => {
        function fetchCategories() {
            axiosInstance.get('/categories', {
                headers: {
                    Authorization: `${authState}`
                }
            })
                .then(res => {
                    setCategories(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        fetchCategories();
    }, [authState, context.showToaster]);




    useEffect(() => {
        function updateMaxHeight() {
            const windowHeight = window.innerHeight - 215;
            setMaxHeight(windowHeight + 'px');
        }

        window.addEventListener('resize', updateMaxHeight);
        updateMaxHeight();

        return () => window.removeEventListener('resize', updateMaxHeight);
    }, []);


    useEffect(() => {
        let filtered = categories.filter(category =>
            category.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filterOption !== null) {
            filtered = filtered.filter(category => category.type === filterOption);
        }
        setFilteredCategories(filtered);
    }, [searchQuery, filterOption, categories]);


    function handleAddCategoryModal() {
        setShowAddCategoryModal(!showAddCategoryModal);
    }

    function handleFilterOption(option) {
        if (filterOption === option) {
            setFilterOption(null);
        } else {
            setFilterOption(option);
        }
    }

    function handleDelete(id, title) {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if(confirmDelete) {
            axiosInstance.delete(`/categories/${id}`, {
                headers: {
                    Authorization: `${authState}`
                }
            })
             .then(() => {
                 setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
                 context.toggleToaster(`${title} is successfully removed.`);
             })
             .catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <div>
            <div className={"flex items-center mt-[90px]"}>
                <div className={"w-[78%] flex flex-col mb-auto"}>
                    <div>
                        <div className="w-[55%] mb-auto relative">
                            <SearchInput value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                        </div>
                    </div>
                    <div ref={contentRef}
                         className={"mt-[25px] flex flex-wrap text-[20px] font-bold gap-x-[26px] gap-y-[24px] overflow-y-scroll"}
                         style={{maxHeight: maxHeight, scrollbarWidth: 'none'}}>
                        {filteredCategories.map((category) => (
                            <div key={category.id}
                                 className={`${category.type === 'income' ? 'border-[#21C206]' : 'border-[#EE3F19]'} 
                                            flex justify-between items-center border-2 rounded-xl py-[10px] px-[14px]`}>
                                <div className={"mr-[10px] cursor-pointer"}>
                                    {category.title}
                                </div>
                                {category.is_default === 0 && (
                                    <>
                                        <div className={"mr-[3px] cursor-pointer"}>
                                            <img src={pencil} alt="pencil-icon" className={"w-[20px]"}/>
                                        </div>
                                        <div onClick={() => handleDelete(category.id, category.title)} className={"cursor-pointer"}>
                                            <img src={trash} alt="trash-icon" className={"w-[18px]"}/>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                        <div className={`${filteredCategories.length === 0 ? 'block' : 'hidden'}`}>
                            No records to be displayed
                        </div>
                    </div>
                </div>
                <div className={"w-[22%] pl-[82px] gap-[15px] flex flex-col mb-auto"}>
                    <Income
                        src={arrowDown}
                        alt={"arrow-down-icon"}
                        onClick={() => handleFilterOption('income')}
                        isActive={filterOption === 'income'}
                    />
                    <Expenses
                        src={arrowUp}
                        alt={"arrow-up-icon"}
                        onClick={() => handleFilterOption('expenses')}
                        isActive={filterOption === 'expenses'}
                    />
                    <AddCategory open={handleAddCategoryModal}/>
                </div>
            </div>
            <AddCategoryModal isOpen={showAddCategoryModal} onClose={handleAddCategoryModal}/>
        </div>
    );
}

export default CategoriesPage;