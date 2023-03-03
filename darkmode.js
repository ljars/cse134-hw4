function init() {
    let darkModeToggle = document.getElementById('darkmode-hidden-checkbox');
    let lightMode = localStorage.getItem('lightMode');
    if (darkModeToggle != null) {
        if (lightMode === 'true') {
            
            darkModeToggle.checked = true;
            localStorage.setItem('lightMode', 'true')

        } else {
            darkModeToggle.checked = false;
        }
        darkModeToggle.addEventListener('change', (event) => {
            localStorage.setItem('lightMode', event.target.checked)
            // alert(event.target.checked);
        });
    }
}

window.addEventListener('DOMContentLoaded', init);