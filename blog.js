import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.es.min.js';

import { myAlert, myConfirm, myPrompt, myBlogPrompt } from './customdialog.js';

function sanitized(strs, val) {
    return DOMPurify.sanitize(strs[0] + val);
}

const template = document.querySelector('template');
const container = document.querySelector('#blog-posts-container');

function deleteClicked(post) {
    const {title, date, summary} = readPost(post);
    myConfirm("Delete this post?", function (answer) {
        if (answer) {
            container.removeChild(post);
            // myAlert('Deleted.');
            removeFromList(title, date, summary);
            save();
        }
    });
}
function editClicked(post) {
    const {title, date, summary} = readPost(post);
    console.log(title + " " + date + " " + summary);
    myBlogPrompt("Edit post...", function (answer) {
        if (answer !== null) {
            updateInList(title, date, summary, answer);
            save();
            editPost(post, answer.title, answer.date, answer.summary);

        }
    }, title, date, summary);
}

function readPost(post) {
    return { 
        title: post.querySelector('h3').innerHTML,
        date: post.querySelector('.date').innerHTML,
        summary: post.querySelector('.summary').innerHTML 
    };
}
function editPost(post, title, date, summary) {
    post.querySelector('h3').innerHTML = sanitized`${title}`;
    post.querySelector('.date').innerHTML = sanitized`${date}`;
    post.querySelector('.summary').innerHTML = sanitized`${summary}`;

}

function clonePost(title, date, summary) {
    const cloned = template.content.firstElementChild.cloneNode(true);
    title = sanitized`${title}`;
    date = sanitized`${date}`;
    summary = sanitized`${summary}`;
    cloned.querySelector('h3').innerHTML = title;
    cloned.querySelector('.date').innerHTML = date;
    cloned.querySelector('.summary').innerHTML = summary;

    cloned.querySelector('.delete-button').addEventListener('click', function () {
        deleteClicked(cloned);
    });
    cloned.querySelector('.edit-button').addEventListener('click', function () {
        editClicked(cloned);
    });
    container.appendChild(cloned);


}


function addPostClicked() {
    myBlogPrompt("Create a new post...", function (answer) {
        if (answer !== null) {
            clonePost(answer.title, answer.date, answer.summary);
            addToList(answer);
            save();
        }
    });
}

let posts = [];
let post1 = { title: "A Topic", date: "2023-03-01", summary: "Here is a blog post about a topic." };
let post2 = { title: "Another Topic", date: "2023-02-27", summary: "This blog post is about another topic." };

function load() {
    try {
        let hasBeenSaved = localStorage.getItem('hasBeenSaved');
        if (!hasBeenSaved) {
            posts = [];
            posts.push(post1);
            posts.push(post2);
            showList();
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
    showList();
}
function save() {
    localStorage.setItem('postsArray', JSON.stringify(posts));
    localStorage.setItem('hasBeenSaved', 'true');
}
function showList() {
    posts.forEach(post => {
        clonePost(post.title, post.date, post.summary);
    });
}
function addToList(answer) {
    console.log('add to list');
    let title = sanitized`${answer.title}`;
    let date = sanitized`${answer.date}`;
    let summary = sanitized`${answer.summary}`;
    let p = { title: title, date: date, summary: summary };
    posts.push(p);
}
function removeFromList(title, date, summary) {
    console.log('remove from list');
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].title == title && posts[i].date == date && posts[i].summary == summary) {
            posts.splice(i, 1);
            return;
        }
    }
}
function updateInList(titleBefore, dateBefore, summaryBefore, answer) {
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

function init() {
    let addPostButton = document.getElementById('add-post-button');
    addPostButton.addEventListener('click', addPostClicked);

    load();

}

window.addEventListener('DOMContentLoaded', init);