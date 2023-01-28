import { useState } from "react";
import './Calculator.css';
import { MortgageParametersForm, MortgageParameters } from "./MortgageParametersForm";
import { MortgageCalculationResults, MortgageCalculationResultsData } from "./MortgageCalculationResults";

function CalculatorPage() {
    const [isLoading, setisLoading] = useState(false);
    const [isShowingResults, setisShowingResults] = useState(false);
    const initialResults: MortgageCalculationResultsData = {
        monthPayment: 0.0,
        overpayment: 0.0,
        payments: []
    };
    const [results, setresults] = useState(initialResults);

    const getResults = async (parameters: MortgageParameters) => {
        setisLoading(true);
        const result = await getMortgageCalculation(parameters);
        if (result) {
            setresults(result);
            setisLoading(false);
            setisShowingResults(true);
        }
    }

    return (
        <>
            <section className="content">
                <div className="calculator">
                    <MortgageParametersForm isLoading={isLoading} isShowingResults={isShowingResults} sendForm={getResults}/>
                </div>
                <div className="info">
                    <h1>Lorem ipsum dolor sit amet</h1>
                    <div className="info2"><span>C</span>onsectetur adipiscing elit. Sed suscipit eros leo, pulvinar vehicula justo mollis in. Morbi enim leo, efficitur et aliquet sit amet, pretium vel erat. Sed tempus diam et leo mattis pulvinar. Aliquam bibendum quam malesuada eleifend iaculis. Nunc sem magna, aliquam sed purus sed, sagittis scelerisque felis. Duis fringilla laoreet tellus eu rutrum. Nulla lacinia mauris nec rutrum vulputate. Praesent placerat tristique ligula, id accumsan ante mollis a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</div>
                </div>
            </section>
            <section className="result-section">
                <MortgageCalculationResults shouldShow={ isShowingResults } results={ results }/>
            </section>
      </>
    );
}

async function getMortgageCalculation(parameters : MortgageParameters) {
    const payload = JSON.stringify(parameters);
    try {
        let response = await fetch("http://localhost:9000/calculate", {
            method: "POST",
                headers: new Headers({
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }),
                body: payload,
        });

        const json = await response.json();
        console.log(json);
        const results: MortgageCalculationResultsData = {
            monthPayment: json.monthPayment,
            overpayment: json.overpayment,
            payments: json.payments,
        }
        return results;
    } catch(error) {
        console.log(error);
    }
}

export default CalculatorPage;