# Create react app + Django + DRF + react-cookie + react router dom 

## FOR THIS PROJECT 
- fetch for connecting to backend django app. ( initially use real token, after cookies is set and token is fetched, use dynamic tokens)
- use utility class - APIService.js to organize all CRUD operations
- 'component' folder holds all components (list, form and login)
- react-router-dom + react-cookie for User login control
    * login page check cookie true/false, true ? navigate to articles : login page
    * router to create login and article routes
    * log out use removeCookies
- all react urls should be ended with a '/' to work

## COOKIE knowledge
- If you set cookies in the back-end, server will add a cookie header that the browser will read and save it.
- If you set them in the front-end, document.cookie will be interpreted and cookies get saved by your browser.
 