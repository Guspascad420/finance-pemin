import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TransactionRow({ onRemoveCLick, transaction, overviewRoute }) {
    const CurrencyFormatter = new Intl.NumberFormat('en-DE');
    return (
        <tr className="border-b-[1.5px]">
            <td className="font-[Inter] py-5 font-medium text-center">{ transaction.items }</td>
            <td className="font-[Inter] font-medium text-center">{ transaction.shop_name }</td>
            <td className="font-[Inter] font-medium text-center">{ transaction.date.substring(0, 10) }</td>
            <td className="font-[Inter] font-medium text-center">{ transaction.category }</td>
            <td className="font-[Inter] font-medium text-center">{ transaction.payment_method }</td>
            <td className="font-[Inter] font-medium text-center text-red-500">{"-" + CurrencyFormatter.format(transaction.amount)}</td>
            <td className="font-[Inter] font-medium text-center">{ transaction.transaction_by }</td>
            {
                overviewRoute == null && (
                    <td className="flex justify-center py-5">
                        <button onClick={() => onRemoveCLick(transaction.id) } className="bg-red-500 rounded-lg p-2 mr-3">
                            <DeleteIcon sx={{color: 'white'}}/>
                        </button>
                    </td>
                )
            }
        </tr>
    )
}