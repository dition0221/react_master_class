import { useForm } from "react-hook-form";

export default function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());

  return (
    <div>
      <form>
        <input {...register("email")} placeholder="Email" />
        <input {...register("name")} placeholder="Name" />
        <input {...register("password")} placeholder="Password" />
        <button>Add</button>
      </form>
    </div>
  );
}
