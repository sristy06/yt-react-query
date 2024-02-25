import {useMutation, useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import axios from 'axios';
const Product=()=>{
    const params=useParams({
            mutationFn: (newproduct) => {
            return axios.put(`https://dummyjson.com//products/1`, newproduct)
            },
    });
    // Mutations

    const mutation=useMutation

    const fetchProduct=async()=>{
        const response=await fetch(`https://dummyjson.com/products/${params.productId}`);
        const data=await response.json();
        return data;
    };

    const{
        isLoading,
        error,
        data:product
      }=useQuery({
        queryKey:['product',params.productId],
        queryFn:fetchProduct
      })
      if(isLoading){
        return <h3>Loading....</h3>
    }
    if(error){
        return <h3>Error: {error}</h3>
    }

    return <>
    <div>Product:{product.title}</div>
     <button
            onClick={() => {
              mutation.mutate({ title:'updated product' })
            }}
          >
            Create product
          </button>
    </>;
};

export default Product;