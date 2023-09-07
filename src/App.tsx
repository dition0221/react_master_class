import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
// Atoms
import { toDoState } from "./atoms";
// Components
import Board from "./components/Board";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { draggableId, source, destination } = info;
    // No movement
    if (!destination) return;
    // Movement within the same board
    if (source.droppableId === destination?.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1); // 1) Delete
        boardCopy.splice(destination?.index, 0, draggableId); // 2) Put back
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    // Movement to different boards
    if (source.droppableId !== destination.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1); // 1) Delete
        destinationBoard.splice(destination?.index, 0, draggableId); // 2) Put back
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
