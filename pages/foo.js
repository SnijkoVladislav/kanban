// import Board, { moveCard } from "@lourenci/react-kanban";
import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";

const BoardNoSSR = dynamic(() => import("@lourenci/react-kanban"), {
  ssr: false,
});
// Use your own styles to override the default styles
// import "./styles.css";

const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content",
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content",
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content",
        },
      ],
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content",
        },
      ],
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content",
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content",
        },
      ],
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content",
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content",
        },
      ],
    },
  ],
};
// <div onClick={() => addColumn({ id: 10, title: "Title", cards: [] })}>
//   Add column
// </div>

const ColumnAdder = ({ addColumn }) => {
  return <>lorem</>;
};

function ControlledBoard({ board }) {
  return (
    <>
      <BoardNoSSR
        allowRemoveLane
        allowRenameColumn
        allowAddColumn
        allowRemoveCard
        onLaneRemove={console.log}
        onCardRemove={console.log}
        onLaneRename={console.log}
        allowAddCard={{ on: "top" }}
        onNewCardConfirm={(draftCard) => ({
          id: new Date().getTime(),
          ...draftCard,
        })}
        onCardNew={console.log}
      >
        {board}
      </BoardNoSSR>
    </>
  );
}

export default function Foo() {
  const [controlledBoard, setBoard] = useState(board);
  const [newColumnName, setNewColumnName] = useState("");
  const [newCardName, setNewCardName] = useState("");

  const onColumnNew = useCallback(async () => {
    const newColumn = {
      id: 677,
      title: newColumnName,
      cards: [],
    };
    const { addColumn } = await import("@lourenci/react-kanban");
    const newBoard = addColumn(controlledBoard, newColumn);
    setBoard(newBoard);
  }, [controlledBoard, newColumnName]);

  const onCardNew = useCallback(async () => {
    const newColumn = {
      id: 677,
      title: newCardName,
      cards: [{ id: 6, title: "newCardName", description: "Card content" }],
    };
    const { addColumn } = await import("@lourenci/react-kanban");
    // console.log(addColumn);
    const newBoard = addColumn(controlledBoard, newColumn);
    // console.log("11");
    // console.log(newBoard);
    setBoard(newBoard);
  }, [controlledBoard, newCardName]);

  return (
    <>
      <input type="text" onChange={(e) => setNewColumnName(e.target.value)} />
      {newColumnName && (
        <div onClick={() => onColumnNew()} className="addBoard">
          addBoard
        </div>
      )}

      <input type="text" onChange={(e) => setNewCardName(e.target.value)} />
      {newCardName && (
        <div onClick={() => onCardNew()} className="addBoard">
          addBoard
        </div>
      )}

      <ControlledBoard board={controlledBoard} />
    </>
  );
}
