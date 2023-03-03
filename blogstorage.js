import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.es.min.js';

function sanitized(strs, val) {
    return DOMPurify.sanitize(strs[0] + val);
}

let posts = [];
let post1 = { title: "A Topic", date: "2023-03-01", summary: "Here is a blog post about a topic." };
let post2 = { title: "Another Topic", date: "2023-02-27", summary: "This blog post is about another topic." };

export function getPosts() {
    return posts;
}
export function load() {
    try {
        let hasBeenSaved = localStorage.getItem('hasBeenSaved');
        if (!hasBeenSaved) {
            posts = [];
            posts.push(post1);
            posts.push(post2);
            // showList();
            return;
        }
        posts = JSON.parse(localStorage.getItem('postsArray'));
        console.log("LOADED SUCCESS");
        if (posts === null) {
            posts = [];
        }
    }
    catch (error) {
        console.log("LOADED FAIL");
        console.log(error);
        posts = [];

    }
    // showList();
}
export function save() {
    localStorage.setItem('postsArray', JSON.stringify(posts));
    localStorage.setItem('hasBeenSaved', 'true');
}

export function addToList(answer) {
    console.log('add to list');
    let title = sanitized`${answer.title}`;
    let date = sanitized`${answer.date}`;
    let summary = sanitized`${answer.summary}`;
    let p = { title: title, date: date, summary: summary };
    posts.push(p);
}
export function removeFromList(title, date, summary) {
    console.log('remove from list');
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].title == title && posts[i].date == date && posts[i].summary == summary) {
            posts.splice(i, 1);
            return;
        }
    }
}
export function updateInList(titleBefore, dateBefore, summaryBefore, answer) {
    console.log('update in list');

    let title = sanitized`${answer.title}`;
    let date = sanitized`${answer.date}`;
    let summary = sanitized`${answer.summary}`;

    for (let i = 0; i < posts.length; i++) {
        console.log(posts[i].title == titleBefore);
        console.log(posts[i].title + ' ' + titleBefore);
        if (posts[i].title == titleBefore && posts[i].date == dateBefore && posts[i].summary == summaryBefore) {
            posts[i].title = title;
            posts[i].date = date;
            posts[i].summary = summary;
            return;
        }
    }

    console.log('no match found!');

}