import { useRecoilValue } from "recoil";
// Atoms
import { toDoState } from "../atoms";
// Components
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To-Do</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
