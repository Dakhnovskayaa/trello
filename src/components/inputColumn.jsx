import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles/currentBoard.css';
const InputColumn = (columnId, id) => {
	const dispatch = useDispatch();
	const [columnCard, setColumnCard] = useState('');
	const [openComponent, setOpen] = useState(true);
	const state = useSelector(state => state);
	const targetBoardIndex = state.boards.findIndex(board => {
		return board.id === columnId.id;
	});
	const columns = state.boards[targetBoardIndex].columns;
	const currentBoardIndex = state.boards[targetBoardIndex].columns.findIndex(item => {
		return item.columnId === columnId.columnId;
	});

	let currentColumnCard = columns[currentBoardIndex];
	let title = currentColumnCard.cardNames.cardNames;

	const addColumnCard = e => {
		dispatch({
			type: 'ADD_COLUMN_CARD',
			payload: {
				title: columnCard,
				id: id,
				columnId: columnId
			}
		});
		setColumnCard('');
		setOpen(false);
	};

	return (
		<div>
			<span>{title}</span>
			{openComponent && (
				<div className="input-block">
					<input
						value={columnCard}
						onChange={e => setColumnCard(e.target.value)}
						placeholder="name card"
						type="text"
						autoComplete="off"
					/>
					<button
						className="button-add-title"
						type="button"
						value={columnId.columnId}
						onClick={e => addColumnCard(e)}
					>
						add
					</button>
				</div>
			)}
		</div>
	);
};
// };
export default InputColumn;
