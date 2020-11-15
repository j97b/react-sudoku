import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { boardArray, cellObject } from "../consts/boardArray";
import inputModes from "../consts/inputModes";
import ControlPad from "./ControlPad";

const Board = () => {
	const [board, setBoard] = useState(boardArray);
	const [selected, setSelected] = useState({ row: 0, col: 0 });
	const [inputMode, setInputMode] = useState(0);
	const [win, setWin] = useState(false);
	const [updater, setUpdater] = useState(0);

	useEffect(() => {
		updateCellConflicts();
		updateGameState();
	}, [updater]);

	const setCellValue = async (value, clear) => {
		await setBoard((prevBoard) => {
			return prevBoard.map((row, rowIdx) => {
				if (rowIdx === selected.row) {
					return row.map((cell, colIdx) => {
						if (colIdx === selected.col && !cell.prefilled) {
							if (clear) {
								return cellObject;
							}
							return inputMode === 0
								? {
										...cell,
										value:
											cell.value === parseInt(value) ? null : parseInt(value),
								  }
								: {
										...cell,
										notes: {
											...cell.notes,
											[value]: {
												...cell.notes[value],
												[inputModes[inputMode]]: !cell.notes[value][
													inputModes[inputMode]
												],
											},
										},
								  };
						} else {
							return cell;
						}
					});
				} else {
					return row;
				}
			});
		});
		setUpdater(updater + 1);
	};

	const updateGameState = () => {
		setWin(filledCells() === 81 && boardHasNoConflicts());
	};

	const filledCells = () => {
		let count = 0;
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell.value) {
					count++;
				}
			});
		});
		return count;
	};

	const boardHasNoConflicts = () => {
		let bool = true;
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell.conflict === true) {
					bool = false;
				}
			});
		});
		return bool;
	};

	const updateCellConflicts = () => {
		setBoard((prevBoard) => {
			return prevBoard.map((row, rowIdx) => {
				return row.map((cell, colIdx) => {
					return rowConflict(cell, rowIdx, colIdx) ||
						colConflict(cell, rowIdx, colIdx) ||
						regionConflict(cell, rowIdx, colIdx)
						? {
								...cell,
								conflict: true,
						  }
						: {
								...cell,
								conflict: false,
						  };
				});
			});
		});
	};

	const rowConflict = (cell, rowIdx, colIdx) => {
		for (let col = 0; col < 9; col++) {
			if (
				col !== colIdx &&
				cell.value === board[rowIdx][col].value &&
				cell.value !== null
			) {
				return true;
			}
		}
	};

	const colConflict = (cell, rowIdx, colIdx) => {
		for (let row = 0; row < 9; row++) {
			if (
				row !== rowIdx &&
				cell.value === board[row][colIdx].value &&
				cell.value !== null
			) {
				return true;
			}
		}
	};

	const regionConflict = (cell, rowIdx, colIdx) => {
		const startRow = rowIdx - (rowIdx % 3);
		const startCol = colIdx - (colIdx % 3);
		for (let row = startRow; row < startRow + 3; row++) {
			for (let col = startCol; col < startCol + 3; col++) {
				if (
					row !== rowIdx &&
					col !== colIdx &&
					cell.value !== null &&
					cell.value === board[row][col].value
				) {
					return true;
				}
			}
		}
	};

	const clearCell = () => setCellValue(undefined, true);

	const modulusCalc = (n, m) => {
		return ((n % m) + m) % m;
	};

	const handleKeyDown = (e) => {
		e.preventDefault();
		switch (e.key) {
			case "ArrowUp":
				return setSelected({
					row: modulusCalc(selected.row - 1, 9),
					col: selected.col,
				});
			case "ArrowDown":
				return setSelected({
					row: modulusCalc(selected.row + 1, 9),
					col: selected.col,
				});
			case "ArrowRight":
				return setSelected({
					row: selected.row,
					col: modulusCalc(selected.col + 1, 9),
				});
			case "ArrowLeft":
				return setSelected({
					row: selected.row,
					col: modulusCalc(selected.col - 1, 9),
				});
			case " ":
				return setInputMode((inputMode + 1) % 3);
			case "c":
				return clearCell();
			default:
				if (e.key.match(/[1-9]/) !== null) {
					return setCellValue(e.key);
				}
		}
	};

	return (
		<>
			<div className='game-root' onKeyDown={handleKeyDown}>
				<div className='board' tabIndex='0'>
					{board.map((row, rowIdx) => {
						return row.map((cell, colIdx) => {
							return (
								<Cell
									key={`${rowIdx}${colIdx}`}
									value={cell.value}
									notes={cell.notes}
									row={rowIdx}
									column={colIdx}
									handleSelect={(row, column) => {
										setSelected({ row: row, col: column });
									}}
									selected={rowIdx === selected.row && colIdx === selected.col}
									prefilled={cell.prefilled}
									conflict={cell.conflict}
								/>
							);
						});
					})}
				</div>
				<ControlPad
					handleNumberInput={setCellValue}
					setInputMode={(mode) => setInputMode(parseInt(mode))}
					inputMode={inputMode}
					clearCell={clearCell}
				/>
			</div>
			<button onClick={() => console.log(boardHasNoConflicts(), filledCells())}>
				fn test
			</button>
		</>
	);
};

export default Board;
