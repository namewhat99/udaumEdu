import express from "express"
import path from "path"
import  {homeHandler , myPageHandler, contentsHandler, contentsHandler2, contentsHandler3_2, contentsHandler3_3, contentsHandler3_1, loginHandler} from './handlers.js'
import session from "express-session"
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import filestore from "session-file-store"

const router = express.Router()
const __dirname = path.resolve()
const app = express()
const __directname = dirname(fileURLToPath(import.meta.url));
const file = join(__directname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
const FileStore = filestore(session)

app.use(express.static(path.join(__dirname , './public')))
app.use(
    session({
        secret: 'keyboard cat', 
        resave: false,
        saveUninitialized: true,
        store : new FileStore()
    })
)

router.get('/', homeHandler)
router.get('/myPage', myPageHandler)
router.get('/afterLogin', loginHandler)
router.get('/makeContents1', contentsHandler)
router.get('/makeContents2', contentsHandler2)
router.get('/makeContents3_1', contentsHandler3_1)
router.get('/makeContents3_2', contentsHandler3_2)
router.get('/makeContents3_3', contentsHandler3_3)


router.post('/makeContents3_1', (req , res) => {
    // makeContents3_1 에서 컨텐츠 작성이 끝나면 routers/db.json에 만든 컨텐츠를 저장합니다
    console.log(req.body)
     
    db.read()
    db.data ||= { userInfo: [] }
    
    db.data.userInfo.push(req.body)

    db.write()

})

router.post('/', (req, res) => {
    
    const isLoggedin = req.body.isLoggedin
    const Id = req.body.id

})

export default router