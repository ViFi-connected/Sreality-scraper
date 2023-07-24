import React, {useEffect, useMemo, useState} from 'react';
import {Apartment} from "../../types";
import Pagination from './components/Pagination';
import './App.css';

function App() {
    const [apartments, setApartments] = useState<Apartment[]>()
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 25;
    const pageSize = 20;

    const fetchData = () => {
    request<Apartment[]>("http://localhost:4000/apartments")
        .then(data => {
          setApartments(data)
        });
    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return apartments?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container">
            <div className="grid-container">
                {currentTableData?.map((apartment) => {
                    return (
                        <div className="apartment">
                            <p>{apartment.title}</p>
                            <img src={apartment.image_url}/>
                        </div>
                    );
                })}
            </div>
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                maxLength={7}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

// Make the `request` function generic
// to specify the return data type:
function request<TResponse>(
    url: string,
    // `RequestInit` is a type for configuring
    // a `fetch` request. By default, an empty object.
    config: RequestInit = {}

    // This function is async, it will return a Promise:
): Promise<TResponse> {

    // Inside, we call the `fetch` function with
    // a URL and config given:
    return fetch(url, config)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result data.
        .then((data) => data as TResponse);

    // We also can use some post-response
    // data-transformations in the last `then` clause.
}

export default App;
