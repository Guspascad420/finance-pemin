export default function CategoryCard({ onRemoveClick, category, currentRoute }) {
    const overviewClass = "w-[120rem] max-w-sm overflow-hidden p-6 my-3 mr-5 rounded-lg shadow bg-white"
    const categoryClass = "max-w-[26rem] p-6 my-7 rounded-lg shadow bg-white"
    const CurrencyFormatter = new Intl.NumberFormat('en-DE');
    return (
        <div className={currentRoute === "overview" ? overviewClass : categoryClass}>
            <h3 className="font-[Inter] text-orange-500 font-bold mb-5">{ category.kategori_nama }</h3>
            <p className="font-[Inter] text-gray-400">Total Expenses</p>
            <h1 className="font-[Inter] font-semibold text-xl">{ `Rp ${CurrencyFormatter.format(category.total_per_catagory)}` }</h1>
            {
                currentRoute === "categories" && (
                    <div className="flex justify-between items-center mt-7">
                        <button className="font-[Inter] text-red-500" onClick={() => onRemoveClick(category.id_kategori)}>Remove</button>
                        <button className="font-[Inter] text-white bg-[#299D91] py-2 rounded-md px-5 font-medium">
                            Details
                        </button>
                    </div>
                )
            }
        </div>
    )
}