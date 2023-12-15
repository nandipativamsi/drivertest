module.exports = async (req,res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.render('login',{loginMessage:err,signupMessage:null});
            } else {
                res.render('login',{loginMessage:null,signupMessage:null});
            }
        });
    }else {
        res.end();
    }
}