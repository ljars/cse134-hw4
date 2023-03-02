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
    if (dialog.getAttribute('my-listener-set') !== 'true') {
        dialog.setAttribute('my-listener-set', 'true');
        dialog.addEventListener('close', () => {
            callback(dialog.returnValue === 'true');
        });
    }
}

export function myPrompt(message, callback) {
    let dialog = document.getElementById('prompt-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
    if (dialog.getAttribute('my-listener-set') !== 'true') {
        dialog.addEventListener('close', () => {
            dialog.setAttribute('my-listener-set', 'true');

            if (dialog.returnValue === 'true') {
                callback(dialog.querySelector('input').value);
            } else {
                callback(null);
            }
        });
    }
}

export function myBlogPrompt(message, callback) {
    let dialog = document.getElementById('blog-prompt-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
    if (dialog.getAttribute('my-listener-set') !== 'true') {
        dialog.addEventListener('close', () => {
            // Don't set duplicate listeners
            dialog.setAttribute('my-listener-set', 'true');
            if (dialog.returnValue === 'true') {
                let answer = {};
                answer.title = dialog.querySelector('input[name="title"]').value;
                answer.date = dialog.querySelector('input[name="date"]').value;
                answer.summary = dialog.querySelector('textarea[name="summary"]').value;
                callback(answer);
            } else {
                callback(null);
            }
        });
    }
}