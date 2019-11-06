import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/boards.css';
import { Draggable, Droppable } from 'react-drag-and-drop';

import { useDispatch } from 'react-redux';

const Boards = () => {
	const [openComponent, setOpen] = useState(false);
	const boardsState = useSelector(state => state);
	const [boardName, setBoard] = useState('');
	const dispatch = useDispatch();

	const addBoard = () => {
		if (boardName !== '') {
			dispatch({
				type: 'ADD_BOARD',
				payload: {
					id: Date.now().toString(),
					boardName,
					columns: []
				}
			});
			setBoard('');
			setOpen(false);
		} else {
			alert('введите название');
		}
	};
	const onDragEnter = item => {
		console.log('item', item.item.boardName);
	};

	const closeModal = () => {
		setOpen(false);
	};
	return (
		<div className="home-page">
			<button className="add-board" onClick={() => setOpen(true)}>
				ADD BOARD
			</button>
			<div className="all-boards">
				{boardsState.boards.map(item => (
					<Link className="link-board" key={item.id} to={`/board/${item.id}/${item.boardName}`}>
						<span key={item.id} className="current-board">
							<Droppable onDragEnter={() => onDragEnter({ item })}>{item.boardName}</Droppable>
						</span>
						<Draggable onDragEnter={onDragEnter.bind(this)} />
					</Link>
				))}
			</div>

			{openComponent && (
				<div className="modal-window">
					<div className="modal-content">
						<div>
							<input
								autoComplete="off"
								value={boardName}
								onChange={e => setBoard(e.target.value)}
								placeholder="name of board"
								type="text"
								name="boardName"
								required
							/>
							<button className="btn button-add" type="button" onClick={() => addBoard()}>
								add
							</button>
						</div>
						<button className="btn  " onClick={() => closeModal()}>
							x
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Boards;
