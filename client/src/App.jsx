import "./index.css"; // if you have global css
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";

function App() {
  return (
    <div style={{ padding: 24, minHeight: "100vh", background: "#121212", color: "#fff" }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 48 }}>Your Notes</h1>
      </header>

      <main style={{ maxWidth: 980 }}>
        <NoteInput />
        <NoteList />
      </main>
    </div>
  );
}

export default App;
