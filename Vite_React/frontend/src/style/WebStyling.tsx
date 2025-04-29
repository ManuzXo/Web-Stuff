class WebStyling {

    public static initializeTheme() {
        const savedTheme = localStorage.getItem("data-theme");
        WebStyling.setTheme(savedTheme || "dark");
    }

    public static changeTheme() {
        const currentTheme = WebStyling.getTheme();
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        WebStyling.setTheme(newTheme);
    }

    public static setTheme(theme: "light" | "dark" | any) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("data-theme", theme);
    }

    public static getTheme(): string | null {
        return document.documentElement.getAttribute("data-theme");
    }
}

export default WebStyling;