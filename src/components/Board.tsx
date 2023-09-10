import { Droppable } from "@hello-pangea/dnd";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { FaXmark, FaRegFolderOpen } from "react-icons/fa6";
// Interface & Atoms
import { IToDo, toDoState } from "../atoms";
// Components
import DraggableCard from "./DraggableCard";

const Wrapper = styled.section`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  /* background-color 수정하기 */
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.boardColor};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 5px;
  div {
    display: flex;
    align-items: center;
  }
  /* TODO : Windows98 스타일로 꾸미기 */
  /* TODO : 보드의 body부분 Droppable 영역 고치기 */
`;

const FolderIcon = styled(FaRegFolderOpen)`
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonIcon = styled(FaXmark)`
  font-size: 22px;
  cursor: pointer;
  &:hover {
    color: red;
  }
  transition: color 0.2s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
  input {
    width: 100%;
  }
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Area = styled.article<IAreaProps>`
  padding: 0 20px;
  padding-top: 10px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#ffeaa7"
      : props.$isDraggingFromThis
      ? "#b2bec3"
      : "whitesmoke"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
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
        <div>
          <FolderIcon />
          <Title>{boardId}</Title>
        </div>
        <DeleteButton>
          <DeleteButtonIcon />
        </DeleteButton>
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
