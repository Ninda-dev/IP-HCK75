export default function CreateProduct({handleSubmit}) {
    return <>
        <form action="">
            <label className="input input-bordered flex items-center gap-2">
                Name
                <input type="text" className="grow" placeholder="Daisy" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Description
                <input type="text" className="grow" placeholder="daisy@site.com" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Image
                <input type="text" className="grow" placeholder="daisy@site.com" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Stok
                <input type="text" className="grow" placeholder="daisy@site.com" />
            </label>

            <input type="submit" value="Submit" className="btn" />

        </form>
    </>
}

// CreateProduct.propTypes = {
//     handleSubmit: PropTypes.func.isRequired
// }