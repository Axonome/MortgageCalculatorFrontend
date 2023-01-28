import { useReducer } from "react";
import './Calculator.css';
import LoadingButton from "./LoadingButton";

export interface MortgageParameters {
    loan: number,
    years: number,
    interest: number,
    date: number,
}

interface MortgageParametersFormProps {
    isLoading: boolean,
    isShowingResults: boolean,
    sendForm: (parameters: MortgageParameters) => void;
}

function reducer(state: any, updates: any) {
    return ({ ...state, ...updates });
}

export function MortgageParametersForm({isLoading, isShowingResults, sendForm}: MortgageParametersFormProps) {
    const initialParameters: MortgageParameters = {
        loan: 10**7,
        years: 30,
        interest: 10.1,
        date: 0
    };
    const [parameters, updateParameters] = useReducer(reducer, initialParameters);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        sendForm(parameters);
    };

    return (
        <form className={isShowingResults ? "form-hidden" : "form-shown"} onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Сумма займа</label>
                <input type="text" value={parameters.loan} onChange={e => { updateParameters({loan: parseInt(e.target.value)}) }} />
            </div>
            <div className="input-group">
                <label>Срок кредита</label>
                <input type="text" value={parameters.years} onChange={e => { updateParameters({years: parseInt(e.target.value)}) }} />
            </div>
            <div className="input-group">
                <label>Процентная ставка</label>
                <input type="text" value={parameters.interest} onChange={e => { updateParameters({interest: parseInt(e.target.value)}) }} />
            </div>
            <div className="input-group">
                <label>Дата первого платежа</label>
                <input type="date" onChange={e => { updateParameters({date: new Date(e.target.value).getTime()}) }}/>
            </div>
            <div className="action-group">
                {isLoading ? <LoadingButton message="Загрузка"/> : <button type="submit">Рассчитать</button>}
            </div>
        </form>
    );
}