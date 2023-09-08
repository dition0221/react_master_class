import { useState } from "react";
import { styled } from "styled-components";
import { FaCirclePlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
// Interface & Atoms
import { toDoState } from "../atoms";

// * 모달박스를 통해 새로운 Board를 생성함

const AddButton = styled.button`
  position: fixed;
  top: 25px;
  right: 25px;
  background-color: transparent;
  border: none;
  &:hover {
    color: #ffeaa7;
  }
  transition: color 0.3s ease-in-out;
`;

const AddButtonIcon = styled(FaCirclePlus)`
  width: 50px;
  height: 50px;
  display: flex;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
`;

const ModalWindow = styled.div`
  width: 30%;
  height: 50%;
  background-color: #dfe6e9;
  border-radius: 30px;
  padding-top: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 24px;
`;

interface IForm {
  keyName: string;
}

function AddBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    // Close modal-box when click outside of modal-box
    if (event.currentTarget === event.target) {
      setIsModalOpen(false);
    }
  };
  /* form */
  const { register, handleSubmit, reset } = useForm<IForm>();
  const [toDoList, setToDoList] = useRecoilState(toDoState);
  // Add new board to 'toDoState'
  const onValid = ({ keyName }: IForm) => {
    const toDoListCopy = { ...toDoList };
    toDoListCopy[keyName] = [];
    setToDoList(toDoListCopy); // Add new board
    reset();
    setIsModalOpen(false); // Close modal-box
  };

  // TODO : 모달박스 만들기
  return (
    <>
      <AddButton onClick={openModal}>
        <AddButtonIcon />
      </AddButton>
      {isModalOpen ? (
        <ModalOverlay onClick={closeModal}>
          <ModalWindow>
            <Title>Add Board</Title>
            <form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("keyName", { required: true })}
                type="text"
                placeholder="Write title of board"
              />
            </form>
          </ModalWindow>
        </ModalOverlay>
      ) : null}
    </>
  );
}

export default AddBoard;
