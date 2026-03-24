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
    const [productData, setProductData] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let productDataValue = useSelector((state) => state.cart.cartData);

    useEffect(() => {
        let cartData = productDataValue.filter((value) => value.id === id);
        setProductData(cartData);
    }, [id, productDataValue]);


    // Remove To Product
    const handleDelete = (productId)=>{
        dispatch(deleteToProduct(productId));
        navigate('/');
    }

    // Increment To Product
    const handleIncrementProduct = (productData)=>{
        dispatch(addToProduct(productData));
    }
    
    // Decrement To Product
    const handleDecrementProduct = (productData)=>{
        dispatch(removeToProduct(productData));
    }

    return (
        <div className='container mt-5' >
            <h2 className='text-center ' style={{ color: 'red' }}>Product Details</h2>
            <section className='container mt-3'>
                <div className='iteamsdetails'>
                    {
                        productData.map((value, index) => {
                            return (
                                <>
                                    <div className='items_img mt-2'>
                                        <img src={value.images[0]} height="300px" alt='' />
                                    </div>
                                    <div className="details">
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p> <strong>Category</strong> : {value.category}</p>
                                                        <p> <strong>Price</strong> : {value.price} </p>
                                                        <p> <strong>Title</strong> : {value.title}</p>
                                                        <p> <strong>Total</strong> : ₹ {(value.price * value.quantity).toFixed(2)} </p>
                                                        <div className='quantity_button'>
                                                            <span style={{ fontSize: "24px" }} onClick={()=> handleIncrementProduct(value)}> <AddIcon /> </span>

                                                            <span style={{ fontSize: "20px" }}> {value.quantity} </span>

                                                            <span style={{ fontSize: "24px" }} onClick={value.quantity == 1 ? ()=> handleDelete(value.id) : ()=> handleDecrementProduct(value) }> <RemoveIcon /> </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p> <strong>Rating :</strong> <span className='rating_star'>{value.reviews[2].rating} ✰ </span> </p>
                                                        <p> <strong>Order Review :</strong> <span>{value.rating.count} + order placed from here recently</span></p>

                                                        <p> <strong>Quantity :</strong> {value.quantity}</p>

                                                        <p>
                                                            {/* <i className='fas fa-trash largetrash' onClick={()=> handleDelete(value.id)}> </i> */}
                                                            <button className="btn btn-outline-danger btn-md" onClick={()=> handleDelete(value.id)}> Remove <DeleteIcon/> </button>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default ProductDetails;
