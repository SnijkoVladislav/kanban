import { useUser, fetcher } from "../lib/hooks";
import useSWR from "swr";
import dynamic from "next/dynamic";

const BoardNoSSR = dynamic(() => import("@lourenci/react-kanban"), {
  ssr: false,
});
import { useEffect, useState, useCallback, useMemo } from "react";

const initialBoard = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Add card",
          description: "Add capability to add a card in a column",
        },
      ],
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 2,
          title: "Drag-n-drop support",
          description: "Move a card between the columns",
        },
      ],
    },
  ],
};

export default function HomePage() {
  const [user] = useUser();
  const [board, setBoard] = useState(initialBoard);

  const addBoard = useCallback(async () => {
    // import { addCard, addColumn } from "@lourenci/react-kanban";
    const newColumn = {
      id: 4,
      title: "Bac",
    };
    const { addColumn } = await import("@lourenci/react-kanban");
    // console.log(addColumn);

    const newBoard = addColumn(board, newColumn);

    // console.log("11");
    console.log(newBoard);
    setBoard(newBoard);
  }, [board, setBoard]);

  console.log(board);

  return (
    <>
      <div onClick={() => addBoard()} className="addBoard">
        addBoard
      </div>
      {board && <BoardNoSSR> {board} </BoardNoSSR>}
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
}

// function UserList() {
//   const { data: { users } = {} } = useSWR("/api/users", fetcher);

//   const [board, setBoard] = useState(initialBoard)
//   const newBoard = addColumn(board, newColumn)
//   setBoard(newBoard)

//   return (
//     <>
//       <h2>All users</h2>
//       {!!users?.length && (
//         <ul>
//           {users.map((user) => (
//             <li key={user.username}>{JSON.stringify(user)}</li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }
