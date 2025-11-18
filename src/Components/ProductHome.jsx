import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addToProduct } from '../Redux/Slices/ProductSlice';

function ProductHome(props) {
    const [radioData, setRadioData] = useState("All");
    const [product, setProduct] = useState([]);

    let dispatch = useDispatch();

    let searchData = useSelector((state)=> state.cart.searchData);
    // console.log(searchData);
    

    const fetchData = async () => {
        let response = await fetch('http://localhost:3000/products');

        try {
            let data = await response.json();
            return setProduct(data);
        }
        catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const handleAddToCart = (productData) => {
        dispatch(addToProduct(productData));
    }


    return (
        <div className='container con'>
            <h2 className='text-center'>Product Home Page </h2>
            {/* <div style={{ boxShadow: "2px -2px 8px 1px black", margin: "10px 20%", padding: "12px", fontSize: "1.1rem", fontWeight: "bold", borderRadius: "8px" }}> */}

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="all" value="All"
                        checked={radioData === "All"} onChange={(e) => { setRadioData(e.target.value) }} />
                    <label className="form-check-label" htmlFor="all">All</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="beauty" value="beauty"
                        checked={radioData === "beauty"} onChange={(e) => { setRadioData(e.target.value) }}
                    />
                    <label className="form-check-label" htmlFor='beauty'>Beauty</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="fragrances" value="fragrances"
                        checked={radioData === "fragrances"} onChange={(e) => { setRadioData(e.target.value) }} />
                    <label className="form-check-label" htmlFor="fragrances">Fragrances</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="groceries" value="groceries"
                        checked={radioData === "groceries"} onChange={(e) => { setRadioData(e.target.value) }} />
                    <label className="form-check-label" htmlFor="groceries">Groceries</label>
                </div>
            {/* </div> */}
            <div className='row cart_row'>
                {product.filter((values)=>{
                    if(searchData.length === 0){
                        return values;
                    }
                    else{
                        return values.title.toLowerCase().includes(searchData.toLowerCase());
                    }

                }).filter((value) => {
                    if (radioData === 'All') {
                        return value;
                    }
                    else if (radioData === 'beauty') {
                        return value.category === radioData;
                    }
                    else if (radioData === 'fragrances') {
                        return value.category === radioData;
                    }
                    else if (radioData === 'groceries') {
                        return value.category === radioData;
                    }
                }).map((itemValue, index) => {
                    return (
                        <Card key={index} style={{ width: '16rem', height: "27rem" }} className='mx-2 mt-4 card_style'>
                            <Card.Img variant="top" src={itemValue.images[0]} style={{ height: "14rem" }} className='mt-3  img1' />
                            <Card.Body className='cart_body'>
                                <Card.Title className='cart_category' style={{fontSize : "1rem"}}>{itemValue.category}</Card.Title>
                                 <Card.Title className='cart_title' style={{fontSize : "1rem"}}>{itemValue.title}</Card.Title>
                                <Card.Text> Price : ₹{itemValue.price} </Card.Text>
                                <div className='cart_btn1'>
                                    <Button variant="danger" className='btn1' onClick={() => handleAddToCart(itemValue)}> Add To Cart </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

export default ProductHome;