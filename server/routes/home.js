import {Router} from 'express'
import auth from '../middleware/auth.js';
import {getNotes} from '../model/db_tables.js'

const router = Router()

router.get('/', auth, async (req, res, next)=>{
    try {
        const notes= await getNotes()
        res.render("index", {noteList: notes, currently: null})
    } catch (error) {
        next(error);
    }
})

export default router;