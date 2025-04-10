import "./App.css";

function App() {
  return (
    <div>
      <h1>Calculadora de Horas Trabalhadas na Task</h1>
      <h3>Escolha o modo de cálculo:</h3>
      <ul>
        <li>
          <a href="/modo-esperado">Modo Esperado</a>
          <h4>
            Indicado para: quando você estima horas no começo da sprint e vai
            alimentando as horas já completadas e que ainda faltam
          </h4>
        </li>
        <li>
          <a href="/modo-real">Modo Real</a>
          <h4>
            Indicado para: quando você esqueceu de alimentar as horas ao longo
            do desenvolvimento da task e deixa para colocar somente as horas
            completadas no final
          </h4>
        </li>
      </ul>
    </div>
  );
}

export default App;
