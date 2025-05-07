import React from "react";
import "../../css/spinner.css";
class Spinner extends React.Component<{children?: React.ReactNode, absolute?: boolean}, {}> {
    state: {
        show: boolean;
    }
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