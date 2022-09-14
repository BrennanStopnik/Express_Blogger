# Express_Blogger

ExpressBlogger - Day 1:
- Create two GET routes in ./routes/blogs.js
	- GET /blogs/all that will send the entire list of sample blogs in the HTTP response
		- _Remember_: Since route names concatenate with the blogs router code we added to app.js, we only need to name our new route "/all" in blogs.js. This is because all of the routes we will create in blogs.js will concatenate their route name with "/blogs" from the app.use('/blogs', blogsRouter); line of code in app.js. 
		- _Note_: It is good practice to send success: true in the response JSON
			- res.json({
					success: true,
					blogs: sampleBlogs
				});
	- GET /blogs/single/:blogTitleToGet that will send a single blog from the sample blogs in the HTTP response based upon the blog title passed into the url
- Create one DELETE route with a single route param blogTitleToDelete
	- DELETE /blogs/single/:blogTitleToDelete that will delete a single blog in the sample blogs based upon the blog title passed into the url
	- _Note_: Even though we are not sending any blog data back with this request, we still need to respond to the request. So we will res.json an object containing success:true.
- Create Postman requests for all of these routes and test to see that they work


 
## class Notes

- .gitignore is the lisot of files that will be ignored by git
- we want node_modules to be ignored because of the larger folder size
- When we collaborate with other devs, we clone the repository WITHOUT the node_modules and then we run 'npm i' to install the node_modules

- Generators like express-generator will create the boilerplate framework code for us, and then we run 'npm i' to download the list of dependencies

- the package.json comes with a "scripts" config, in there you can define small blocks of code that can be easily invoked from the command line with 'npm run <scriptName>'
- _note_: for the "start" script, you only need to run "npm start"

- When we run "npm start" and the command "nnode./bikn/www" is invoked, the ./bin/www file will run our app.js file code, which will eventually include all of the code we will write for Express.
- the 404 status code means that the url/route we requested does not exist or is not configured properly in Express

- every request returns a status code that are grouped into blocks
- 100 status codes are not used anymore
- 200 status codes mean success
- 300 status code mean partial success
- 400 status code means web error
- 500 status codes mean server errors

- in order to get code from one file iknto another, we need to use the javascript require() statement.
-import/export
-_quick Aside_: reuqire is being phased out in favore of import/export syntax. However, when we are working in a Express environment we need to still use require() because of node limitations
- _NOTE_: So for Express we need to use require() and module. exports syntax
- require() brings in code from the file we specify in the file path
- module.exports exports code form a file
- _NOTE_:module.exports = router; is sending the router variabler from the route file
- var indexRouter = ('./routes/index'); is bringing the router variable in the current file as the variable indexRouter
- app.use('/', indexRouter); is importing the routers we define on indexRouter into our server so that we are exposed as routes.
    - the first argument is the base url for this router
    -the second argument is the router variable


ExpressBlogger - Day 2:
- Create a new file /validation/blogs.js. In /validation/blogs.js:
	- Create a basic validator function for blogData and add that function to the module.exports
- In /routes/blogs.js:
	- Import (require) the blogData validator function into /routes/blogs.js
	- Create one POST route /blogs/create-one to create a new blog post
		- _Note_: Do not forget to generated createdAt and lastModified in the new blog post
	- Create one PUT route /blogs/update-one/:blogTitle to update a blog post
	- Both of the above routes should run validations on the incoming blog post body data BEFORE either creating a new blog post or updating a blog post. If the blog data is invalid, then a message should be sent in the http response indicating which validation failed and why
- Build out the blogData validator function to check for the following conditions
	- Title, text and author are required fields and they should be strings
	- Title and author should be no longer than 40 characters in length (letters + whitespace)
	- _Stretch Goal_: 
		- If category is defined and has a length greater than 0:
		- All the entries must be strings
		- There can be no more than 10 entries for category 
		- All categories msut be in the following list of strings:
			- "Lorem"
			- "ipsum"
			- "dolor" 
			- "sit"
			- "amet"