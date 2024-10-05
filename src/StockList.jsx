function StockList(props){

	return (
		<div className="stock-list-container">
			<h2>Stock List</h2>
			{props.stocks.length === 0 ? ( <p>No stocks added yet.</p>) : 
			(
				<ul>
					{
						props.stocks.map((stock, index) => (
							<li key={index} style={{ marginBottom: "10px", listStyle: "none" }}>
								<b>Symbol:</b> {stock.stockSymbol} <br />
								<b>Quantity:</b> {stock.stockQuantity} <br />
								<b>Purchase Price:</b> ${stock.purchasePrice} <br />
								<b>Current Price:</b> ${stock.currentPrice} <br />
								<b>
									<span style={{ color: stock.profitLoss >= 0 ? "green" : "red" }}>
									Profit/Loss: {stock.profitLoss !== null ? `$${stock.profitLoss >= 0 ? `+${stock.profitLoss.toFixed(2)}` : stock.profitLoss.toFixed(2)}` : "Calculating..."}
									</span>
								</b>
							</li>
					))}
				</ul>
			)}
		</div>
		);
	}

export default StockList;