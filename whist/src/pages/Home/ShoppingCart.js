import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Paper from '@material-ui/core/Paper';
import { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import { postOrder } from '../../services/OrderService';
import ProductSummary from './ProductSummary';


const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

const ShoppingCart = ({ chosenItems, handlePay }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const [summarizedItems, setSummarizedItems] = useState({});
    useEffect(() => {
        if (chosenItems.length > 0) {
            const newSummaryItems = {};
            chosenItems.forEach((item) => {
                const id = item.id;
                const title = item.title;
                const price = item.price;
                if (newSummaryItems[id]) {
                    newSummaryItems[id].quantity += 1;
                } else {
                    newSummaryItems[id] = { title, quantity: 1, price };
                }
            });
            setSummarizedItems(newSummaryItems);
        }
    }, [chosenItems]);
    const pay = useCallback(async () => {
        const order = Object.entries(summarizedItems).reduce((o, [id, item]) => {
            o[id] = item.quantity;
            return o;
        }, {});
        await postOrder(order);
        handlePay();
        setSummarizedItems({});
    }, [summarizedItems, handlePay])

    return (
        <Box left='80%'
            position="relative">
            <Button onClick={handleClick}>
                {Object.keys(summarizedItems).length > 0 ? <Paper>{Object.keys(summarizedItems).length}</Paper> : ''}
                <ShoppingCartIcon />{'Shopping cart '}
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Paper>{Object.keys(summarizedItems).length > 0 ? <ProductSummary summarizedItems={summarizedItems} handlePay={pay} /> : ''}
                </Paper>
            </Popper>
        </Box>
    )
}

export default ShoppingCart;