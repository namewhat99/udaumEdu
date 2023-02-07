
export const homeHandler = (req , res) => {
    res.render('index.html');
}

export const myPageHandler = (req , res , next) => {
    res.render('mypage_list.html')
    next();
}

export const myPageHandler2 = (req , res , next) => {
    console.log('mypageHandle2r!')
}

export const contentsHandler = (req , res) => {
    res.render('produce1.html')
}

export const contentsHandler2 = (req , res) => {
    res.render('produce2.html')
}

export const contentsHandler3_1 = (req , res) => {
    res.render('produce3-1.html')
}

export const contentsHandler3_2 = (req , res) => {
    res.render('produce3-2.html')
}

export const contentsHandler3_3 = (req , res) => {
    res.render('produce3-3.html')
}

export const loginHandler = (req, res) => {
    res.render('mainLogin.html')
}

export const myPageTest = (req, res) => {
    res.render('myPagetest.html')
}