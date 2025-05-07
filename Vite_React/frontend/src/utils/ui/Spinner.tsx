import React, { JSX } from "react";
import "../../css/spinner.css";
type SpinnerProps = {
    show: boolean
};
type SpinnerParam =  {
    children?: JSX.Element
    absolute?: boolean
};
class Spinner extends React.Component<SpinnerParam, SpinnerProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: true,
        };
    }
    render = () :  React.ReactNode =>{
        return this.state.show ? this.getSpinner() : null;
    }
    getSpinner = () => {
        const spinnerClass = this.props.absolute ? "spinner-container-absolute" : "spinner-container";
        return (
            <div className={spinnerClass}>
                <div className="spinner">
                    {this.props.children? this.props.children: null}
                </div>
            </div>
        )
    }
}
export default Spinner;