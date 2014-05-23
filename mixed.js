   "use strict";
var   when=require('when');
   
var respond=function(resp,obj){
       var res=resp;
       var json=json=JSON.stringify(obj);
       return when.promise(function(resolve,reject,notify){
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Length', json.length);
            res.end(json);
            resolve(res);
       });
}
   
   
   module.exports={
    success:function(res,msg){
        var resp=res;
        if(msg){
            resp.statusCode=200;
            return respond(resp,msg);
        }
        return function(reason){
            
                return respond(resp,reason);
        };
    },
    dberror:function(res,msg){
        var resp=res;

        
        if(msg){
            resp.statusCode=409;
            return respond(resp,msg);
        }
        return function(reason){
            
                return respond(resp,reason);
        };
    },
    unchanged:function(res){
           var resp=res;
           return when.promise(function(resolve,reject,notify){
               resp.statusCode=304;
               resp.end('as you where');
               resolve(resp);
           });
       },


    notfound:function(res){
        var resp=res;
        return when.promise(function(resolve,reject,notify){
            resp.statusCode=404;
            resp.end('Item not found');
            resolve(resp);
        });
    },
    authenticate:function(res){
        var resp=res;
        return when.promise(function(resolve,reject,notify){
            res.statusCode=401;
            res.end('Please Authenticate to proceed');
            resolve(resp);
        });
    },
    unauthorized:function(res){
        var resp=res;
        return when.promise(function(resolve,reject,notify){
            res.statusCode=403;
            res.end('Unauthorized Access');
            resolve(resp);
        });
    },
    badrequest:function(res){
        var resp=res;
        return when.promise(function(resolve,reject,notify){
            res.statusCode=400;
            res.end('Invalid Request');
            resolve(resp);
        });
    }
}

