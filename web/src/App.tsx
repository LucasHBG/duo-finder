interface buttonProps {
  title: string;
}

function Button(props: buttonProps) {
  return <button>{props.title}</button>;
}

function App() {
  return (
    <div>
      <h1> Hello world </h1>
      <Button title="btn 1"/>
      <Button title="btn 2"/>
      <Button title="Gol?"/>
    </div>
  );
}

export default App;
