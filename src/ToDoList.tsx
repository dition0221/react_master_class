import { useForm } from "react-hook-form";

/*
interface IForm {
  toDo: string;
}

export default function ToDoList() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log("Add to do", data.toDo);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo", { required: "Please write a To-Do" })} />
        <button>Add</button>
        <span>{errors?.toDo?.message}</span>
      </form>
    </div>
  );
}
*/

interface IForm {
  email: string;
  name: string;
  password: string;
  password1: string;
}

export default function ToDoList() {
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "PW are not the same." },
        { shouldFocus: true }
      );
    }
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only 'naver.com' emails allowed.",
            },
          })}
          placeholder="*Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("name", {
            required: "Name is required.",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "No 'nico' allowed." : true,
              noNick: (value) =>
                !value.includes("nick") || "No 'nick' allowed.",
            },
          })}
          placeholder="*Name"
        />
        <span>{errors?.name?.message}</span>
        <input
          {...register("password", {
            required: "PW is required.",
            minLength: { value: 5, message: "Your PW is too short" },
          })}
          placeholder="*Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "PW confirmation is required.",
          })}
          placeholder="*Password Confirmation"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
