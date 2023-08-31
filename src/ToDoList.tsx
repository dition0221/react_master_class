import { useForm } from "react-hook-form";

export default function ToDoList() {
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          {...register("pw", {
            required: "PW is Required",
            minLength: { value: 5, message: "Your PW is too short" },
          })}
          placeholder="PW"
        />
        <input {...register("password")} placeholder="Password" />
        <button>Add</button>
      </form>
    </div>
  );
}
