import React from "react";
import AlunoCadastrar from "./Pages/AlunoCadastrar";
import ImcCadastrar from "./Pages/ImcCadastrar";
import ListarImcs from "./Pages/ListarImcs";
import AlterarImc from "./Pages/AlterarImc";

function App() {
  return (
    <div id="app">
      <AlunoCadastrar></AlunoCadastrar>
      <ImcCadastrar></ImcCadastrar>
      <ListarImcs></ListarImcs>
      <AlterarImc></AlterarImc>
    </div>
  );
}

export default App;
