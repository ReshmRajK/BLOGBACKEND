const express=require('express')
const { userRegister, userLogin, addPost, viewAllPost, singleView, deletePost, viewMyBlog, editPost, filterPost, pswReset, postComment,addLikes } = require('../Controller/logic')
const uploads = require('../middleWare/middleWareImage')


const router=new express.Router()

router.post('/express/user/register',userRegister)
router.post('/express/user/login',userLogin)
router.post('/express/user/add-post/:id',uploads.single('user_profile'),addPost)
router.get('/express/user/view-all-post',viewAllPost)
router.get('/express/user/view-single-post/:id',singleView)
router.get('/express/user/view-my-blog',viewMyBlog)
router.put('/express/user/edit-post/:id',uploads.single('user_profile'),editPost)
router.delete('/express/user/post-delete/:id',deletePost)
router.get('/express/user/filter-post',filterPost)
router.put('/express/user/psw-reset/:id',pswReset)
router.post('/express/user/like-add/:id',addLikes)




module.exports=router