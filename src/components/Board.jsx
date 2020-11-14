import React, { useState } from "react";
import Cell from "./Cell";
import boardArray from "../consts/boardArray";
import inputModes from "../consts/inputModes";
import ControlPad from "./ControlPad";

const Board = () => {
	const [board, setBoard] = useState(boardArray);
	const [selected, setSelected] = useState({ row: 0, col: 0 });
	const [inputMode, setInputMode] = useState(0);

	const setCellValue = (value) => {
		setBoard((prevBoard) => {
			return prevBoard.map((row, rowIdx) => {
				if (rowIdx === selected.row) {
					return row.map((cell, colIdx) => {
						if (colIdx === selected.col) {
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
	};

	const handleKeyDown = (e) => {
		console.log(e.key);
		switch (e.key) {
			case "ArrowUp":
				return setSelected({
					row: selected.row === 0 ? selected.row : selected.row - 1,
					col: selected.col,
				});
			case "ArrowDown":
				return setSelected({
					row: selected.row === 8 ? selected.row : selected.row + 1,
					col: selected.col,
				});
			case "ArrowRight":
				return setSelected({
					row: selected.row,
					col: selected.col === 8 ? selected.col : selected.col + 1,
				});
			case "ArrowLeft":
				return setSelected({
					row: selected.row,
					col: selected.col === 0 ? selected.col : selected.col - 1,
				});
			case " ":
				return setInputMode((inputMode + 1) % 3);
			default:
				if (e.key.match(/[1-9]/) !== null) {
					return setCellValue(e.key);
				}
		}
	};

	return (
		<>
			<div className='game-root'>
				<div className='board' onKeyDown={handleKeyDown} tabIndex='0'>
					{board.map((row, rowIdx) => {
						return row.map((cell, colIdx) => {
							return (
								<Cell
									value={cell.value}
									notes={cell.notes}
									row={rowIdx}
									column={colIdx}
									handleSelect={(row, column) => {
										setSelected({ row: row, col: column });
									}}
									selected={rowIdx === selected.row && colIdx === selected.col}
								/>
							);
						});
					})}
				</div>
				<ControlPad
					handleNumberInput={setCellValue}
					setInputMode={(mode) => setInputMode(parseInt(mode))}
					inputMode={inputMode}
				/>
			</div>
		</>
	);
};

export default Board;
