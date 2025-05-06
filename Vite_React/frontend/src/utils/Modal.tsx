import React, { JSX } from "react";

type ModalProps = {
    modalHeader?: JSX.Element;
    modalBody?: JSX.Element;
    modalFooter?: JSX.Element;
};

type ModalState = {
    show: boolean;
};

class Modal extends React.Component<ModalProps, ModalState> {
    containerRef: React.RefObject<HTMLDivElement | null>;

    constructor(props: ModalProps) {
        super(props);
        this.state = { show: true };
        this.containerRef = React.createRef();
    }

    componentDidMount(): void {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount(): void {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (e: MouseEvent) => {
        if (
            this.state.show &&
            this.containerRef.current &&
            !this.containerRef.current.contains(e.target as Node)
        ) {
            this.hide();
        }
    };

    show = () => this.setState({ show: true });
    hide = () => this.setState({ show: false });

    render() {
        return (
            <div className={`modal-container ${this.state.show ? "show" : ""}`}>
                <div className="modal" ref={this.containerRef}>
                    <div className="modal-header">{this.props.modalHeader}</div>
                    <div className="modal-body">{this.props.modalBody}</div>
                    <div className="modal-footer">{this.props.modalFooter}</div>
                </div>
            </div>
        );
    }
}

export default Modal;
