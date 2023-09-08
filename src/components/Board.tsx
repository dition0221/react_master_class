import { Droppable } from "@hello-pangea/dnd";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
// Interface & Atoms
import { IToDo, toDoState } from "../atoms";
// Components
import DraggableCard from "./DraggableCard";

const Wrapper = styled.section`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#ffeaa7"
      : props.$isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const setToDoState = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDoState((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    reset();
  };

  return (
    <Wrapper>
      <Header>
        <span>📁</span>
        <Title>{boardId}</Title>
        <button>x</button>
      </Header>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
