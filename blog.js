import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.es.min.js';

import { myConfirm, myBlogPrompt } from './customdialog.js';
import { getPosts, load, save, addToList, removeFromList, updateInList } from './blogstorage.js';

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

function showList() {
    getPosts().forEach(post => {
        clonePost(post.title, post.date, post.summary);
    });
}

function init() {
    let addPostButton = document.getElementById('add-post-button');
    addPostButton.addEventListener('click', addPostClicked);

    load();
    showList();

}

window.addEventListener('DOMContentLoaded', init);