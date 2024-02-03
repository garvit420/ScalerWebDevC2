
var posts = [
    { id: 1, username: 'John', content: 'Lorem ipsum dolor sit amet', comments: [], likes: 5 },
    { id: 2, username: 'Jane', content: 'Consectetur adipiscing elit', comments: [], likes: 2 },
  ];

function displayPosts() {
    var feedPosts = document.getElementById('feed-posts');
    feedPosts.innerHTML = '';
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var postElem = document.createElement('div');
        postElem.classList.add('feed-post');
        postElem.innerHTML = `
            <div class="username">${post.username}</div>
            <div class="content">${post.content}</div>
            <div class="actions">
            <button class="comment-button" onclick="toggleCommentSection(${post.id})">Comment</button>
            <button class="like-button" onclick="likePost(${post.id})">Like</button>
            <span class="likes-count">${post.likes}</span>
            <button class="delete-button" onclick="deletePost(${post.id})">Delete</button>
            </div>
            <div id="comments-section-${post.id}" class="comments-section"></div>
        `;
        feedPosts.appendChild(postElem);
    }
}

function toggleCommentSection(postId) {
    var commentsSection = document.getElementById(`comments-section-${postId}`);
    commentsSection.classList.toggle('active');
}


function addPost() {
    var postText = document.getElementById('post-text').value;
    if (postText.length > 0 && postText.length <= 100) {
        var newPost = {
            id: posts.length + 1,
            username: 'John', 
            content: postText,
            comments: [],
            likes: 0
        };
        posts.push(newPost);
        displayPosts();
        document.getElementById('post-text').value = '';
    } else {
        alert('Post should be between 1 and 100 characters long.');
    }
}


let btn = document.querySelector("#post-button");
btn.addEventListener('click', event => {addPost()})


function likePost(postId) {
    var post = posts.find(post => post.id === postId);
    post.likes++;
    displayPosts();
}

function deletePost(postId) {
    var postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex > -1) {
        posts.splice(postIndex, 1);
        displayPosts();
    }
}

displayPosts();