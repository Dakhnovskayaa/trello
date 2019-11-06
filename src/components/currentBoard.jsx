import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uniqueId from 'lodash/uniqueId';
import './styles/currentBoard.css';
import INPUTCOLUMN from './inputColumn';
const CurrentBoard = current => {
	const dispatch = useDispatch();
	const boardId = current.match.params.id;
	const [columnName, setColumn] = useState('');

	const name = current.match.params.name;
	const state = useSelector(state => state);
	const targetBoardIndex = state.boards.findIndex(board => {
		return board.id === boardId;
	});
	const columns = state.boards[targetBoardIndex].columns;

	const addColumn = e => {
		dispatch({
			type: 'ADD_COLUMNS_IN_BOARD',
			payload: {
				id: boardId,
				name,
				columnId: uniqueId(),
				title: columnName,
				cardNames: []
			}
		});
		setColumn('');
	};

	const deleteColumn = e => {
		dispatch({
			type: 'DELETE_COLUMN',
			payload: {
				columnId: e.target.value,
				id: boardId
			}
		});
	};

	return (
		<div className="my-board">
			<h1>{name}</h1>
			<div>
				<input
					value={columnName}
					onChange={e => setColumn(e.target.value)}
					placeholder="name of column"
					type="text"
					name="columnName"
					required
					autoComplete="off"
				/>
				<button type="button" onClick={e => addColumn(e)}>
					add
				</button>
			</div>

			<div className="columns-block">
				{columns.map(item => (
					<div className="columns">
						<div>
							<button
								className="button-delete-column"
								value={item.columnId}
								onClick={e => deleteColumn(e)}
							>
								x
							</button>
							<h3 className="title" key={item.columnId}>
								{item.title}
							</h3>
						</div>
						<INPUTCOLUMN key={item.columnId} columnId={item.columnId} id={boardId} />
					</div>
				))}
			</div>
		</div>
	);
};
export default CurrentBoard;
