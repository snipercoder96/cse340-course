app.use() → tells Express to use some middleware for every request.

express.static(...) → is built‑in middleware that serves static files (CSS, JS, images, fonts, etc.).

path.join(__dirname, 'public') → builds the absolute path to your public folder, no matter where your server is run from.



Basic EJS Syntax
EJS template files look just like HTML files. But whenever you want to use EJS features you place code inside <% %> tags.

There are three main types of EJS tags you will use:

<%= %>: Outputs the value of a variable into the HTML (escaped for security)
<%- %>: Outputs the value of a variable without escaping (useful for including HTML content)
<% %>: Runs JavaScript code without outputting anything (useful for loops and conditionals)