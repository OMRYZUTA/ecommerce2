import { useState, useEffect } from 'react';
import axios from 'axios';
const GetTop5ItemsAPI = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(
                '/top5items/',
            );

            setItems(result.data);

        };
        fetchItems();
    }, []);
    return items;

};
export default GetTop5ItemsAPI;