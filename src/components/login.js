import { useState } from "react";

const Login = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
    console.log(`name: ${name}`);
  };

  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
    console.log(`id: ${id}`);
  };

  const login = () => {
    props.login({ name: name, id: id });
    props.history.push("/");
    console.log(`username: ${name}`);
    console.log(`id: ${id}`);
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form className="flex flex-col max-w-[200px] mx-auto">
        <input
          type="text"
          id="username"
          placeholder="enter username"
          value={name}
          onChange={onChangeName}
          className="my-2 px-2 rounded-xl"
        />
        <input
          type="text"
          id="id"
          placeholder="enter id"
          value={id}
          onChange={onChangeId}
          className="my-2 px-2 rounded-xl"
        />
        <button onClick={login}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
