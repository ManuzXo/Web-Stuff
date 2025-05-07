import React, { JSX } from "react";

type DeviceProps = {
    isVisible: boolean
};
export enum DeviceType {
    Mobile,
    PC
};
export type DeviceParam = {
    children: JSX.Element
    deviceType: DeviceType
} 
export class Device extends React.Component<DeviceParam, DeviceProps> {
    readonly MOBILE_WIDTH = 768;
    constructor(props: DeviceParam) {
        super(props)
        this.state = {
            isVisible: false
        }
    }
    componentDidMount(): void {
        window.addEventListener("resize", this.onWindowResize.bind(this))
    }
    componentWillUnmount(): void {
        window.removeEventListener("resize", this.onWindowResize.bind(this))
    }
    onWindowResize = () => {
        let expression : boolean = false;
        if (this.props.deviceType == DeviceType.Mobile) expression = window.innerWidth < this.MOBILE_WIDTH;
        if(this.props.deviceType == DeviceType.PC) expression = window.innerWidth > this.MOBILE_WIDTH;
        this.setState({isVisible: expression});
    }
    render = () : React.ReactNode => {
        if(!this.state.isVisible)
            return null;
        return this.props.children;
    }
}