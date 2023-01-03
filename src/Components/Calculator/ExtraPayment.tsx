import { useReducer } from "react";
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

export interface ExtraPayment {
    type: ExtraPaymentType,
    amount: number,
    date: Date
}

export function ExtraPaymentForm({callback}: ExtraPaymentFormProps) {
    const initialParameters: ExtraPayment = {
        type: ExtraPaymentType.Single,
        amount: 0,
        date: new Date()
    };
    const [extraPayment, updateExtraPayment] = useReducer(reducer, initialParameters);

    return (
        <form className="extra-payment-form">
            <div className="input-group extra-payment-input">
                <label>Сумма</label>
                <input type="text" value={extraPayment.amount} onChange={e => { updateExtraPayment({amount: parseInt(e.target.value)}); callback(extraPayment); }} />
            </div>
            <div className="input-group extra-payment-input">
                <label>Дата</label>
                <input type="date" onChange={e => { updateExtraPayment({date: new Date(e.target.value)}); callback(extraPayment); }} />
            </div>
        </form>
    );
}