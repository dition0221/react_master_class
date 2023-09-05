import { useRecoilState, useRecoilValue } from "recoil";
// Interface & Atoms
import {
  Categories,
  categoryState,
  hourSelector,
  minuteState,
  toDoSelector,
} from "../atoms";
// Components
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  // TODO : 데이터타입 변경하기

  /**/
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To-Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      {/*  */}
      <hr />
      <h1>Minutes ↔ Hours</h1>
      <input
        value={minutes}
        onChange={onMinuteChange}
        type="number"
        placeholder="minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="hours"
      />
      {/*  */}
    </div>
  );
}
