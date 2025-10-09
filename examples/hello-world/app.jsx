class ExampleApp extends React.Component {
    lastTransactions = []; // Хранит последние 5 транзакций
    popupId = null; // Сохраняем ID открытого popup

    componentDidMount() {
        Poster.events.on("transaction.closed", (transaction) => {
            // Добавляем новую транзакцию в массив
            this.lastTransactions.unshift(transaction);
            if (this.lastTransactions.length > 5) this.lastTransactions.pop();

            // Формируем HTML с последними 5 транзакциями
            const content = `
                <h2>Последние транзакции</h2>
                ${this.lastTransactions.map((tx, i) => `
                    <div style="margin-bottom: 10px; padding:5px; border-bottom:1px solid #ccc;">
                        <strong>Транзакция ${i + 1}:</strong>
                        <pre style="white-space: pre-wrap; word-wrap: break-word;">${JSON.stringify(tx, null, 2)}</pre>
                    </div>
                `).join('')}
            `;

            // Если popup ещё не открыт, создаём новый
            if (!this.popupId) {
                this.popupId = Poster.interface.popup({
                    width: 500,
                    height: 400,
                    title: 'Последние транзакции',
                    url: 'data:text/html,' + encodeURIComponent(content)
                });
            } else {
                // Если popup уже открыт, обновляем его содержимое
                Poster.interface.updatePopup(this.popupId, {
                    url: 'data:text/html,' + encodeURIComponent(content)
                });
            }
        });
    }

    render() {
        return (
            <div style={{ padding: 20, textAlign: "center" }}>
                <h3>Тест события Poster</h3>
                <p>Закрывай транзакции — popup будет обновляться и показывать последние 5.</p>
            </div>
        );
    }
}
