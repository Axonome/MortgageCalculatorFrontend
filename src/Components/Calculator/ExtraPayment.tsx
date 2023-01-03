import { useReducer } from "react";
import { isNumberObject } from "util/types";
import './Calculator.css';

function reducer(state: any, updates: any) {
    return ({ ...state, ...updates });
}

type Updater = (extraPayment: ExtraPayment) => void;
interface ExtraPaymentFormProps {
    callback: Updater,
}

export enum ExtraPaymentType {
    Single,
}

export enum ExtraPaymentPurpose {
    Payment,
    Term,
}

const ExtraPaymentPurposeMapping: Record<ExtraPaymentPurpose, string> = {
    [ExtraPaymentPurpose.Payment]: "Уменьшение ежемесячного платежа",
    [ExtraPaymentPurpose.Term]: "Уменьшение срока ипотеки",
};

export interface ExtraPayment {
    type: ExtraPaymentType,
    purpose: ExtraPaymentPurpose,
    amount: number,
    date: Date
}

export function ExtraPaymentForm({callback}: ExtraPaymentFormProps) {
    const initialParameters: ExtraPayment = {
        type: ExtraPaymentType.Single,
        purpose: ExtraPaymentPurpose.Payment,
        amount: 0,
        date: new Date()
    };
    const [extraPayment, updateExtraPayment] = useReducer(reducer, initialParameters);

    return (
        <div className="extra-payment-form">
            <div className="input-group extra-payment-input">
                <label>Назначение платежа</label>
                <select onChange={e => { updateExtraPayment({purpose: e.target.value}); callback(extraPayment); }}>
                    {Object.values(ExtraPaymentPurpose).filter(e => !isNaN(Number(e))).map(val => (
                        <option value={val}>
                            {ExtraPaymentPurposeMapping[val as ExtraPaymentPurpose]}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-group extra-payment-input">
                <label>Сумма</label>
                <input type="text" value={extraPayment.amount} onChange={e => { updateExtraPayment({amount: parseInt(e.target.value)}); callback(extraPayment); }} />
            </div>
            <div className="input-group extra-payment-input">
                <label>Дата</label>
                <input type="date" onChange={e => { updateExtraPayment({date: new Date(e.target.value)}); callback(extraPayment); }} />
            </div>
        </div>
    );
}