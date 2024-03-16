import {Router} from 'express'
import auth from '../middleware/auth.js';
import {getNotes} from '../model/db_tables.js'

const router = Router()

router.get('/', auth, (req, res)=>{
    // res.render("index", {noteList: [{name: "Javascript", link: "javascript"}], currently: null})
    res.render("index", {noteList: [], currently: null})
})

export default router;