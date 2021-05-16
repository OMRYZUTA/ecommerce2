import { useState, useEffect } from 'react';
import axios from 'axios';
const OrderService = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [promises, setPromises] = useState([]);

    //post orderItem
    const postOrderItem = (props) => {
        if (props) {
            const postCallback = () => {
                axios({
                    method: 'post', url:
                        'http://127.0.0.1:8000/orderitems/', data: props
                }
                ).then(response => {
                    setOrderItems([...orderItems, response.data.url]);
                    console.log('adding', response.data.url)
                });
            };
            postCallback();
        }
    }
    const postOrder = async (summarizedItems) => {
        console.log('in post order');
        // const promises = Object.keys(summarizedItems).map(item => {
        //     return (new Promise((resolve, reject) => { return (postOrderItem({ "quantity": summarizedItems[item].quantity, "item": summarizedItems[item].url })); })
        //     )
        // })
        const promises = Object.keys(summarizedItems).map(item => {
            return (
                axios({
                    method: 'post', url: 'http://127.0.0.1:8000/orderitems/', data: { "quantity": summarizedItems[item].quantity, "item": summarizedItems[item].url }
                }));
        })
        console.log('promises', promises);
        if (summarizedItems) {
            Promise.all(promises).then(values => {
                axios({
                    method: 'post', url: 'http://127.0.0.1:8000/orders/', data: {
                        "items": values.map(item => {
                            return item.data.url;
                        })
                    }
                })
                console.log('after all promieses', values);
                return values;
            }).catch(err => { console.log('error', err) });
            console.log('after promise all');
        }
    };

    return postOrder;
}
export default OrderService;