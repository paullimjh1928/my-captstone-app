import StockList from "./StockList.jsx";
import { useState, useEffect, useCallback } from "react";
import './stockstyle.css'; 

function StockForm() 
{
	const [stockSymbol, setStockSymbol] = useState("");
	const [stockQuantity, setStockQuantity] = useState("");
	const [purchasePrice, setPurchasePrice] = useState("");
	const [stocks, setStocks] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	function handleStockEntry(event) 
	{
		setStockSymbol(event.target.value);
	}

	function handleStockQuantityEntry(event) 
	{
		setStockQuantity(event.target.value);
	}

	function handlePurchasePriceEntry(event) 
	{
		setPurchasePrice(event.target.value);
	}

	function handleFormSubmit(event) 
	{
		event.preventDefault(); // Prevent the form from submitting and refreshing the page

		// Check user input
		if (!stockSymbol || !stockQuantity || !purchasePrice) 
		{
			setErrorMessage("Please enter all fields!");
			return;
		}

		// Add stock with placeholder for currentPrice and profitLoss, these will be updated later
		const newStock = 
		{
			stockSymbol,
			stockQuantity: parseFloat(stockQuantity),
			purchasePrice: parseFloat(purchasePrice),
			currentPrice: null,   // Placeholder for current price
			profitLoss: null,     // Placeholder for profit/loss
		};

		// Add new stock to stockList
		setStocks((prevStocks) => [...prevStocks, newStock]);

		// Clear the form fields
		setStockSymbol("");
		setStockQuantity("");
		setPurchasePrice("");
		setErrorMessage("");
	}

	// Function to fetch stock price for one stock
	const fetchSingleStockPrice = (stock) => 
	{
		fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.stockSymbol}&apikey=5BMA3EWZUIHD0C4N`)
		.then((response) => response.json())
		.then((data) => 
		{
				const globalQuote = data["Global Quote"];
				const currentPrice = globalQuote ? parseFloat(globalQuote["05. price"]) : null;

				if (currentPrice) 
				{
					const profitLoss = (currentPrice - stock.purchasePrice) * stock.stockQuantity;

					// Update the stock with the fetched price and profit/loss
					setStocks((prevStocks) =>
								prevStocks.map((s) => s.stockSymbol === stock.stockSymbol ? { ...s, currentPrice, profitLoss } : s)
					);
				}
		})
		.catch((err) => {
			console.error(`Failed to fetch data for ${stock.stockSymbol}`, err);
		});
	};

	// Memoized function to fetch stock prices from API
	const fetchStockPrices = useCallback(() => 
	{
		stocks.forEach((stock) => 
		{
			if (stock.currentPrice === null) 
			{
				fetchSingleStockPrice(stock); // Fetch each stock price one by one
			}
		});
	}, [stocks]);

	// Fetch stock prices whenever the stock list is updated
	useEffect(() => 
	{
		if (stocks.length === 0) return;
		fetchStockPrices();
	}, [stocks, fetchStockPrices]);

	return (
		<>
			<div className="container">
				<form onSubmit={handleFormSubmit}>
					<input
						value={stockSymbol}
						type="text"
						placeholder="Stock Symbol"
						onChange={handleStockEntry}
					/>

					<input
						value={stockQuantity}
						type="text"
						placeholder="Stock Quantity"
						onChange={handleStockQuantityEntry}
					/>

					<input
						value={purchasePrice}
						type="text"
						placeholder="Purchase Price"
						onChange={handlePurchasePriceEntry}
					/>

					<button type="submit">Add Stock</button>
				</form>
			</div>

			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

			<StockList stocks={stocks} />
		</>
	);
}

export default StockForm;
