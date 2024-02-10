var posts = JSON.parse(localStorage.getItem('posts')) || [];

document.addEventListener('DOMContentLoaded', function () {

    const postButton = document.querySelector('.post-button');
    postButton.addEventListener('click', function () {
        const textarea = document.querySelector('.post-text');
        const content = textarea.value.trim();
        
        if (content.length >= 1 && content.length <= 100) {
            addPost('Joanne', content);
            textarea.value = ''; // Clear the textarea after posting
        } else {
            alert('Please enter text between 1 and 100 characters.');
        }
    });

    function addPost(username, content) {
        let newPost = {
            id: posts.length + 1,
            username: username,
            content: content,
            comments: [],
            like: false 
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        displayPosts();
    }

    function displayPosts() {
        let feedPosts = document.getElementById('feed-posts');
        feedPosts.innerHTML = '';
        for (var i = 0; i < posts.length; i++) {
            let post = posts[i];
            let postElem = document.createElement('div');
            postElem.classList.add('posted-box');
            postElem.innerHTML = `
                <div class="post-profile">
                    <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739" alt="DP" class="profile-image">
                </div>
                <div class="post-data">
                    <div class="post-header">
                        <div class="post-author">
                            <strong class="post-author-name">${post.username}</strong>
                            <span class="post-author-id">@joannegraham23</span>
                        </div>
                        <div class="post-edit">
                            <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/028/original/edit.png?1706888661" alt="Edit" class="action-icon edit-icon">
                            <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/027/original/delete.png?1706888643" alt="Delete" class="action-icon delete-icon" >
                        </div>
                    </div>
                    <div class="post-body">
                        ${post.content}
                    </div>
                    <div class="post-footer">
                        <img src="${post.like ? 'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/025/original/state_clicked.png?1706888455' : 'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679'}" alt="Like" class="action-icon like-icon">
                        <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/026/original/comment.png?1706888619" alt="Comment" class="action-icon">
                    </div>
                </div>
            `;

            // delete post
            let deleteIcon = postElem.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', function () {
                deletePost(post.id);
            });

            // like post
            let likeIcon = postElem.querySelector('.like-icon');
            likeIcon.addEventListener('click', function () {
                toggleLike(post.id);
            });

            // Edit post
            let editIcon = postElem.querySelector('.edit-icon');
            editIcon.addEventListener('click', function () {
                editPost(post.id);
            });
            
            feedPosts.appendChild(postElem);
        }
    }

    function deletePost(postId) {
        // Find the index of the post with the specified id
        const postIndex = posts.findIndex(post => post.id == postId);
        
        posts.splice(postIndex, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    }

    function toggleLike(postId) {
        const postIndex = posts.findIndex(post => post.id == postId);

        posts[postIndex].like = !posts[postIndex].like;
    
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    }

    function editPost(postId) {
        const postIndex = posts.findIndex(post => post.id == postId);
    
        const newContent = prompt('Edit your post:', posts[postIndex].content);
    
        if (newContent !== null) {
            posts[postIndex].content = newContent.trim();
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
        }
    }

    displayPosts();
});
