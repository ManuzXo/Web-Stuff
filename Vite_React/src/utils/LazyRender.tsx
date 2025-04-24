import React from "react";

class LazyRender extends React.Component<{ className?: string, children: React.ReactNode }> {
    state: { isVisible: boolean };
    ref: React.RefObject<HTMLDivElement | null>;
    observer: IntersectionObserver | null = null;
    isObserver: boolean = false;
    constructor(props: any) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.ref = React.createRef<HTMLDivElement>();
    }
    componentDidMount(): void {
        console.log("componentDidMount");
        const callbackFunction  = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            console.log(this.observer, entry.target, entry.isIntersecting);
            if(entry.isIntersecting === true) {
                this.setState({ isVisible: true });
                this.Dispose();
            }
        };
        this.observer = new IntersectionObserver(callbackFunction, { threshold: 0.1 });
        // essendo in una classe aspettiamo tot secondi, senno si usa useEffect to ref
        setTimeout(()=>{ 
                if(this.ref.current){
                    this.isObserver = true;
                    this.observer?.observe(this.ref.current);
                }
        }, 50);
    }
    componentWillUnmount(): void {
        this.Dispose();
    }
    render(): React.ReactNode {
        console.log("render", this.state.isVisible);
        return (
            <div className={this.props.className} ref={this.ref}>
                {this.state.isVisible ? this.props.children : null}
            </div>
        );
    }
    Dispose(){
        if(this.observer && this.ref.current && this.isObserver) {
            this.observer.unobserve(this.ref.current );
            this.observer.disconnect();
            this.ref = React.createRef<null>();
            this.observer = null;
            this.isObserver = false;
        }
    }
}

export default LazyRender;