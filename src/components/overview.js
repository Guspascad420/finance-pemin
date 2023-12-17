import overviewImg from "../images/overview.png";
import expenses from "../images/expenses.png";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import {styled} from '@mui/material/styles';
import transaction from "../images/transaction.png";
import {IconButton, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import CategoryCard from "./globals/category-card";
import axios from "axios";
import {useEffect, useState} from "react";
import BalanceCard from "./globals/balance-card";
import TransactionRow from "./globals/transaction-row";

const SearchInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '10px',
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderRadius: '10px',
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderRadius: '10px',
            borderColor: '#299D91',
        },
    },
})
const Overview = () => {
    let navigate = useNavigate();
    const navigateToBalances = () => {
        navigate("/balances")
    }
    const [categories, setCategories] = useState([])
    const [balances, setBalances] = useState([])
    const [transactions, setTransactions] = useState([]);
    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        const res = await axios.get('http://localhost:8080/api/user/profile', {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        })
        if (res.status !== 200) {
            alert(res.data.message);
            return;
        }
        setUserData(res.data.data);
    }

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

    const getAllBalances = async () => {
        const res = await axios.get(
            "http://localhost:8080/api/balance"
        )
        if (res.status !== 200) {
            alert(res.data.message);
            return;
        }
        setBalances(res.data.data)
    }

    const getAllTransactions = async () => {
        const res = await axios.get(
            "http://localhost:8080/api/transaction"
        )
        if (res.status !== 200) {
            alert(res.data.message);
            return;
        }
        setTransactions(res.data.data)
    }

    useEffect(() => {
        getUserData()
        getAllCategories()
        getAllBalances()
        getAllTransactions()
    }, [])

    return (
        <div className="flex">
            <div className="flex flex-col justify-between basis-1/4 h-screen bg-black sticky top-0">
                <div>
                    <h1 className="text-white mt-7 font-[Poppins] font-extrabold text-center text-2xl">FinanceBoard</h1>
                    <div className="w-full mt-10 bg-[#299D91] flex items-center p-4 rounded-md">
                        <img src={overviewImg} alt="" className="w-7"/>
                        <p className="font-[Inter] ml-4 text text-white font-semibold">Overview</p>
                    </div>
                    <div onClick={ navigateToBalances } className="hover:cursor-pointer flex items-center mt-3 p-4">
                        <AccountBalanceWalletIcon style={{color: 'white'}} className="scale-[1.3]"/>
                        <p className="font-[Inter] ml-6 text text-white">Balances</p>
                    </div>
                    <div onClick={() => navigate('/transactions')} className="flex items-center hover:cursor-pointer mt-3 p-4">
                        <img src={transaction} alt="" className="w-7"/>
                        <p className="font-[Inter] ml-4 text-white">Transactions</p>
                    </div>
                    <div onClick={() => navigate('/categories')} className="flex items-center hover:cursor-pointer mt-3 p-4">
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
            <div className="basis-3/4 pl-5 overflow-y-auto">
                <div className="flex items-center justify-between py-5">
                    <div>
                        {
                            userData && (
                                <h1 className="font-[Inter] text-2xl font-bold">{`Hello ${userData.name}`}</h1>
                            )
                        }
                    </div>
                    <div className="flex items-center">
                        <NotificationsIcon style={{color: '#666666'}} className="mr-5"/>
                        <SearchInput type="text" color="secondary" id="search" className="shadow-lg w-80"
                                     placeholder="Search here" sx={{borderRadius: '10px'}}
                                     InputProps={{
                                         endAdornment: (
                                             <InputAdornment position='end'>
                                                 <IconButton>
                                                     <SearchIcon sx={{fontSize: 30}}/>
                                                 </IconButton>
                                             </InputAdornment>
                                         )
                                     }}
                        />
                    </div>
                </div>
                <hr className="mb-5 bg-gray-300 h-px border-0"/>
                <h2 className="font-[Inter] text-gray-500 mb-3 text-xl">Balances</h2>
                <div className="grid grid-cols-2">
                    {
                        balances && balances.map((balance) => (
                            <BalanceCard overviewRoute={true} balance={balance}/>
                        ))
                    }
                </div>
                <h2 className="font-[Inter] text-gray-500 mt-7 text-xl">Categories</h2>
                <div className="flex overflow-x-scroll scrollbar-hide">
                    <div className="flex flex-nowrap">
                        {
                            categories && categories.map((category) => (
                                <CategoryCard category={category} currentRoute="overview"/>
                            ))
                        }
                    </div>
                </div>
                <h1 className="font-[Inter] text-2xl mt-7 mb-5 font-bold">Transaction History</h1>
                <table className="mr-5 mb-5">
                    <thead>
                        <tr className="bg-[#299D91]">
                            <th className="font-[Inter] font-medium px-5 py-2 text-white">Items</th>
                            <th className="font-[Inter] font-medium px-8 py-2  text-white">Shop Name</th>
                            <th className="font-[Inter] font-medium px-8 py-2  text-white">Date</th>
                            <th className="font-[Inter] font-medium px-5 py-2  text-white">Category</th>
                            <th className="font-[Inter] font-medium px-5 py-2  text-white">Payment Method</th>
                            <th className="font-[Inter] font-medium px-8 py-2  text-white">Amount</th>
                            <th className="font-[Inter] font-medium px-5 py-2  text-white">Transaction By</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        transactions && transactions.map((transaction) => (
                            <TransactionRow overviewRoute={true} transaction={transaction}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Overview;