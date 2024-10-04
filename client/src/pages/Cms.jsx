export default function Cms() {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>UserId</th>
                            <th>ProductId</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claim.map((claim, idx) => {
                            return (
                                <tr key={claim.id}>
                                    <th>{idx + 1}</th>
                                    <th>{claim.Product.name}</th>
                                    <th>{claim.date}</th>
                                    <td>{claim.UserId}</td>
                                    <td>{claim.ProductId}</td>
                                    <td>
                                        <img className="w-40" src={claim.Product.image} alt="donut lezat" /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}