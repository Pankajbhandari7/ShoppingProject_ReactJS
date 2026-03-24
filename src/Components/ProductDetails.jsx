import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Table from 'react-bootstrap/Table';


import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { addToProduct, deleteToProduct, removeToProduct } from "../Redux/Slices/ProductSlice";


function ProductDetails() {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartData = useSelector((state) => state.cart.cartData);
    const allProducts = useSelector((state) => state.product.productData);

    useEffect(() => {
        // find product from all products
        const product = allProducts.find((item) => item.id == id);

        // find if it exists in cart
        const cartItem = cartData.find((item) => item.id == id);

        if (product) {
            setProductData({
                ...product,
                quantity: cartItem ? cartItem.quantity : 0
            });
        }
    }, [id, cartData, allProducts]);



    // Remove To Product
    const handleDelete = (productId) => {
        dispatch(deleteToProduct(productId));
        navigate('/');
    }

    // Increment To Product
    const handleIncrementProduct = (productData) => {
        dispatch(addToProduct(productData));
    }

    // Decrement To Product
    const handleDecrementProduct = (productData) => {
        dispatch(removeToProduct(productData));
    }

    return (
        <div className='container mt-5' >
            <h2 className='text-center ' style={{ color: 'red' }}>Product Details</h2>
            <section className='container mt-3'>
                <div className='iteamsdetails'>
                    {productData && (
                        <>
                            <div className='items_img mt-2'>
                                <img src={productData.images[0]} height="300px" alt='' />
                            </div>

                            <div className="details">
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p><strong>Category</strong> : {productData.category}</p>
                                                <p><strong>Price</strong> : {productData.price}</p>
                                                <p><strong>Title</strong> : {productData.title}</p>
                                                <p>
                                                    <strong>Total</strong> : ₹ {(productData.price * productData.quantity).toFixed(2)}
                                                </p>

                                                <div className='quantity_button'>
                                                    <span onClick={() => handleIncrementProduct(productData)}>
                                                        <AddIcon />
                                                    </span>

                                                    <span> {productData.quantity} </span>

                                                    <span
                                                        onClick={
                                                            productData.quantity <= 1
                                                                ? () => handleDelete(productData.id)
                                                                : () => handleDecrementProduct(productData)
                                                        }
                                                    >
                                                        <RemoveIcon />
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                <p>
                                                    <strong>Rating :</strong>
                                                    <span className='rating_star'>
                                                        {productData.rating} ✰
                                                    </span>
                                                </p>

                                                <p>
                                                    <strong>Quantity :</strong> {productData.quantity}
                                                </p>

                                                <button
                                                    className="btn btn-outline-danger btn-md"
                                                    onClick={() => handleDelete(productData.id)}
                                                >
                                                    Remove <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}

export default ProductDetails;
