import React, { useState, useEffect } from 'react';
import axios from '../../api/axios.js';
import { Rate } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart-slice.js';
import shop from '../../assets/shop.png';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/products')
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <>
            <div className='flex flex-wrap justify-center gap-6 p-6 m-2 bg-black'>
                {products.map((product) => (
                    <div key={product.id} className='bg-gray-900 text-white rounded-xl shadow-lg p-4 flex flex-col items-center w-[300px] h-[500px] transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl'>
                        <Link to={`/single/${product.id}`}>
                            <img src={product.thumbnail} alt={product.title} className='h-40 w-40 object-cover rounded-lg mb-4 border-2 border-red-600 shadow-md transition-transform duration-300 hover:scale-105' />
                        </Link>
                        <h1 className='text-lg font-semibold mb-2 text-center'>{product.title}</h1>
                        <p className='text-gray-400 mb-3 text-center'>{product.description}</p>

                        <div className='flex items-center mb-3'>
                            <Rate value={product.rating} />
                            <span className='ml-2 text-gray-400 font-medium'>{product.rating}</span>
                        </div>

                        <div className="flex-grow"></div>

                        <div className='flex justify-between items-center w-full ml-[50px]'>
                            <p className='text-xl font-bold text-red-500 mb-3'>${product.price}</p>

                            <div className='relative group'>
                                <img
                                    className='w-[40px] mt-[-14px] group-hover:scale-110 transition-transform duration-300 cursor-pointer'
                                    onClick={() => handleAddToCart(product)}
                                    src={shop}
                                    alt="shop"
                                />
                                <span className='absolute top-[-10px] left-[-20px] text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:content-["Added_to_cart"] before:absolute before:bg-red-500 before:text-white before:rounded-lg before:px-2 before:py-1 before:-top-10 before:left-[-10px] before:shadow-lg'></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
