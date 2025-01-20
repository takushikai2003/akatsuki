export function waitWindowClick() {
    return new Promise(resolve => {
        document.documentElement.addEventListener("click", () => {
            resolve();
        });
    });
}