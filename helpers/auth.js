module.exports = {
  ensureAuthenticated : function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Not Authorized. Please log in to access the resource.');
    res.redirect('/mychurch/user/login');
  }
}
