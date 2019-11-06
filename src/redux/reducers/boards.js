const initialState = {
    boards: []
};

export default function list(state = initialState, action) {
    if (action.type === 'ADD_BOARD') {
        return {
            boards: [...state.boards, action.payload]
        };
    } else if (action.type === 'ADD_COLUMNS_IN_BOARD') {
        const targetBoardIndex = state.boards.findIndex(board => board.id === action.payload.id);
        const updatedBoards = [...state.boards];
        updatedBoards[targetBoardIndex] = {
            ...state.boards[targetBoardIndex],
            columns: [...state.boards[targetBoardIndex].columns].concat(action.payload)
        };

        return {
            ...state,
            boards: updatedBoards
        };
    } else if (action.type === 'DELETE_COLUMN') {
        const targetBoardIndex = state.boards.findIndex(board => board.id === action.payload.id);
        const updatedBoards = [...state.boards];
        updatedBoards[targetBoardIndex] = {
            ...state.boards[targetBoardIndex],
            columns: [...state.boards[targetBoardIndex].columns].filter(
                column => column.columnId !== action.payload.columnId
            )
        };

        return {
            ...state,
            boards: updatedBoards
        };
    } else if (action.type === 'ADD_COLUMN_CARD') {
        const targetBoardIndex = state.boards.findIndex(board => board.id === action.payload.columnId.id);
        const updatedBoards = [...state.boards];
        const currentBoardIndex = state.boards[targetBoardIndex].columns.findIndex(
            item => item.columnId === action.payload.columnId.columnId
        );
        updatedBoards[targetBoardIndex].columns[currentBoardIndex].cardNames = {
            ...state.boards[targetBoardIndex],
            cardNames: [...state.boards[targetBoardIndex].columns[currentBoardIndex].cardNames].concat(
                action.payload.title
            )
        };

        return {
            ...state,
            boards: updatedBoards
        };
    }
    return state;
}