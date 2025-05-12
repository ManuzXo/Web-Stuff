import React, { JSX } from "react";

// Generico T per il tipo di dato restituito da fn
type QueryTaskParam<T> = {
    fn: () => Promise<T>;
    onLoading?: JSX.Element;
    onError?: JSX.Element;
    onSuccess?: (data: T) => JSX.Element; // usa i dati ricevuti
    onData?: (data: T) => void;
};

export type QueryTaskState<T> = {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    msgError: string;
    isSuccess: boolean;
};

class QueryTask<T> extends React.Component<QueryTaskParam<T>, QueryTaskState<T>> {
    constructor(props: QueryTaskParam<T>) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false,
            msgError: "",
            isSuccess: false,
        };
    }

    componentDidMount(): void {
        this.query();
    }

    render() {
        const { isLoading, isSuccess, isError, msgError, data } = this.state;
        const { onLoading, onError, onSuccess } = this.props;

        return (
            <div>
                {isLoading && (onLoading || <span>Loading...</span>)}
                {isError && (onError || <span>Error: {msgError}</span>)}
                {isSuccess && (onSuccess ? onSuccess(data as T) : <span>Success</span>)}
            </div>
        );
    }
    query = () => {
        this.defaultState();
        this.setState({ isLoading: true });
        this.props.fn()
            .then((data) => {
                if (this.props.onData)
                    this.props.onData(data as T);
                this.setState({ data: data, isSuccess: true, isLoading: false });
            })
            .catch((reason: any) => {
                const msg = typeof reason === 'string' ? reason : (reason.message || 'Errore sconosciuto');
                this.setState({ isError: true, msgError: msg, isLoading: false });
            });
    }
    defaultState = () => {
        this.setState({
            data: null,
            isLoading: false,
            isError: false,
            msgError: "",
            isSuccess: false,
        });
    }
}

export default QueryTask;
