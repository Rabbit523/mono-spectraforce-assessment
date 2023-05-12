import { useSelector } from "react-redux";
import { RootState } from "./store";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import ResourceLists from "./components/resourceLists";
import "./App.css";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div className="App">
      {!isAuthenticated ? (
        <ResourceLists />
      ) : (
        <>
          <LoginForm /> <RegisterForm />
        </>
      )}
    </div>
  );
}

export default App;
