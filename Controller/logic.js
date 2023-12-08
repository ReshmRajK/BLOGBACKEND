const users = require("../Model/collection");
const postLists = require("../Model/postCollection");


const userRegister = async (req, res) => {
    const { uname, mobile, email, psw } = req.body

    if (!uname || !mobile || !email || !psw) {
        res.status(401).json('All data are required')
    }
    else {
        try {
            const user = await users.findOne({ email })
            if (user) {
                res.status(200).json('USer already registered')
            }
            else {
                let newUser = new users({
                    uname, mobile, email, psw
                })
                newUser.save()
                res.status(200).json(newUser)
            }

        }
        catch {
            res.status(400).json('Connection error')

        }
    }
}

const userLogin = async (req, res) => {
    const { email, psw } = req.body

    if (!email || !psw) {
        res.status(401).json('All data are required')
    }

    else {
        try {
            const user = await users.findOne({ email, psw })
            if (user) {
                res.status(200).json({
                    uname: user.uname,
                    id: user._id
                })
            }
            else {
                res.status(404).json('Incorrect password or username')
            }

        }
        catch {
            res.status(400).json('Connection error')

        }
    }
}

const addPost = async (req, res) => {
    const { id } = req.params
    const { caption, author, category, desc, date,likes } = req.body
    const profile = req.file.filename

    if (!id || !caption || !author || !category || !desc || !profile || !date) {
        res.status(401).json("All Data are required")
    }
    else {
        try {
            await postLists.create({ id, caption, author, category, desc, profile, date,likes:0,userLike:[] })
                .then(user => {
                    res.status(200).json("Blog is added")
                })

        }

        catch {
            res.status(400).json('Connection error')
        }
    }

}

const addLikes=async(req,res)=>{
    const {id}=req.params
    const uId=req.body.uId
    if(!id){
        res.status(400).json("id is required")
    }else{
        const blog=await postLists.findOne({_id:id})
        if(blog){
            const user = blog.userLike.includes(uId)
            if(user){
                res.status(400).json("u")
            }else{
                blog.userLike.push(uId)
                blog.likes=blog.likes+1
                await blog.save()
                res.status(200).json(blog.likes)
            } 
        }else{
            res.status(400).json("not Present Blog")
        }
    }

}


const viewAllPost = async (req, res) => {

    const searchKey = req.query.search

    const query = {
        caption: { $regex: searchKey, $options: 'i' }
    }

    try {
        const user = await postLists.find(query)
        res.status(200).json(user)

    }
    catch {
        res.status(400).json('Connection error')
    }

}


const singleView = async (req, res) => {
    const { id } = req.params
    try {
        const user = await postLists.findOne({ _id: id })
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json('Post is Not Found')
        }

    }
    catch {
        res.status(400).json("connection error")
    }
}


const viewMyBlog = async (req, res) => {
    const id = req.query.myBlog
    if (!id) {
        res.status(402).json('uId is required')
    }
    else {
        try {
            const user = await postLists.find({ id })
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(400).json('no blog create')
            }
        }
        catch {
            res.status(400).json("connection error")

        }
    }
}


const editPost = async (req, res) => {
    const { id } = req.params
    const { caption, author, category, desc, user_profile, date } = req.body
    const profile = req.file ? req.file.filename : user_profile

    try {
        const user = await postLists.findOne({ _id: id })
        if (user) {
            user.caption = caption
            user.author = author
            user.category = category
            user.desc = desc
            user.date = date
            user.profile = profile
            await user.save()
            res.status(200).json(user)
        }

    }
    catch {
        res.status(400).json("connection error")
    }
}


const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const user = await postLists.findByIdAndDelete({ _id: id })
        if (user) {
            res.status(200).json('Post deleted successfully')
        }
        else {
            res.status(404).json('Post is not found')
        }
    }
    catch {
        res.status(400).json("connection error")
    }

}


const filterPost = async (req, res) => {
    const { filterData } = req.query
    try {
        const filterCategory = await postLists.find({ category: filterData })
        if (filterCategory) {
            res.status(200).json(filterCategory)
        }
        else {
            res.status(404).json('No post is posted yet')
        }
    }
    catch {
        res.status(400).json("connection error")
    }

}

const pswReset = async (req, res) => {
    const { id } = req.params
    const { psw } = req.body
    try {
        const user = await users.findOne({ _id: id })
        if (user) {
            user.psw = psw
            await user.save()
            res.status(200).json(user)
        }
    }
    catch {
        res.status(400).json("connection error")
    }
}

const postComment = async (req, res) => {
    const { id } = req.params
    const {comment}=req.body
    const user = await users.findOne({ _id:id })
    if (user) {
        user.comments.push({comment})
        user.save()
        res.status(200).json('Comment added')

    }
    else{
        res.status(404).json('User is not present')
    }

}

module.exports = { userRegister,
    userLogin,
    addPost,
    viewAllPost,
    singleView,
    deletePost, 
    viewMyBlog,
    editPost,
    filterPost,
    pswReset,
    postComment,
    addLikes }