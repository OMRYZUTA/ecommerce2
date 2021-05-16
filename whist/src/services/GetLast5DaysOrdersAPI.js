import { useState, useEffect } from 'react';
import axios from 'axios';
const GetLast5DaysOrdersAPI = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(
                '/last5daysorders/',
            );

            setOrders(result.data);

        };
        fetchItems();
    }, []);
    return orders;

};
export default GetLast5DaysOrdersAPI;