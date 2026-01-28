import employeeIcon from '@ui5/webcomponents-icons/dist/employee.js';
import { Avatar, ShellBar, FlexBox } from "@ui5/webcomponents-react";
import TodoPage from "./pages/todos/Todos";

function App() {
  return (
    <FlexBox direction="Column" style={{ height: "100vh" }}>
      <ShellBar
        logo={
          <img
            src="https://raw.githubusercontent.com/SAP/ui5-webcomponents-react/main/assets/ui5-logo.svg"
            alt={'UI5 Web Components for React logo'}
          />
        }
        profile={<Avatar icon={employeeIcon} />}
        primaryTitle="UI5 Web Components React Todo App"
      />
      <div style={{ flex: 1, padding: "1.5rem", background: "#f5f6f7" }}>
        <TodoPage />
      </div>
    </FlexBox>
  );
}

export default App;
