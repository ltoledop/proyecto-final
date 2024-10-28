export const authenticate = (req, res, next) => {
    console.log(req.user)
    if (req.user) {
        next(); 
    } else {
        res.redirect('/login');
    }
};
