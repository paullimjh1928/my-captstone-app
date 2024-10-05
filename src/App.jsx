import './App.css'
import financeLogo from './assets/budget.png'
import StockForm  from './StockForm';

function App(){
	
	return (
		<>
			<div className="container">
				<img src={financeLogo} className="logo" alt="Finance Logo" />
				<h1>Finance Dashboard</h1>
			</div>

			<div className="main-content">
        		<div className="stock-form">
          			<StockForm />
        		</div>

        		<div className="stock-list">
          			{/* StockList should be within the same width constraints */}
        		</div>
      		</div>		

		</>
	);
}

export default App;