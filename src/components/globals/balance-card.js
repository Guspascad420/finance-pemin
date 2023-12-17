export default function BalanceCard({ onRemoveClick, onUpdateClick, balance, overviewRoute }) {
    return (
        <div className="max-w-md p-6 rounded-lg shadow bg-white">
            <h3 className="font-[Inter] text-gray-500 font-bold mb-5">{ balance.bank_name }</h3>
            <h1 className="font-[Inter] font-semibold text-xl">{ balance.account_number }</h1>
            <p className="font-[Inter] text-gray-400">Account Number</p>
            <h1 className="font-[Inter] font-semibold text-xl mt-5">Rp10.000.000</h1>
            <p className="font-[Inter] text-gray-400">Total Amount</p>
            {
                overviewRoute == null && (
                    <div className="flex justify-between items-center mt-7">
                        <button className="font-[Inter] text-red-500" onClick={() => onRemoveClick(balance.id)}>Remove</button>
                        <div className="flex items-center">
                            <button onClick={() => onUpdateClick(balance)} className="font-[Inter] text-blue-500 mr-3">Update</button>
                            <button className="font-[Inter] text-white bg-[#299D91] py-2 rounded-md px-5 font-medium">
                                Details
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}