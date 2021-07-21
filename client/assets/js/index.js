let url = window.location.href;
if(url.includes('#')) {
    console.log('called');
    const id = url.split('#').pop(); 
    renderPost(id);
} else {
    let form = document.getElementById('postForm');
    form.addEventListener('submit', postData)

    // Show Title Label when inputting title
    const titleInput = document.getElementById('postTitle');
    titleInput.addEventListener('input', (e) => {
        const titleLabel = document.querySelector('.title-label');
        showLabel(titleInput,titleLabel);
    })

    // Show Author Label when inputting your name
    const authorInput = document.getElementById('postAuthor');
    authorInput.addEventListener('input', (e) => {
        const authorLabel = document.querySelector('.author-label');
        showLabel(authorInput,authorLabel);
    })

    // Show Content Icon when inputting content
    const contentInput = document.getElementById('postContent');
    contentInput.addEventListener('input', (e) => {
        const conentLabel = document.querySelector('.content-label');
        showLabel(contentInput,conentLabel);
    })
}

function showLabel(input,label) {
    if(input.value !== '') {
        label.classList.add('show')
    } else {
        label.classList.remove('show')
    }
}

async function postData(e) {
    e.preventDefault();
    const postData = {
        title: e.target.postTitle.value,
        author: e.target.postAuthor.value,
        content: e.target.postContent.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    const response = await fetch('http://localhost:3000/', options)
    const json = await response.json()

    window.location.replace(`/#${json.post}`);
    location.reload();

};

async function getData(id) {
    const data = await fetch(`http://localhost:3000/${id}`)
    const json = await data.json()
    return json
}

async function renderPost(id) {

    const section = document.getElementById('main-content');
    section.textContent = ''
    let postData

    try {
        postData = await getData(id)
        if(postData.message) {
            throw new Error ('Error returned')
        }
        postData = postData.post
    } catch (err) {
        console.log(err)
        return render404()
    }
    // let postData = await getData(id)
    // console.log(postData);

    // if(postData.message) {
    //     console.log('render 404 page here')
    //     return
    // }

    postData = postData.post
    const date = new Date(postData.date * 1000)

    const post = document.createElement('div')
    const postTitle = document.createElement('h1')

    const postMeta = document.createElement('address')
    const postAuthor = document.createElement('a')
    const postDate = document.createElement('time')

    const postContent = document.createElement('p')

    post.classList.add('container')
    post.classList.add('flex-column')

    postDate.setAttribute('datetime',date.toISOString()) 

    postTitle.textContent = postData.title
    postAuthor.textContent = postData.author
    postAuthor.rel = 'Author'
    postDate.textContent = formatDate(date)
    postContent.textContent = postData.content

    postMeta.append(postAuthor)
    postMeta.append(postDate)

    post.appendChild(postTitle)
    post.appendChild(postMeta)
    post.appendChild(postContent)

    section.appendChild(post)
    
}

function render404() {
    const section = document.getElementById('main-content');
    section.textContent = ''

    const messageContainer = document.createElement('div');
    const messageHeading = document.createElement('h1');
    const messageText = document.createElement('p');
    const messageButton = document.createElement('button');
    const homeLink = document.createElement('a');

    messageContainer.classList.add('error-message-container');

    messageHeading.textContent = '404';
    messageText.textContent = 'Page Does Not Exist';
    messageButton.textContent = 'Create New';
    homeLink.href = 'http://localhost:8080';

    homeLink.append(messageButton);

    messageContainer.append(messageHeading)
    messageContainer.append(messageText)
    messageContainer.append(homeLink)

    section.append(messageContainer)
}

function formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const output = day  + '\n'+ month  + ',' + year;

    return output
}