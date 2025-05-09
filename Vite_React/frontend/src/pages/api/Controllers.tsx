import React from "react";
import "./Controllers.css"
class Controllers extends React.Component {
    state: {
        controllers: { [key: string]: string[] };
    }
    constructor(props: any) {
        super(props);
        this.state = {
            controllers: {},
        };
    }
    async componentDidMount(): Promise<void> {
        const response = await fetch("api/controllers");
        if (response.ok) {
            const controllers = await response.json();
            this.setState({ controllers: controllers });
        }
    }
    render(): React.ReactNode {
        return (
            <div className="controllers-container grid-container">
                {Object.keys(this.state.controllers).map((controller: string, index: number) => {
                    return (
                        <div key={index} className="grid-item-300 mb-2">
                            <div className="panel">
                                <div className="panel-header">
                                    <label>{controller}</label>
                                </div>
                                <div className="panel-body">
                                    <ul>
                                        {this.state.controllers[controller].map((action: string, index: number) => {
                                            return <li key={index}>{action}</li>;
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default Controllers;