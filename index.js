document.addEventListener('DOMContentLoaded', function () {
  // Destroy the database before doing anything, because I want 
  // you to see the same thing if you reload.
  // Ignore the man behind the curtain!
  var inputFile = document.querySelector('#inputFile');
  var imageMetaData = document.querySelector('#img_meta_data');
  var uploadedFile = {};

  function fileUpload() {
    document.body.innerHTML += '<div>Storing file...</div>';
    var file = inputFile.files[0];

    new PouchDB('sample').destroy().then(function () {
      //
      // IMPORTANT CODE STARTS HERE
      //
      var db = new PouchDB('sample');
      return db.putAttachment('mydoc', 'myfile', file, file.type).then(function () {
        document.body.innerHTML += '<div>Stored file.</div>';
        return db.getAttachment('mydoc', 'myfile');
      }).then(function (blob) {
        var url = URL.createObjectURL(blob);
        document.body.innerHTML += '<div>Filesize: ' + JSON.stringify(Math.floor(blob.size/1024)) + 'KB, Content-Type: ' + JSON.stringify(blob.type) + "</div>";
        document.body.innerHTML += '<div>Download link: <a href="' + url + '">' + url + '</div>';
        return db.get('mydoc');
      }).then(function (doc) {
        document.body.innerHTML += '<div>PouchDB document looks like this:</div><div><pre>' + JSON.stringify(doc, null, '  ') + '</pre></div>';
      }).catch(function (err) {
        console.log(err);
      });
      //
      // IMPORTANT CODE ENDS HERE
      //
    });
  }

  // wait for change, then call the function
  inputFile.addEventListener('change', fileUpload, false);
});