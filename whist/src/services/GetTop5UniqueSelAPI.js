import { useState, useEffect } from 'react';
import axios from 'axios';
const GetTop5UniqueSelAPI = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(
                'http://127.0.0.1:8000/top5uniquesel/',
            );
            setItems(result.data);

        };
        fetchItems();
    }, []);
    return items;

};
export default GetTop5UniqueSelAPI;