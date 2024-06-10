import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/editPage.css';
import { BASE_URL } from '../config';

function Subscribers() {

    const [currPage, setCurrPage] = useState(1);  // Initialize currPage as 1
    const [itemsPerPage] = useState(5);  // Initialize itemsPerPage as 5

    const indexOfLastItem = currPage * itemsPerPage;  // Index of the last item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;  // Index of the first item on the current page

    const currItems = data.slice(indexOfFirstItem, indexOfLastItem);  // Items to be displayed on the current page

    const numOfPages = Math.ceil(data.length / itemsPerPage);  // Calculate the number of pages
    
    const pageNumbers = [...Array(numOfPages + 1).keys()].slice(1);  // Array of page numbers [1, 2, 3, ...

    const nextPage = () => {
        if(currPage !== numOfPages) {
            setCurrPage(currPage + 1);
        }
    };

    const prevPage = () => {
        if(currPage !== 1) {
            setCurrPage(currPage - 1);
        }
    };

    const [items, setItems] = useState([]);  // Initialize items as an empty array
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch subscribers from the backend on component mount
        axios.get(`${BASE_URL}/api/subscribers`)
            .then(response => {
                // Update state with the fetched subscribers
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscribers:', error);
                // Handle errors here, such as displaying a notification or setting error messages in state
            });
    }, []);  // The empty array ensures this effect runs only once after initial render
    console.log(items);
    const handleDelete = (item) => {
        navigate(`/subscribersDeleteForm?email=${item.email}&id=${item.id}`);
    };
        const mailingList = items.map(item => item.email).join(';');

        const copyToClipboard = () => {
            navigator.clipboard.writeText(mailingList).then(() => {
                alert('Mailing list copied to clipboard!');
            }).catch(error => {
                console.error('Failed to copy text:', error);
            });
        };
        
    return (
        <div className='editPage-container'>
            <h1>Subscribers List</h1>
            <div className='mailingList-container'>
                <button onClick={copyToClipboard} className='copy-button'>Copy All the Emails</button>
            </div>
            <div className='editing-container'>
                {items.map(item => (
                    <div key={item.id} className='item'>
                        <h3>Name: {item.name}</h3>  {/* Display the subscriber's full name */}
                        <h3>Email: {item.email}</h3>
                        <div className='buttons-container'>
                            <button onClick={() => handleDelete(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscribers;
