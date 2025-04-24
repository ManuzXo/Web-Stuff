import React from "react";
import "../css/spinner.css";
class Spinner extends React.Component{
    render(): React.ReactNode {
        return (
            <div className="spinner-container-absolute">
                <div className="spinner"></div>
            </div>
        )
    }
}
export default Spinner;