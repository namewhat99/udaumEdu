import express from "express";
import path from "path";
import { homeHandler, myPageHandler, contentsHandler, contentsHandler2, contentsHandler3_2, contentsHandler3_3, contentsHandler3_1, loginHandler, myPageTest, myPageHandler2 } from "./handlers.js";
import session from "express-session";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import filestore from "session-file-store";
import _ from "lodash";

const router = express.Router();
const __dirname = path.resolve();
const app = express();

const __directname = dirname(fileURLToPath(import.meta.url));
const file = join(__directname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);
const FileStore = filestore(session);

app.use(express.static(path.join(__dirname, "./public")));
app.use(
    session({
        secret: "!Aa3df$%kald",
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

router.get("/", homeHandler);
// 홈 페이지 이동

router.get("/myPage", async (req, res) => {
    // 마이페이지로 이동하면 아이디에 따라 db를 읽고 그 데이터들을 가져옵니다
    await db.read();
    // 현재 서버에서 로그인 한 아이디별로 db를 불러오는 방법을 찾는중입니다. "2637823050"는 임의의 값 입니다"

    return res.render("mypage_list.html", { da: db.data[req.headers.id] });
});

router.get("/api/myPage", async (req, res) => {
    await db.read();

    res.json(db.data[req.headers.id]);
});

router.get("/api/contents", async (req, res) => {
    try {
        await db.read();

        let kl = Object.keys(db.data);
        let list = [];

        for (let key of kl) {
            if (list.length > 25) break;
            db.data[key].forEach((e) => {
                list.push(e);
            });
        }

        res.json(list);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/afterLogin", loginHandler);
//로그인 이후 화면 , "~Handler들은 전부 페이지 렌더링"
router.get("/makeContents1", contentsHandler);
// 콘텐츠 만들기의 첫번쩨 화면입니다 , 오지선다 / 수수께끼 / 스무고개 중 택하는 페이지.
router.get("/makeContents2", contentsHandler2);
// 콘텐츠 색상 선택 페이지
router.get("/makeContents3_1", contentsHandler3_1);
// "/makeContents1 에서 오지선다를 선택했을때 넘어가는 페이지"
router.get("/makeContents3_2", contentsHandler3_2);
// "/makeContents1 에서 수수께끼를 선택했을때 넘어가는 페이지"
router.get("/makeContents3_3", contentsHandler3_3);
// "/makeContents1 에서 스무고개를 선택했을때 넘어가는 페이지"

router.post("/makeContents3_1", async (req, res) => {
    // 오지선다 콘텐츠 입력 후 post 요청 , db에 저장

    var a = 0;

    const Id = req.body.id;

    await db.read();

    _(db.data).forEach(function (n) {
        a += _.size(n);
    });
    // 지금 제작된 콘텐츠가 몇번째 콘텐츠인지 req.body 에 저장
    req.body.count = a + 1;

    if (!db.data[Id]) db.data[Id] = [];
    // 현재 db에 그 Id를 key로 갖는 쌍이 없으면 만든다
    db.data[Id].push(req.body);
    // db.data[Id]에 정보를 저장
    db.write();
});

router.post("/makeContents3_2", async (req, res) => {
    // 수수께끼 콘텐츠 입력 후 post 요청 , db에 저장
    var a = 0;
    const Id = req.body.id;

    await db.read();

    _(db.data).forEach(function (n) {
        a += _.size(n);
    });
    // 지금 제작된 콘텐츠가 몇번째 콘텐츠인지 req.body 에 저장
    req.body.count = a + 1;

    if (!db.data[Id]) db.data[Id] = [];
    // 현재 db에 그 Id를 key로 갖는 쌍이 없으면 만든다
    db.data[Id].push(req.body);
    // db.data[Id]에 정보를 저장
    db.write();
});

router.post("/makeContents3_3", async (req, res) => {
    // 스무고개 콘텐츠 입력 후 post 요청 , db에 저장
    var a = 0;
    const Id = req.body.id;

    await db.read();

    _(db.data).forEach(function (n) {
        a += _.size(n);
    });

    req.body.count = a + 1;

    // 지금 제작된 콘텐츠가 몇번째 콘텐츠인지 req.body 에 저장
    if (!db.data[Id]) db.data[Id] = [];

    db.data[Id].push(req.body);
    // db.data[Id]에 정보를 저장
    db.write();
});

export default router;
