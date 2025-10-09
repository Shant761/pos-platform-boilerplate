import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    // Слушаем событие закрытия транзакции
    Poster.events.on("transaction.closed", (transaction) => {
      this.setState(
        (prev) => ({
          transactions: [transaction, ...prev.transactions].slice(0, 5),
        }),
        () => {
          // Показываем popup с последними 5 транзакциями
          const htmlContent = `
            <h2>Последние 5 транзакций</h2>
            ${this.state.transactions
              .map(
                (tx, i) =>
                  `<pre style="border:1px solid #ccc;padding:5px;">#${i + 1} ${JSON.stringify(
                    tx,
                    null,
                    2
                  )}</pre>`
              )
              .join("")}
          `;

          Poster.interface.popup({
            width: 500,
            height: 400,
            title: "Последние транзакции",
            url: "data:text/html," + encodeURIComponent(htmlContent),
          });
        }
      );

      // Для теста можно также выводить в консоль
      console.log("Закрыта транзакция:", transaction);
    });
  }

  render() {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Poster React WebApp</h1>
        <p>Транзакции будут отображаться в popup при закрытии.</p>
        <ul>
          {this.state.transactions.map((tx, i) => (
            <li key={i}>{tx.transactionId || JSON.stringify(tx)}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-container"));
