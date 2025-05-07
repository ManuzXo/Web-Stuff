import React from "react";
import SectionData from "./Sections";
import "./NavigationMenu.css";
import { Link } from "react-router-dom";
import { Device, DeviceType } from "../utils/ui/Device";
class NavigationMenu extends React.Component {
    state = {
        activeIndex: 0,
        showScrollButtons: false
    }
    constructor(props: any) {
        super(props);
    }
    componentDidMount(): void {
        this.setInitialIndex();
        this.checkForOverflow();
        window.addEventListener('resize', this.checkForOverflow); // se cambia larghezza
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.checkForOverflow);
    }

    setInitialIndex = () => {
        for (let i = 0; i < SectionData.length; i++) {
            if (location.pathname.includes(SectionData[i].title)) {
                this.setActiveIndex(i);
                break;
            }
        }
    }
    render(): React.ReactNode {
        return (
            <nav className="navigation-menu-container fixed">
                <Device deviceType={DeviceType.PC}>
                    <button className={this.getScrollButtonClass("left")} onClick={() => this.scrollMenu("left")}>←</button>
                </Device>
                <div className="navigation-scroll-wrapper">
                    <ul className="navigation-menu">
                        {
                            SectionData.map((section, index) => (
                                section.excludeNavigation === true ? null : (
                                    <li key={index} onClick={() => this.setActiveIndex(index)}>
                                        <Link to={section.title} className={this.state.activeIndex === index ? 'click' : ''}>
                                            {section.title}
                                        </Link>
                                    </li>
                                )
                            ))
                        }
                    </ul>
                </div>
                <Device deviceType={DeviceType.PC}>
                    <button className={this.getScrollButtonClass("right")} onClick={() => this.scrollMenu("right")}>→</button>
                </Device>
            </nav>
        );
    }

    scrollMenu = (direction: 'left' | 'right') => {
        const container = document.querySelector('.navigation-scroll-wrapper');
        if (container) {
            const scrollAmount = 200; // puoi regolare la distanza
            const directionValue = direction === 'left' ? -scrollAmount : scrollAmount;
            container.scrollBy({
                left: directionValue,
                behavior: 'smooth'
            });
        }
    };

    checkForOverflow = () => {
        const container = document.querySelector('.navigation-scroll-wrapper');
        if (container) {
            const hasOverflow = container.scrollWidth > container.clientWidth;
            console.log('Has overflow:', hasOverflow, container.scrollWidth, container.clientWidth);
            this.setState({ showScrollButtons: hasOverflow });
        }
    };

    getScrollButtonClass = (direction: 'left' | 'right') => {
        return `scroll-button ${direction} ${this.state.showScrollButtons ? '' : 'hide'}`;
    }

    setActiveIndex = (index: number) => {
        this.setState({ activeIndex: index });
    }
}

export default NavigationMenu;
