export function myAlert(message) {
    let dialog = document.getElementById('alert-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
}

export function myConfirm(message, callback) {
    let dialog = document.getElementById('confirm-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
    dialog.addEventListener('close', function handler() {
        callback(dialog.returnValue === 'true');
        this.removeEventListener('close', handler);
    });
}

export function myPrompt(message, callback) {
    let dialog = document.getElementById('prompt-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.show();
    dialog.addEventListener('close', function handler() {
        if (dialog.returnValue === 'true') {
            callback(dialog.querySelector('input').value);
        } else {
            callback(null);
        }
        this.removeEventListener('close', handler);
    });

}

export function myBlogPrompt(message, callback, title='', date=undefined, summary='') {
    // Set to current date if undefined
    if (date === undefined) {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        date = `${year}-${month}-${day}`;
    }
    // console.log(date);
    let dialog = document.getElementById('blog-prompt-dialog');
    dialog.querySelector('p').innerText = message;
    dialog.querySelector('input[name="title"]').value = title;
    dialog.querySelector('input[name="date"]').value = date;
    dialog.querySelector('textarea[name="summary"]').value = summary;
    dialog.show();

    dialog.addEventListener('close', function handler() {
        if (dialog.returnValue === 'true') {
            let answer = {};
            answer.title = dialog.querySelector('input[name="title"]').value;
            answer.date = dialog.querySelector('input[name="date"]').value;
            answer.summary = dialog.querySelector('textarea[name="summary"]').value;
            callback(answer);
        } else {
            callback(null);
        }

        this.removeEventListener('close', handler);
    });

}