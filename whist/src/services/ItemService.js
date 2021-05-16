import axios from 'axios';
import GetAllItems from './GetAllItems';
import GetTop5ItemsAPI from './GetTop5ItemsAPI';
import GetLast5DaysOrdersAPI from './GetLast5DaysOrdersAPI';
import GetTop5UniqueSelAPI from './GetTop5UniqueSelAPI';

const ItemService = () => {
    const putItem = (props) => {
        if (props) {
            const putCallback = async () => {
                await axios({
                    method: 'PUT', url:
                        `http://127.0.0.1:8000/items/${props.id}/`, data: props
                });
            };

            putCallback();
        }
    }
    const postItem = (props) => {
        if (props) {
            const postCallback = async () => {
                await axios({
                    method: 'post', url:
                        'http://127.0.0.1:8000/items/', data: props
                }
                );
            };
            postCallback();
        }
    }
    const deleteItem = (props) => {
        if (props) {
            const deleteCallback = async () => {
                await axios({
                    method: 'DELETE', url:
                        `http://127.0.0.1:8000/items/${props.id}/`, data: props
                });
            };

            deleteCallback();
        }
    }
    const allItems = GetAllItems();
    const top5ItemsAPI = GetTop5ItemsAPI();
    const top5UniqueSelAPI = GetTop5UniqueSelAPI();
    const last5DaysOrdersAPI = GetLast5DaysOrdersAPI();
    return { top5ItemsAPI, top5UniqueSelAPI, last5DaysOrdersAPI, putItem, postItem, deleteItem, allItems };
};
export default ItemService;