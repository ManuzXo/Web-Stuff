import React, { JSX } from "react";

type QueryTaskParam = {
    fn: () => Promise<any>;
    onLoading?: JSX.Element;  // JSX element per lo stato di loading
    onError?: JSX.Element;    // JSX element per lo stato di errore
    onSuccess: JSX.Element;    // JSX element per lo stato di successo
};

export type QueryTaskState = {
    data: any;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};

class QueryTask extends React.Component<QueryTaskParam, QueryTaskState> {
    constructor(props: QueryTaskParam) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false,
            isSuccess: false,
        };
    }

    componentDidMount(): void {
        this.setState({ isLoading: true });
        console.log(this.props);
        this.props.fn()
            .then((data) => {
                this.setState({ data: data, isSuccess: true, isLoading: false });
            })
            .catch(() => {
                this.setState({ isError: true, isLoading: false });
            });
    }

    render() {
        const { isLoading, isSuccess, isError} = this.state;
        const { onLoading, onError, onSuccess } = this.props;

        return (
            <div>
                {isLoading && (onLoading || <span>Loading...</span>)}
                {isError && (onError || <span>Error</span>)}
                {isSuccess && onSuccess}
                
            </div>
        );
    }
}

export default QueryTask;
