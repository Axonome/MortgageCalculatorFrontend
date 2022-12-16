import './Calculator.css';

type Payments = Array<Record<string, number>>;

export interface MortgageCalculationResultsData {
    monthPayment: number,
    overpayment: number,
    payments: Payments,
}

interface MortgageCalculationResultsProps {
    shouldShow: boolean,
    results: MortgageCalculationResultsData,
}

interface PaymentScheduleProps {
    payments: Payments,
}

function numberWithSpaces(x: number) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

function PaymentSchedule({ payments }: PaymentScheduleProps) {
    if (payments.length <= 0) {
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

    for (let i = 0; i < payments.length; ++i) {
        let date = new Date(payments[i]["date"]).toLocaleDateString();
        let total = numberWithSpaces(payments[i]["total"]);
        let debt = numberWithSpaces(payments[i]["debt"]);
        let interest = numberWithSpaces(payments[i]["interest"]);
        let loan = numberWithSpaces(payments[i]["loan"]);

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

export function MortgageCalculationResults({shouldShow, results}: MortgageCalculationResultsProps) {
    return (
        <div className={"scrollbar results text-xl " + (shouldShow ? "results-shown" : "results-hidden")}>
            <p>Ежемесячные выплаты: {numberWithSpaces(results.monthPayment)}</p>
            <p>Переплата: {numberWithSpaces(results.overpayment)}</p>
            <PaymentSchedule payments={results.payments} /> 
        </div> 
    );
}