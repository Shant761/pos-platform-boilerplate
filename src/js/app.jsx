import React from 'react';
import ReactDOM from 'react-dom';

class ExampleApp extends React.Component {
    lastTransactions = [];
    popupId = null;

    componentDidMount() {
        // Подписка на событие закрытия транзакции
        Poster.events.on("transaction.closed", (transaction) => {
            // Добавляем новую транзакцию в начало массива
            this.lastTransactions.unshift(transaction);
            if (this.lastTransactions.length > 5) this.lastTransactions.pop();

            // Формируем HTML для popup
            const content = `
                <h2>Последние транзакции</h2>
                ${this.lastTransactions.map((tx, i) => `
                    <div style="margin-bottom:10px; padding:5px; border-bottom:1px solid #ccc;">
                        <strong>Транзакция ${i + 1}:</strong>
                        <pre style="white-space: pre-wrap; word-wrap: break-word;">
${JSON.stringify(tx, null, 2)}
                        </pre>
                    </div>
                `).join('')}
            `;

            // Создаем или обновляем popup
            if (!this.popupId) {
                this.popupId = Poster.interface.popup({
                    width: 500,
                    height: 400,
                    title: 'Последние транзакции',
                    url: 'data:text/html,' + encodeURIComponent(content)
                });
            } else {
                Poster.interface.updatePopup(this.popupId, {
                    url: 'data:text/html,' + encodeURIComponent(content)
                });
            }
        });
    }

    render() {
        return (
            <div style={{ padding: 20, textAlign: 'center' }}>
                <h3>Тест события Poster</h3>
                <p>Закрывай транзакции — popup будет обновляться и показывать последние 5.</p>
            </div>
        );
    }
}

ReactDOM.render(
    <ExampleApp />,
    document.getElementById('app-container')
);
