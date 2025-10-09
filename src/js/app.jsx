import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = { transactions: [] };

  componentDidMount() {
    Poster.events.on('transaction.closed', (tx) => {
      this.setState((prev) => ({
        transactions: [tx, ...prev.transactions].slice(0, 5)
      }));
      Poster.interface.popup({
        width: 500,
        height: 400,
        title: 'Последние транзакции',
        url: 'data:text/html,' + encodeURIComponent(`
          <h2>Последние 5 транзакций</h2>
          ${this.state.transactions.map((t, i) => `<pre>${JSON.stringify(t, null, 2)}</pre>`).join('')}
        `)
      });
    });
  }

  render() {
    return <div id="app-container">React WebApp для Poster загружен</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app-container'));
