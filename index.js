
var http = require('http')
var request = require('request');
var HTMLParser = require('fast-html-parser');
var fs = require("fs")

var count = 0;
var downloadPage = function(url,callback){
   request(url,(error,response,body)=>{
       //console.log(error,body)
       if(error==null){
            var root = HTMLParser.parse(body)
            var links = root.querySelectorAll("a")
            for(var i = 0 ;i<links.length;i++){
                var link = links[i]
                var href = link.attributes["href"]
                if(href!=null){
                    if(href.indexOf("zhushou360://")==0){
                        fs.appendFile("links.txt",href+"\n",(err)=>{
                             count ++

                            console.log("save",count,err)
                        })
                    }
                }
            }
       }
       
   })
}

var page = 1

setInterval(()=>{
    downloadPage("http://zhushou.360.cn/list/index/cid/1/?page="+ page)
    page +=1
    
},3000)
