import React, { JSX } from "react";

type LazyRenderProps = {
    isVisible: boolean
};
type LazyRenderParam = {
    children: JSX.Element//React.ReactNode
    className?: string
    as?: keyof JSX.IntrinsicElements
};
class LazyRender extends React.Component<LazyRenderParam, LazyRenderProps> {
    observer: IntersectionObserver | null;
    isObserver: boolean;
    ref: React.RefObject<HTMLElement | null>;
    constructor(props: any) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.observer = null;
        this.isObserver = false;
        this.ref = React.createRef<HTMLElement>();
    }

    componentDidMount(): void {
        const callbackFunction = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (entry.isIntersecting === true) {
                this.setState({ isVisible: true });
                this.Dispose();
            }
        };
        this.observer = new IntersectionObserver(callbackFunction, { threshold: 0.1 });
        setTimeout(() => { 
            if (this.ref.current) {
                this.isObserver = true;
                this.observer?.observe(this.ref.current);
            }
        }, 100);
    }

    componentWillUnmount(): void {
        this.Dispose();
    }

    render(): React.ReactNode {
        const { as = "div", className, children } = this.props;
        return React.createElement(as,{ className, ref: this.ref }, this.state.isVisible ? children : null );
    }

    Dispose() {
        if (this.observer && this.ref.current && this.isObserver) {
            this.observer.unobserve(this.ref.current);
            this.observer.disconnect();
            this.ref = React.createRef<null>();
            this.observer = null;
            this.isObserver = false;
        }
    }
}

export default LazyRender;