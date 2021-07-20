let url = window.location.href;
if(url.includes('#')) {
    const id = url.split('/').pop(); 
    renderPost(id);
} else {
    let form = document.getElementById('postForm');
    form.addEventListener('submit', postData)
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

    window.location.replace(`/#posts/${json.post}`);
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
    const postData = await getData(id)
    console.log(postData.post)

    
}