import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import yelpClient from '../utils/yelpClient';
import Table from './Table';


export default function SearchBar() {
    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [cityVal, setCityVal] = useState('');
    const [keywordVal, setKeywordVal] = useState('');
    const [reviewCnt, setReviewCnt] = useState('');
    const [transaction, setTransaction] = useState('all');
    const [rating, setRating] = useState('');
    const [products, setProducts] = useState([]);
    const [resProducts, setResProducts] = useState([]);

    const handleInputCity = (e) => {
        setCityVal(e.target.value);
    }

    const handleInputKeyword = (e) => {
        setKeywordVal(e.target.value);
    }

    const handleClearCity = () => {
        setCityVal('');
    }

    const handleClearKeyword = () => {
        setKeywordVal('');
    }

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await yelpClient.get(`/businesses/search?limit=50&&location=${cityVal}&&term=${keywordVal}`);
            setResProducts(response.data.businesses);
            setProducts(response.data.businesses);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            return e;
        }
    }

    const handleToggleVisibility = () => {
        setVisibility((prevState) => !prevState)
    }

    const handleReviewCount = (e) => {
        setReviewCnt(e.target.value);
    }

    const handleTransaction = (e) => {
        setTransaction(e.target.value)
    }

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const handleFilter = () => {
        let temp = resProducts;
        if(rating) {
            temp = temp.filter(product => product.rating === rating)
        }

        if(reviewCnt) {
            temp = temp.filter(product => product.review_count === reviewCnt)
        }

        if(transaction !== 'all') {
            temp = temp.filter(product => product.transactions.includes(transaction))
        }
        setProducts(temp);
    }

    
    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-4 col-sm-12 col-sx-12 mt-2">
                    <div className='input-wrap'>
                        <FontAwesomeIcon icon={faSearch} />
                        <label 
                            htmlFor="product-search"
                            id="input-label"
                        >
                            Keyword
                        </label>
                        <input 
                            onChange={handleInputCity}
                            value={cityVal}
                            type="text" 
                            name="product-search" 
                            id="product-search" 
                            placeholder="City(Ex: New York City)"
                        />
                        {cityVal && <div className='icon-times' onClick={handleClearCity}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>}
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-sx-12 mt-2">
                    <div className='input-wrap'>
                        <FontAwesomeIcon icon={faSearch} />
                        <label 
                            htmlFor="keyword-search" 
                            id="input-label"
                        >
                            Keyword
                        </label>
                        <input 
                            onChange={handleInputKeyword}
                            value={keywordVal}
                            type="text" 
                            name="keyword-search" 
                            id="product-search" 
                            placeholder="Keyword(Ex: coffee)"
                        />
                        {keywordVal && <div className='icon-times' onClick={handleClearKeyword}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>}
                    </div>
                </div>
                <div className="col-md-2  col-sm-6 col-sx-6 mt-2">
                    <button className='btn btn-success btn-visibility' onClick={handleToggleVisibility}>
                        {visibility ? 'Hide Filters' : 'Filter By Others'}
                    </button>
                </div>
                <div className="col-md-2  col-sm-6 col-sx-6 mt-2">
                    <button onClick={handleSearch} disabled={!cityVal ? true: false } className='btn btn-primary'>Search</button>
                </div>
            </div>
           
            
            {visibility && (
                <div className="row mt-5">
                    <div className="col-md-3 col-sm-12 mt-2">
                        <div className='input-wrap'>
                            <FontAwesomeIcon icon={faSearch} />
                            <label 
                                htmlFor="review-search"
                                id="input-label"
                            >
                                Keyword
                            </label>
                            <input 
                                onChange={handleReviewCount}
                                value={reviewCnt}
                                type='number'
                                min={0}
                                step={1}
                                name="review-search" 
                                id="product-search" 
                                placeholder="Review Count(Ex: 71)"
                            />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 col-sx-12 mt-2">
                        <select className="select" onChange={handleTransaction} aria-label="Default select example">
                            <option value={'all'} defaultValue={transaction === 'all' ? true : false}>all transactions</option>
                            <option value={'pickup'} defaultValue={transaction === 'pickup' ? true : false}>pickup</option>
                            <option value={'delivery'} defaultValue={transaction === 'delivery' ? true : false}>delivery</option>
                            <option value={'restaurant_reservation'} defaultValue={transaction === 'restaurant_reservation' ? true : false}>restaurant_reservation</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-sm-12 col-sx-12 mt-2">
                        <div className='input-wrap'>
                            <FontAwesomeIcon icon={faSearch} />
                            <label 
                                htmlFor="rating-search" 
                                id="input-label"
                            >
                                Keyword
                            </label>
                            <input 
                                onChange={handleRating}
                                value={rating}
                                type='number'
                                min={0}
                                max={5}
                                step={0.1}
                                name="rating-search" 
                                id="product-search" 
                                placeholder="Rating(Ex: 4.5)"
                            />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 col-sx-12 mt-2">
                        <button onClick={handleFilter} disabled={!cityVal ? true: false } className='btn btn-primary'>Filter</button>
                    </div>
                </div>
            )}
            
            <div className="results-wrap">
                <h3 id='title'>Results</h3>
                { loading ? (
                    <>
                        <Skeleton height="3rem" className="mt-2" />
                        <Skeleton height="7rem" className="mt-2" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                        <Skeleton height="7rem" className="mt-1" />
                    </>
                ) : <Table data={products} />}
            </div>
        </div>
    );
}
