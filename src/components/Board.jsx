import React, { useState } from "react";
import Cell from "./Cell";
import { boardArray, cellObject } from "../consts/boardArray";
import inputModes from "../consts/inputModes";
import ControlPad from "./ControlPad";

const Board = () => {
	const [board, setBoard] = useState(boardArray);
	const [selected, setSelected] = useState({ row: 0, col: 0 });
	const [inputMode, setInputMode] = useState(0);

	const setCellValue = (value, clear) => {
		setBoard((prevBoard) => {
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
		</>
	);
};

export default Board;
