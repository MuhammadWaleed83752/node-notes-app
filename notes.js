const fs=require('fs');

var fetchNotes=function (){
try{
var notesString=fs.readFileSync('notes-data.json');

 return JSON.parse(notesString);

}catch(e){
return [];
}
};

var saveNotes=function(notes){
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));


};
var addNotes=function(title,body){

var notes=fetchNotes();
var note={
    title,
    body
};


var duplicateNotes= notes.filter((note)=>note.title===title);

if(duplicateNotes.length===0){

    notes.push(note);
  saveNotes(notes);
  return note;
                             }
};


var getAll=function(){
return fetchNotes();


}



var readNote=function(title){
    var notes=fetchNotes();
    var filteredNotes=notes.filter((note)=>note.title===title);
    return filteredNotes[0];
};

var removeNote=function(title){
var notes=fetchNotes();
var filteredNotes= notes.filter((note)=>note.title !== title);
saveNotes(filteredNotes);

return notes.length !==filteredNotes.length;


};


var logNote=function(note){    
    console.log('--');
console.log(`Title: ${note.title}`);
console.log(`Body: ${note.body}`);
}

module.exports={
    addNotes:addNotes,
    getAll:getAll,
    readNote:readNote,
    removeNote:removeNote,
    logNote:logNote
}