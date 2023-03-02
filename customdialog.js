export function myAlert(message) {
    // alert(message);
    let dialog = document.getElementById('alert-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
}

export function myConfirm(message, callback) {
    let dialog = document.getElementById('confirm-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
    dialog.addEventListener('close', () => {
        callback(dialog.returnValue === 'true');
    });
}

export function myPrompt(message, callback) {
    let dialog = document.getElementById('prompt-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
    dialog.addEventListener('close', () => {
        if (dialog.returnValue === 'true') {
            callback(dialog.querySelector('input').value);
        } else {
            callback(null);
        }
    });
}