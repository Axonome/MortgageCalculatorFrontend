import { useEffect, useRef } from 'react';
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
            <thead>
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
            </thead>
            <tbody>
                {payments.map((entry): any => 
                    <tr>
                        <td>{new Date(entry["date"]).toLocaleDateString()}</td>
                        <td>{numberWithSpaces(entry["total"])}</td>
                        <td>{numberWithSpaces(entry["debt"])}</td>
                        <td>{numberWithSpaces(entry["interest"])}</td>
                        <td>{numberWithSpaces(entry["loan"])}</td>
                    </tr>
                )}
            </tbody>    
        </table>
    );
}

export function MortgageCalculationResults({shouldShow, results}: MortgageCalculationResultsProps) {
    const scrollRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (scrollRef.current && shouldShow) {
            console.log("scrolled");
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [shouldShow])

    return (
        <div ref={scrollRef} className={"scrollbar results text-xl " + (shouldShow ? "results-shown" : "results-hidden")}>
            <p>Ежемесячные выплаты: {numberWithSpaces(results.monthPayment)}</p>
            <p>Переплата: {numberWithSpaces(results.overpayment)}</p>
            <PaymentSchedule payments={results.payments} /> 
        </div> 
    );
}