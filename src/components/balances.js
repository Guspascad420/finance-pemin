import overviewImg from "../images/overview.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import transaction from "../images/transaction.png";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import expenses from "../images/expenses.png";
import {Fragment, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";
import axios from "axios";
import BalanceCard from "./globals/balance-card";

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

const Balances = () => {

    let navigate = useNavigate();
    const [balances, setBalances] = useState([])
    const [insertOpen, setInsertOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [idToUpdate, setIdToUpdate] = useState(0);

    const navigateToOverview = () => {
        navigate("/overview")
    }

    const handleInsertClickOpen = () => {
        setInsertOpen(true);
        setAccountNumber("")
        setBankName("")
    };

    const handleUpdateClickOpen = (balance) => {
        setUpdateOpen(true);
        setIdToUpdate(balance.id);
        setAccountNumber(balance.account_number)
        setBankName(balance.bank_name)
    }

    const handleClose = () => {
        setInsertOpen(false);
        setUpdateOpen(false);
    };

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

    const createNewBalance = async () => {
        if (accountNumber.trim().length !== 0 && bankName.trim().length !== 0) {
            try {
                await axios.post(
                    "http://localhost:8080/api/balance/add",
                    {
                        "account_number": accountNumber,
                        "bank_name": bankName
                    }
                )
                handleClose();
                getAllBalances();
            } catch (e) {
                alert(e.message)
            }
        }
    }

    const updateBalance = async() => {
        try {
            await axios.put(
                "http://localhost:8080/api/balance/update",
                {
                    "id": idToUpdate,
                    "account_number": accountNumber,
                    "bank_name": bankName
                }
            );
            handleClose();
            getAllBalances();
        } catch (e) {
            alert(e.message)
        }
    }

    const removeBalance = async (id) => {
        try {
            await axios.delete(
                "http://localhost:8080/api/balance/" + id
            )
            getAllBalances();
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        getAllBalances()
    }, [])

    return (
        <Fragment>
            <div className="flex">
                <div className="flex flex-col justify-between basis-1/4 h-screen bg-black sticky top-0">
                    <div>
                        <h1 className="text-white mt-7 font-[Poppins] font-extrabold text-center text-2xl">FinanceBoard</h1>
                        <div onClick={navigateToOverview} className="flex items-center hover:cursor-pointer mt-10 p-4">
                            <img src={overviewImg} alt="" className="w-7"/>
                            <p className="font-[Inter] ml-4 text-white font-semibold">Overview</p>
                        </div>
                        <div className="w-full mt-3 bg-[#299D91] hover:cursor-pointer flex items-center p-4 rounded-md">
                            <AccountBalanceWalletIcon style={{color: 'white'}} className="scale-[1.3]"/>
                            <p className="font-[Inter] ml-6 text-white">Balances</p>
                        </div>
                        <div onClick={() => navigate('/transactions')}
                             className="flex items-center hover:cursor-pointer mt-3 p-4">
                            <img src={transaction} alt="" className="w-7"/>
                            <p className="font-[Inter] ml-4 text-white">Transactions</p>
                        </div>
                        <div onClick={() => navigate('/categories')}
                             className="flex items-center hover:cursor-pointer mt-3 p-4">
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
                        <h2 className="font-[Inter] text-gray-500 mb-3 text-xl">Balances</h2>
                        <button onClick={handleInsertClickOpen}
                                className="font-[Inter] text-white bg-[#299D91] py-2 rounded-md px-5 mr-5 font-medium">
                            Add new balance
                        </button>
                    </div>
                    <div className="grid grid-cols-2 mt-7">
                        {
                            balances && balances.map((balance) => (
                                <BalanceCard onUpdateClick={handleUpdateClickOpen} onRemoveClick={removeBalance} balance={balance}/>
                            ))
                        }
                    </div>

                </div>
            </div>
            <Dialog open={updateOpen} onClose={handleClose} fullWidth={true}>
                <DialogTitle>
                    <h2 className="font-[Inter] font-semibold">Add new balance</h2>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p className="font-[Inter] mb-2">Account Number</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="total-expenses" className="w-full"
                               sx={{borderRadius: '10px'}} value={accountNumber}
                               onChange={(e) => setAccountNumber(e.target.value)}/>
                    <DialogContentText>
                        <p className="font-[Inter] mt-5 mb-2">Bank Name</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="category-name" className="w-full"
                               sx={{borderRadius: '10px'}} value={bankName}
                               onChange={(e) => setBankName(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <div className="my-5 font-[Inter] w-full flex justify-around">
                        <button className="text-red-500 hover:bg-red-500 hover:text-white
                         border border-red-500 py-3 rounded-md px-16 font-medium"
                                onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={updateBalance} className="text-white bg-[#299D91] py-3 rounded-md px-20 font-medium">
                            Update
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
            <Dialog open={insertOpen} onClose={handleClose} fullWidth={true}>
                <DialogTitle>
                    <h2 className="font-[Inter] font-semibold">Add new balance</h2>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p className="font-[Inter] mb-2">Account Number</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="total-expenses" className="w-full"
                               sx={{borderRadius: '10px'}} value={accountNumber}
                               onChange={(e) => setAccountNumber(e.target.value)}/>
                    <DialogContentText>
                        <p className="font-[Inter] mt-5 mb-2">Bank Name</p>
                    </DialogContentText>
                    <TextInput type="text" color="secondary" id="category-name" className="w-full"
                               sx={{borderRadius: '10px'}} value={bankName}
                               onChange={(e) => setBankName(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <div className="my-5 font-[Inter] w-full flex justify-around">
                        <button className="text-red-500 hover:bg-red-500 hover:text-white
                         border border-red-500 py-3 rounded-md px-16 font-medium"
                                onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={createNewBalance}
                                className="text-white bg-[#299D91] py-3 rounded-md px-20 font-medium">
                            Add
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default Balances;