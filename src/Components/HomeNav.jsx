import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet, useNavigate } from 'react-router';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { deleteToProduct, searchProductData } from '../Redux/Slices/ProductSlice';
import viteLogo from '../assets/vite.svg';



function HomeNav(props) {
    let[totalPrice, setTotalPrice] = useState();
    let [searchData, setSearchData] = useState("");
    // console.log(searchData);
    

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();

    let productData = useSelector((state) => state.cart.cartData);

    // Price Total
    useEffect(()=>{
        let totalPrice = 0;
        productData.map((value)=> totalPrice = totalPrice + value.price * value.quantity)

        setTotalPrice(totalPrice.toFixed(2))
    },[totalPrice, productData]);

    // Search Data
    useEffect(()=>{
        dispatch(searchProductData(searchData));
    },[searchData])


    const handleClose = () => {
        setAnchorEl(null);
    };

    // Product Delete Redux
    const handleDelete = (productId)=>{
        dispatch(deleteToProduct(productId));
        navigate('/')
    }

    return (
        <>
            <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>
                       <img src={viteLogo} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Navbar.Brand>
                                <NavLink to='/' style={{ textDecoration: "none" }}> Home </NavLink>
                            </Navbar.Brand>
                            {/* <Navbar.Brand>
                                <NavLink to='/product-detail/:id' style={{ textDecoration: "none" }}> Product Details </NavLink>
                            </Navbar.Brand> */}
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search Product"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e)=> setSearchData(e.target.value) }
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Badge badgeContent={productData.length} color="secondary" className='nav_cart_img'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <i className="fa-solid fa-cart-shopping "></i>
                        </Badge>

                    </Navbar.Collapse>
                    <Menu
                        id="basic-menu"
                        className='menu-box'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                        }}
                    >
                        <div className='cart_details_menu'>
                            {
                                productData.length ?
                                      <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th>Product Image</th>
                                                <th>Product Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productData.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                           <NavLink to={`/product-detail/${value.id}`}>
                                                             <img src={value.images[0]} alt='Product-Image' width={100} onClick={handleClose}/>
                                                           </NavLink>
                                                        </td>
                                                        <td>
                                                            <p><strong>Name:</strong> {value.category}</p>
                                                            <p><strong>Price:</strong> {value.price*value.quantity}</p>
                                                            <p><strong>Quantity:</strong> {value.quantity}</p>
                                                        </td>
                                                        <td onClick={handleClose}>
                                                            <i class="fa-solid fa-trash" onClick={()=> handleDelete(value.id)}></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                         <p>
                                            <h6>Total Amount: ₹ {totalPrice}</h6>
                                        </p>
                                    </Table>
                                    :
                                    <div className='cart_details_menu'>
                                        <p className='nav_para_cart'>Your Cart is Empty</p>
                                        <img src="./src/assets/cart.gif" alt="" className='empty_cart_Img ' />
                                        <i className="fa-solid fa-xmark cross_img " onClick={handleClose}></i>
                                    </div>
                            }
                        </div>

                    </Menu>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default HomeNav;