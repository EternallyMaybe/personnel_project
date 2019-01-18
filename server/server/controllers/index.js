module.exports = async (ctx) => {
    // const title = 'home';
    
    // await ctx.render('index', {
    //     title
    // })
    if (ctx.url === '/' && ctx.method === 'GET') {
        // 当GET请求时候返回表单页面
       let html = `
       <h1>koa2 request post demo</h1>
       <form method="POST" action="/user/login">
           <p>userName</p>
           <input name="userName" /><br/>
           <p>password</p>
           <input name="password" /><br/>
           <button type="submit">submit</button>
       </form>
       `;

       ctx.body = html;
   } 
}