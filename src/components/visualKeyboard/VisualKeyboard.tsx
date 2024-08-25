import { FC, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import "./visualKeyboard.sass";

interface VisualKeyboardProps {
  nextKey: string;
}
// Define characters that require the shift key to be pressed
const shiftRequiredChars = [
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "{",
  "}",
  "|",
  ":",
  '"',
  "<",
  ">",
  "?",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const rightShiftKeys = "QWERTASDFGZXCVB";
const leftShiftKeys = "YUIOPHJKLNM";

const VisualKeyboard: FC<VisualKeyboardProps> = ({ nextKey }) => {
  const shiftRequired = (nextKey: string) => {
    return shiftRequiredChars.includes(nextKey);
  };

  const shiftKey = shiftRequired(nextKey);

  let buttonsToHighlight = nextKey;

  if (shiftKey) {
    if (rightShiftKeys.includes(nextKey)) buttonsToHighlight += " {shiftright}";
    else if (leftShiftKeys.includes(nextKey))
      buttonsToHighlight += " {shiftleft}";
    else {
      buttonsToHighlight += " {shiftleft} {shiftright}";
    }
  }

  const buttonTheme = [];

  if (buttonsToHighlight) {
    buttonTheme.push({
      class: "highlight",
      buttons: buttonsToHighlight,
    });
  }

  const layout = {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{capslock} a s d f g h j k l ; ' {enter}",
      "{shiftleft} z x c v b n m , . / {shiftright}",
      "{space}",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
      "{tab} Q W E R T Y U I O P { } |",
      '{capslock} A S D F G H J K L : " {enter}',
      "{shiftleft} Z X C V B N M < > ? {shiftright}",
      "{space}",
    ],
  };

  return (
    <Keyboard
      buttonTheme={buttonTheme}
      layout={layout}
      layoutName={shiftRequired(nextKey) ? "shift" : "default"}
    />
  );
};
export default VisualKeyboard;
