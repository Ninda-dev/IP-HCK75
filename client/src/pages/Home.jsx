import { useEffect } from "react";
// import { instanceAxios } from "../axiosClient";
import { useSelector, useDispatch } from 'react-redux'
import Card from "../components/Card";
import { fetchProducts, fetchDetailProduct } from "../features/productSlice";   

export default function Home() {

    const {data, detail} = useSelector((state) => state.product);
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

    useEffect(() => {
        console.log('======masuk useEffect');
        
        dispatch(fetchProducts())
    }, []);

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
        </>
    )
}