import NIHONGO_SHARK_DECK from "./deck.json";

export const nihongoSharkMnemonics = NIHONGO_SHARK_DECK.notes.map(
  ({ fields }) => {
    const kanji = fields[4];
    const heisigStory = fields[11];
    const heisigComment = fields[12];
    const koohiiStory1 = fields[13];
    const koohiiStory2 = fields[14];
    return { kanji, heisigStory, heisigComment, koohiiStory1, koohiiStory2 };
  }
);
