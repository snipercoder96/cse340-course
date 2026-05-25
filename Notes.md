app.use() → tells Express to use some middleware for every request.

express.static(...) → is built‑in middleware that serves static files (CSS, JS, images, fonts, etc.).

path.join(__dirname, 'public') → builds the absolute path to your public folder, no matter where your server is run from.



Basic EJS Syntax
EJS template files look just like HTML files. But whenever you want to use EJS features you place code inside <% %> tags.

There are three main types of EJS tags you will use:

<%= %>: Outputs the value of a variable into the HTML (escaped for security)
<%- %>: Outputs the value of a variable without escaping (useful for including HTML content)
<% %>: Runs JavaScript code without outputting anything (useful for loops and conditionals)



Common Mistakes and Fixes
- **Environment Variables Not Loading**: If your app uses `process.env` but doesn't load from `.env`, install `dotenv` and add `import 'dotenv/config';` at the top of `server.js`. Alternatively, use Node's `--env-file=.env` flag when running the server.
- **Port Conflicts**: If routes return 404 despite being defined, check for multiple processes on the port using `netstat -ano | findstr :3000`. Kill conflicting Node processes with `Stop-Process -Name node` and restart the server.


JSDoc Tags Reference
==================

Beyond `@param` and `@returns`, common JSDoc tags include:

**Function documentation:**
- `@throws` or `@exception` - Documents exceptions that may be thrown
- `@example` - Provides usage examples
- `@see` - References other documentation
- `@since` - Indicates when feature was added
- `@author` - Specifies author
- `@version` - Specifies version
- `@deprecated` - Marks as deprecated

**Type definitions:**
- `@typedef` - Defines custom types
- `@callback` - Defines callback function types
- `@property` - Defines object properties
- `@constant` - Defines constants
- `@enum` - Defines enumerations

**Class/member documentation:**
- `@constructor` - Marks as constructor
- `@class` - Defines a class
- `@extends` - Indicates inheritance
- `@implements` - Indicates interface implementation
- `@memberof` - Indicates belonging to a namespace/class
- `@static` - Marks as static member
- `@private` - Marks as private
- `@public` - Marks as public
- `@protected` - Marks as protected

**Event documentation (Node.js):**
- `@event` - Documents events
- `@fires` - Indicates method fires event
- `@listens` - Indicates method listens to event
- `@emit` - Alias for `@fires`

**Async/Special:**
- `@async` - Marks function as async
- `@yields` - Documents generator yields
- `@generator` - Marks as generator function
- `@this` - Documents `this` context
- `@global` - Marks as global variable