/* GET home page. */
//exports.index = function(req, res){
//    res.render('index', ViewModel);
//};


exports.indexController = function(ViewModelBase,_) {
    var ViewModel = _.clone(ViewModelBase);

    
    var self = {
         indexAction : function (req,res){
           //do your thing
            res.render('index', ViewModel);
         }
    }
    return self;
}
