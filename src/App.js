import { Landing } from "./components/pages";
import { SubjectProvider } from "./context/SubjectContext";

const App = () => {
  return (
    <div className="App">
      <SubjectProvider>
        <Landing />
      </SubjectProvider>
    </div>
  );
};

export default App;
