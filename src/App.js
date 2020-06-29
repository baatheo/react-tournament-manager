import React from 'react';
import {MainPage} from "./Pages/MainPage";

function App() {
  return (
      <html lang="pl">
      <head>
        <meta charSet="UTF-8"/>
        <title>My React learning</title>
        <script src="https://unpkg.com/react/umd/react.development.js"/>
        <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"/>
        <script src="https://unpkg.com/babel-standalone/babel.js"/>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin/>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="App">
          <MainPage/>
        </div>
      </body>
      </html>
  );
}

export default App;
