import React from 'react';
import Grid from '@material-ui/core/Grid';
import Top5Sales from './Top5Sales'
import {useEffect, useState} from 'react'
import ItemService from './../../services/ItemService';

const Stats = () => {
	const { top5ItemsAPI, top5UniqueSelAPI, last5DaysOrdersAPI } = ItemService();
	const [top5Items, settop5Items] = useState([]);
	const [top5UniqueSel, settop5uniqueSel] = useState([]);
	const [last5DaysOrders, setlast5DaysOrders] = useState([]);

	useEffect(() => {
		settop5Items(top5ItemsAPI);
		settop5uniqueSel(top5UniqueSelAPI);
		setlast5DaysOrders(last5DaysOrdersAPI)

	  }, [top5ItemsAPI, top5UniqueSelAPI, last5DaysOrdersAPI]);

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
		>

			<Grid m={2}>
				<Top5Sales title={'Top 5 items:'} elements ={top5Items} />
			</Grid>
			<Grid m={2}>
				<Top5Sales title={'Top 5 unique sel'} elements ={top5UniqueSel} />
			</Grid>
			<Grid m={2}>
				<Top5Sales title={'Top 5 orders from the last 5 days'} elements ={last5DaysOrders||console.log('last 5 days', last5DaysOrders)} />
			</Grid>
		</Grid>
	);
};

export default Stats;
