import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './styles/createBoards.css';

const CreateBoard = () => {
	const [boardName, setBoard] = useState('');
	const dispatch = useDispatch();

	return (
		<div className="modal-window">
			<div className="modal-content">
				<input
					value={boardName}
					autoComplete="off"
					onChange={e => setBoard(e.target.value)}
					placeholder="name of board"
					type="text"
					name="boardName"
					required
				/>
				<button
					type="button"
					onClick={() =>
						dispatch({
							type: 'ADD_BOARD',
							payload: {
								id: Date.now().toString(),
								boardName,
								columns: []
							}
						})}
				>
					add
				</button>
			</div>
		</div>
	);
};

export default CreateBoard;
