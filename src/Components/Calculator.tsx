import { useState } from "react";
import './Calculator.css';

function CalculatorPage() {
    return (
      <section className="content">
        <Calculator />
      </section>
    );
}

function numberWithSpaces(x: number) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

interface MortgageParams {
    loan: number,
    years: number,
    interest: number,
    date: Date,
}

async function getMortgageCalculation(mortgageParameters : MortgageParams) {
    const payload = JSON.stringify({
        loan: mortgageParameters.loan,
        years: mortgageParameters.years,
        interest: mortgageParameters.interest,
        date: mortgageParameters.date
    });

    try {
        let response = await fetch("http://localhost:9000/calculator/calculate", {
            method: "POST",
                headers: new Headers({
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }),
                body: payload,
        });

        const results = JSON.parse(await response.json());
        console.log(results);
        return results;
    } catch(error) {
        console.log(error);
    }
}

interface PaymentData {
    payments: Array<Record<string, number>>
}

function PaymentSchedule(props: PaymentData) {
    if (props.payments.length <= 0) {
        return(null);
    }

    const content = [];

    content.push(
        <tr>
            <th colSpan={5}>Платежи</th>
        </tr>
    );

    content.push(
        <tr className="main-table-row">
            <th>Дата платежа</th>
            <th>Всего</th>
            <th>Долг</th>
            <th>Проценты</th>
            <th>Остаток долга</th>
        </tr>
    )

    for (let i = 0; i < props.payments.length; ++i) {
        let date = new Date(props.payments[i]["date"]).toLocaleDateString();
        let total = numberWithSpaces(props.payments[i]["total"]);
        let debt = numberWithSpaces(props.payments[i]["debt"]);
        let interest = numberWithSpaces(props.payments[i]["interest"]);
        let loan = numberWithSpaces(props.payments[i]["loan"]);

        content.push(
            <tr>
                <td>{date}</td>
                <td>{total}</td>
                <td>{debt}</td>
                <td>{interest}</td>
                <td>{loan}</td>
            </tr>
        );
    }
    return (
        <table>
            {content}
        </table>
    );
}

function Calculator() {
    const [loan, setLoan] = useState(10**7);
    const [years, setYears] = useState(30);
    const [interest, setInterest] = useState(10.1);
    const [date, setDate] = useState(new Date());
    const [monthPayment, setMonthPayment] = useState(0.0);
    const [overpayment, setOverpayment] = useState(0.0);
    const [payments, setPayments] = useState([]);
    const [showingResults, setShowingResults] = useState(false);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const results = await getMortgageCalculation({
            loan: loan,
            years: years,
            interest: interest,
            date: date,
        });

        setMonthPayment(results.monthPayment);
        setOverpayment(results.overpayment);
        setPayments(results.payments);
        setShowingResults(true);
    };

    return (
        <div className="calculator">
            <form className={showingResults ? "form-hidden" :"form-shown"} onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Сумма займа</label>
                    <input type="text" value={loan} onChange={e => setLoan(parseInt(e.target.value))} />
                </div>
                <div className="input-group">
                    <label>Срок кредита</label>
                    <input type="text" value={years} onChange={e => setYears(parseInt(e.target.value))} />
                </div>
                <div className="input-group">
                    <label>Процентная ставка</label>
                    <input type="text" value={interest} onChange={e => setInterest(parseInt(e.target.value))} />
                </div>
                <div className="input-group">
                    <label>Дата первого платежа</label>
                    <input type="date" onChange={e => setDate(new Date(e.target.value))}/>
                </div>
                <div className="action-group">
                    <button type="submit">Рассчитать</button>
                </div>
            </form>
        
            <div className={"scrollbar results text-xl " + (showingResults ? "results-shown" : "results-hidden")}>
                <p>Ежемесячные выплаты: {numberWithSpaces(monthPayment)}</p>
                <p>Переплата: {numberWithSpaces(overpayment)}</p>
                <PaymentSchedule payments={payments} /> 
            </div> 
        </div>
    );
}

export default CalculatorPage;