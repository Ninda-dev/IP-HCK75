import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instanceAxios } from "../axiosClient";
import Card from "../components/Card";

export default function Home() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    const fetchProduct = async () => {
        try {
            const { data } = await instanceAxios.get(`/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setProduct(data.data.query);
            // console.log(data.data.query, "<<<<<<<<<< ini datanya");
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            {product.map((product) => {
                return (
                    <Card
                        key={product.id}
                        product={{
                            id:product.id,
                            name:product.name,
                            description:product.description,
                            image:product.image,
                            stock:product.stock
                        }}
                    />
                )
            })}
        </>
    )
}