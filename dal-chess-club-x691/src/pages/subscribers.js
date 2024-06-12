import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/editPage.css';
import { BASE_URL } from '../config';

function Subscribers() {
    const [items, setItems] = useState([]);
    const [displayItems, setDisplayItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/subscribers`)
            .then(response => {
                setItems(response.data);
                setDisplayItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscribers:', error);
            });
    }, []);

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        applySortAndFilter(e.target.value, searchTerm);
    };

    const applySortAndFilter = (order, search) => {
        let filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        const sortedItems = filteredItems.sort((a, b) => {
            switch (order) {
                case 'AtoZ': return a.name.localeCompare(b.name);
                case 'ZtoA': return b.name.localeCompare(a.name);
                case 'newest': return b.id - a.id;
                case 'oldest': return a.id - b.id;
                default: return 0;
            }
        });
        setDisplayItems(sortedItems);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        applySortAndFilter(sortOrder, searchTerm);
    };

    const copyEmailsToClipboard = () => {
        navigator.clipboard.writeText(displayItems.map(item => item.email).join(';'))
            .then(() => alert('Mailing list copied to clipboard!'))
            .catch(err => console.error('Error copying text to clipboard', err));
    };

    return (
        <div className='editPage-container'>
            <h1>Subscribers List</h1>
            <div className='toolbar'>
                <button onClick={copyEmailsToClipboard} className='copy-button'>Copy All the Emails</button>
                <select onChange={handleSortChange} className='sort-dropdown' value={sortOrder}>
                    <option value="AtoZ">A to Z</option>
                    <option value="ZtoA">Z to A</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} className="search-input" />
                <button onClick={handleSearch} className='search-button'>Search</button>
            </div>
            <table className="subscribers-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => navigate(`/subscribersDeleteForm?email=${item.email}&id=${item.id}`)} className='copy-button'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subscribers;
