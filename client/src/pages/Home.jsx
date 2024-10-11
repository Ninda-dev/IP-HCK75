import { useEffect, useState } from "react";
// import { instanceAxios } from "../axiosClient";
import { useSelector, useDispatch } from 'react-redux'
import Card from "../components/Card";
import { fetchProducts, fetchDetailProduct } from "../features/productSlice";
import { instanceAxios } from "../axiosClient";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [answerPrompt, setAnswerPrompt] = useState("");

    const { data, detail } = useSelector((state) => state.product);
    console.log(data, "=======ini state");

    const dispatch = useDispatch()
    // const [product, setProduct] = useState([])
    // const fetchProduct = async () => {
    //     try {
    //         const { data } = await instanceAxios.get(`/products`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //             },
    //         });

    //         setProduct(data.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            let data = await instanceAxios.post("/gemini-ai", { prompt });
            setAnswerPrompt(data)
            setPrompt(" ");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // console.log('======masuk useEffect');

        dispatch(fetchProducts())
    }, [answerPrompt]);

    // console.log(data);


    return (
        <>
            {data.data?.map((product) => {

                return (
                    <Card
                        key={product.id}
                        product={{
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            image: product.image,
                            stock: product.stock
                        }}
                    />
                )
            })}

            <form action="" onSubmit={handleClick} className="flex flex-col gap-2" >
                <label htmlFor="">Bosen nunggu product update ya ? tanyain sesuatu ke AI yukss</label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="ask something to AI" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                </label>
                <input type="submit" value="Submit" className="btn" />
            </form>
            <p>{answerPrompt}</p>
        </>
    )
}