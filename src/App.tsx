import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // ✅ Import du toaster
import MainApp from "./AddPatient";
import LoginForm from "./Login";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import StepFour from "./FormFour";
import FormThree from "./FormThree";

function App() {
  return (
    <Router>
      {/* ✅ Le composant Toaster doit être affiché au-dessus de tes routes */}
      <Toaster richColors position="top-center" />

      <Routes>
        {/* Page de connexion */}
        <Route path="/" element={<LoginForm />} />

        {/* Pages applicatives */}
        <Route path="/formone" element={<FormOne />} />
        <Route path="/formtwo" element={<FormTwo />} />
        <Route path="/formthree" element={<FormThree />} />
        <Route path="/formfour" element={<StepFour />} />

        {/* Page principale */}
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
