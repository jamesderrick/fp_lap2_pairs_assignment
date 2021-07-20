const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class Post {

    constructor(data){

        const date = new Date()

        this.title = data.title
        this.author = data.author
        this.content = data.content
        this.date = Math.floor(date.getTime() / 1000)
        this.url = `${data.title}-${date.getDate()}-${date.getMonth() + 1}`
    }

    // static get all() {
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             const db = await init()
    //             const data = await db.collection('test').find().toArray()
    //             resolve(data);
    //         } catch (err) {
    //             console.log(err);
    //             reject("Error retrieving data")
    //         }
    //     })
    // }

    static create({title, author, content}){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let newPost = new Post({
                    title,
                    author,
                    content 
                })
                let postData = await db.collection('posts').insertOne(newPost)
                resolve (newPost.url);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let postData = await db.collection('posts').find({ url: id }).toArray()
console.log(postData);
                let post = new Post({...postData[0], id: postData[0]._id});
                resolve (post);
            } catch (err) {
                reject('Post not found');
            }
        });
    }

}

module.exports = Post;