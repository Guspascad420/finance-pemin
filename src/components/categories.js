import { useNavigate } from "react-router-dom";
import overviewImg from "../images/overview.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import transaction from "../images/transaction.png";
import expenses from "../images/expenses.png";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import {useEffect, useState, Fragment} from "react";
import CategoryCard from "./globals/category-card";
import {TextField} from "@mui/material";
import {styled} from "@mui/material/styles";

const TextInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '10px',
            borderColor: '#BCBCD2',
            borderWidth: '1.5px'
        },
        '&:hover fieldset': {
            borderRadius: '10px',
            borderColor: '#BCBCD2',
            borderWidth: '2px'
        },
        '&.Mui-focused fieldset': {
            borderRadius: '10px',
            borderColor: '#299D91',
        },
    },
})

const Categories = () => {
    let navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("")
    const [totalExpenses, setTotalExpenses] = useState("")
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const getAllCategories = async () => {
        const res = await axios.get(
            "https://api.aibm.my.id/kategori"
        )
        if (res.status !== 200) {
            alert(res.data.message);
            return;
        }
        setCategories(res.data.data.kategori)
    }
    const addNewCategory = async () => {
        try {
             await axios.post(
                "https://api.aibm.my.id/kategori",
                {
                    "history_transaction_id_akun": 2,
                    "kategori_nama": categoryName,
                    "total_per_catagory": totalExpenses
                }
            )
            handleClose();
            getAllCategories();
        } catch (e) {
            alert(e.message)
        }
    }
    const removeCategory = async (id) => {
        try {
            await axios.delete(
                "https://api.aibm.my.id/kategori/" + id
            )
            getAllCategories();
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <Fragment>
            <div className="flex">
                <div className="flex flex-col justify-between basis-1/4 h-screen bg-black sticky top-0">
                    <div>
                        <h1 className="text-white mt-7 font-[Poppins] font-extrabold text-center text-2xl">FinanceBoard</h1>
                        <div onClick={() => navigate('/overview')}
                             className="flex items-center hover:cursor-pointer mt-10 p-4">
                            <img src={overviewImg} alt="" className="w-7"/>
                            <p className="font-[Inter] ml-4 text-white font-semibold">Overview</p>
                        </div>
                        <div onClick={() => navigate('/balances')} className="flex items-center hover:cursor-pointer mt-3 p-4">
                            <AccountBalanceWalletIcon style={{color: 'white'}} className="scale-[1.3]"/>
                            <p className="font-[Inter] ml-6 text-white">Balances</p>
                        </div>
                        <div onClick={() => navigate('/transactions')} className="flex items-center hover:cursor-pointer mt-3 p-4">
                            <img src={transaction} alt="" className="w-7"/>
                            <p className="font-[Inter] ml-4 text-white">Transactions</p>
                        </div>
                        <div className="w-full mt-3 bg-[#299D91]
                    hover:cursor-pointer flex items-center p-4 rounded-md">
                            <img src={expenses} alt="" className="w-7"/>
                            <p className="font-[Inter] ml-4 text-white">Categories</p>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="w-full bg-[#262626] mb-7 flex items-center p-4 rounded-lg">
                            <LogoutIcon style={{color: '#C5C5C5'}}/>
                            <p className="font-[Inter] ml-4 text-lg text-[#C5C5C5] font-semibold">Logout</p>
                        </div>
                        <hr className="mb-5 bg-[#262626] h-0.5 border-0"/>
                    </div>
                </div>
                <div className="basis-3/4 pl-5 overflow-y-auto mt-8">
                    <div className="flex justify-between">
                        <h2 className="font-[Inter] text-gray-500 mb-3 text-xl">List Of Categories</h2>
                        <button className="font-[Inter] text-white bg-[#299D91] py-2 rounded-md px-5 mr-5 font-medium"
                        onClick={handleClickOpen}>
                            Add new category
                        </button>
                    </div>
                    <div className="grid grid-cols-2 ml-3">
                        {
                            categories && categories.map((category) => (
                                <CategoryCard onRemoveClick={removeCategory} category={category} currentRoute="categories"/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>
                    <h2 className="font-[Inter] font-semibold">Add new category</h2>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p className="font-[Inter] mb-2">Category name</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="category-name" className="w-full"
                               sx={{borderRadius: '10px'}} value={categoryName}
                               onChange={(e) => setCategoryName(e.target.value)} />
                    <DialogContentText>
                        <p className="font-[Inter] mt-5 mb-2">Total Expenses</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="total-expenses" className="w-full"
                               sx={{borderRadius: '10px'}} value={totalExpenses}
                               onChange={(e) => setTotalExpenses(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <div className="my-5 font-[Inter] w-full flex justify-around">
                        <button className="text-red-500 hover:bg-red-500 hover:text-white
                         border border-red-500 py-3 rounded-md px-16 font-medium"
                                onClick={handleClose}>Cancel</button>
                        <button className="text-white bg-[#299D91] py-3 rounded-md px-20 font-medium"
                                onClick={addNewCategory}>Add</button>
                    </div>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default Categories;