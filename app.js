import express from "express"
import routes from "./routers/index.js"
import path from "path"
import ejs from "ejs"
import dotenv from "dotenv"
import session from "express-session"
import filestore from "session-file-store"


const app = express()
const port = 3003;
const __dirname = path.resolve()
const FileStore = filestore(session)

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
    session({
        secret: 'keyboard cat', 
        resave: false,
        saveUninitialized: true,
        store : new FileStore()
    })
)

dotenv.config()

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use('/', routes)

app.listen(port , () => {
    console.log(`App listening on port ${port}`)
})