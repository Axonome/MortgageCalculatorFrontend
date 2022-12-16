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

    return (
        <table>
            <tr>
                <th colSpan={5}>Платежи</th>
            </tr>
            <tr className="main-table-row">
                <th>Дата платежа</th>
                <th>Всего</th>
                <th>Долг</th>
                <th>Проценты</th>
                <th>Остаток долга</th>
            </tr>
            {payments.map((entry): any => 
                <tr>
                    <td>{new Date(entry["date"]).toLocaleDateString()}</td>
                    <td>{numberWithSpaces(entry["total"])}</td>
                    <td>{numberWithSpaces(entry["debt"])}</td>
                    <td>{numberWithSpaces(entry["interest"])}</td>
                    <td>{numberWithSpaces(entry["loan"])}</td>
                </tr>
            )}
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