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
import transactionsCategoryCheck from "../utils/transactionsCategoryCheck.js";
import ConfirmModal from "../components/confirmModal.jsx";

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
    }, [authState]);




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

    async function handleDelete(id, title) {
        try {
            const hasTransactions = await transactionsCategoryCheck(id, authState);

            console.log(hasTransactions);

            if (hasTransactions) {
                context.toggleToaster(`Category "${title}" can't be removed because it contains information about your expenses.`);
            } else {
                setModalOpen(true);
                setDeletingCategoryId(id);
                setDeletingCategoryTitle(title);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [deletingCategoryId, setDeletingCategoryId] = useState(null);
    const [deletingCategoryTitle, setDeletingCategoryTitle] = useState("");

    const handleConfirmDelete = async () => {
        try {
            await axiosInstance.delete(`/categories/${deletingCategoryId}`, {
                headers: {
                    Authorization: `${authState}`
                }
            });
            setCategories(prevCategories => prevCategories.filter(category => category.id !== deletingCategoryId));
            context.toggleToaster(`Category "${deletingCategoryTitle}" is successfully removed.`);
            setModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <ConfirmModal
                isOpen={modalOpen}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the category "${deletingCategoryTitle}"?`}
                onConfirm={handleConfirmDelete}
                onClose={handleCloseModal}
            />
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