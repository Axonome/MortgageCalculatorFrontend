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
      <section className="content">
        <div className="calculator">
            <MortgageParametersForm isLoading={isLoading} isShowingResults={isShowingResults} sendForm={getResults}/>
            <MortgageCalculationResults shouldShow={isShowingResults} results={results}/>
        </div>
      </section>
    );
}

async function getMortgageCalculation(parameters : MortgageParameters) {
    const payload = JSON.stringify(parameters);
    try {
        let response = await fetch("http://localhost:9000/calculator/calculate", {
            method: "POST",
                headers: new Headers({
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }),
                body: payload,
        });

        const json = JSON.parse(await response.json());
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