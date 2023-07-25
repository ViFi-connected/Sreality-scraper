import React, {useEffect, useMemo, useState, CSSProperties, useRef} from 'react';
import {Apartment} from "../../types";
import Pagination from './components/Pagination';
import './App.css';
import {FadeLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function App() {
    let [loading, setLoading] = useState(true);
    const interval = useRef<NodeJS.Timeout>()
    const [apartments, setApartments] = useState<Apartment[]>()
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 25;
    const pageSize = 20;

    useEffect(() => {
        interval.current = setInterval(fetchData, 1000);

        return () => clearInterval(interval.current);
    }, []);

    useEffect(() => {
        if (apartments !== undefined && apartments.length === 500) {
            clearInterval(interval.current);
            setLoading(false);
        }
    }, [apartments]);

    function fetchData() {
        api<Apartment[]>("http://localhost:4000/apartments")
            .then(data => {
                setApartments(data)
            });
    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return apartments?.slice(firstPageIndex, lastPageIndex);
    }, [apartments, currentPage]);

    if (loading) {
        return <FadeLoader
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
        />;
    }

    return (
        <>
            <FadeLoader
                loading={loading}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className="container">
                <div className="grid-container">
                    {currentTableData?.map((apartment) => {
                        return (
                            <div className="apartment">
                                <p>{apartment.title}</p>
                                <img src={apartment.image_url} alt={""}/>
                            </div>
                        );
                    })}
                </div>
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    maxLength={7}
                    setCurrentPage={setCurrentPage}/>
            </div>
        </>
    );
}

function api<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        })
}

export default App;
