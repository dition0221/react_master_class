import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    console.log(value);
  };
  return (
    <div>
      <form>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default App;
