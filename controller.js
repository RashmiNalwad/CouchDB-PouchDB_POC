$(document).ready(function(){
    var dba = new PouchDB('http://localhost:5984/react_video');
    $("#Couch_Video").click(function(e){
    dba.get('mydoc', {attachments: true}).then(function (doc) {
        
    var video = document.createElement('video');
    video.width = 600;
    video.height = 600;
    video.setAttribute("controls","controls")   
    document.body.appendChild(video);
    var url;
    for(var fileName in doc._attachments)
    {
        url = 'http://127.0.0.1:5984/react_video/mydoc/'  + fileName;
        console.log(url);
        addSourceToVideo(video, url, 'video/mp4');
    }
        
    function addSourceToVideo(element, src, type) {
        var source = document.createElement('source');
        source.src = src;
        source.type = type;
        element.appendChild(source);
     }    
});
}); 
});
