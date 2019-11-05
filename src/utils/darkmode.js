export const dark = () => {
    if ( localStorage.getItem('theme') === 'dark') {
        document.getElementsByTagName("body")[0].classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
    else if (localStorage.getItem('theme') === null || undefined) {
        document.getElementsByTagName("body")[0].classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    else if (localStorage.getItem('theme') === 'light') {
        document.getElementsByTagName("body")[0].classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

export const checkTheme = () => {
    if ( localStorage.getItem('theme') === 'dark' ) {
        document.getElementsByTagName("body")[0].classList.add('dark-mode');
    }
}
