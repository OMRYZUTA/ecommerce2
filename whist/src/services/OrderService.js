import axios from 'axios';

export async function postOrder(summarizedItems) {
    return await axios({
        method: 'post',
        url: '/orders/',
        data: {
            payload: summarizedItems,
        },
    });
}
