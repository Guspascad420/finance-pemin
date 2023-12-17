import overviewImg from "../images/overview.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import transaction from "../images/transaction.png";
import expenses from "../images/expenses.png";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {Fragment, useEffect, useState} from "react";
import BalanceCard from "./globals/balance-card";
import TransactionRow from "./globals/transaction-row";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";

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

const Transactions = () => {
    let navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState("");
    const [shopName, setShopName] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [amount, setAmount] = useState("");
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

    const handleClickOpen = () => {
        setOpen(true);
        setItems("");
        setShopName("");
        setCategory("");
        setPaymentMethod("");
        setAmount("");
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createTransactions = async () => {
        const date = new Date().toISOString();

        if (items.trim().length !== 0 && shopName.trim().length !== 0
            && category.trim().length !== 0 && paymentMethod.trim().length !== 0) {
            try {
                const res = await axios.post(
                    "http://localhost:8080/api/transaction/add",
                    {
                        "items": items,
                        "shop_name": shopName,
                        "date": date,
                        "category": category,
                        "payment_method": paymentMethod,
                        "amount": parseInt(amount),
                        "transaction_by": userData.name
                    }
                )
                console.log(res.data)
                handleClose();
                getAllTransactions();
            } catch (e) {
                console.log(e)
                alert(e.message)
            }
        }
    }

    const removeTransaction = async (id) => {
        try {
            await axios.delete(
                "http://localhost:8080/api/transaction/" + id
            )
            getAllTransactions();
        } catch (e) {
            alert(e.message)
        }
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
        getAllTransactions()
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
                        <div className="w-full mt-3 bg-[#299D91]
                    hover:cursor-pointer flex items-center p-4 rounded-md">
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
                <div className="basis-3/4 pl-5 overflow-y-auto mt-8">
                    <div className="flex justify-between items-center">
                        <h1 className="font-[Inter] text-2xl mb-5 font-bold">Transaction History</h1>
                        <button onClick={handleClickOpen} className="font-[Inter] text-white bg-[#299D91] py-2 rounded-md px-5 mr-5 font-medium">
                            Add new transaction
                        </button>
                    </div>
                    <table className="mr-5 my-5">
                        <thead>
                        <tr className="bg-[#299D91]">
                            <th className="font-[Inter] font-medium px-5 py-2 text-white">Items</th>
                            <th className="font-[Inter] font-medium px-8 py-2  text-white">Shop Name</th>
                            <th className="font-[Inter] font-medium px-8 py-2  text-white">Date</th>
                            <th className="font-[Inter] font-medium px-5 py-2  text-white">Category</th>
                            <th className="font-[Inter] font-medium px-5 py-2  text-white">Payment Method</th>
                            <th className="font-[Inter] font-medium px-8 py-2  text-white">Amount</th>
                            <th className="font-[Inter] font-medium px-5 py-2  text-white">Transaction By</th>
                            <th className="font-[Inter] font-medium px-5 py-2  text-white">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            transactions && transactions.map((transaction) => (
                                <TransactionRow onRemoveCLick={removeTransaction} transaction={transaction}/>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth={true} scroll="paper">
                <DialogTitle>
                    <h2 className="font-[Inter] font-semibold">Add new transaction</h2>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p className="font-[Inter] mb-2">Items</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="total-expenses" className="w-full"
                               sx={{borderRadius: '10px'}} value={items}
                               onChange={(e) => setItems(e.target.value)}/>
                    <DialogContentText>
                        <p className="font-[Inter] mt-5 mb-2">Shop Name</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="category-name" className="w-full"
                               sx={{borderRadius: '10px'}} value={shopName}
                               onChange={(e) => setShopName(e.target.value)}/>
                    <DialogContentText>
                        <p className="font-[Inter] mt-5 mb-2">Category</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="category-name" className="w-full"
                               sx={{borderRadius: '10px'}} value={category}
                               onChange={(e) => setCategory(e.target.value)}/>
                    <DialogContentText>
                        <p className="font-[Inter] mt-5 mb-2">Payment Method</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="category-name" className="w-full"
                               sx={{borderRadius: '10px'}} value={paymentMethod}
                               onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <DialogContentText>
                        <p className="font-[Inter] mt-5 mb-2">Amount</p>
                    </DialogContentText>
                    <TextInput type="number" color="secondary" id="category-name" className="w-full"
                               sx={{borderRadius: '10px'}} value={amount}
                               onChange={(e) => setAmount(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <div className="my-5 font-[Inter] w-full flex justify-around">
                        <button className="text-red-500 hover:bg-red-500 hover:text-white
                         border border-red-500 py-3 rounded-md px-16 font-medium"
                                onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={createTransactions} className="text-white bg-[#299D91] py-3 rounded-md px-20 font-medium">
                            Add
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default Transactions;