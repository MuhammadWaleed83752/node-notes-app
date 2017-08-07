const fs =require('fs');
const _=require('lodash');
const yargs=require('yargs');


const notes=require('./notes');
var titleOptions={
    describe:'Title of note',
    demand:true,
    alias:'t'
}
const argv=yargs
.command('add','Add a new note in CLI "node app.js add -t=<title name> -b=<"Body description">',{
title:titleOptions,
body:{
    describe:'Body of the node',
    demand:true,
    alias:'b'
}
})
.command('list' ,'List all notes in CLI "node app.js list"')
.command('read' ,'Read a note in CLI "node app.js read -t=<title name>',{
   title:titleOptions
})
.command('remove','Remove a note in CLI "node app.js remove -t=<title name>"',{
    title:titleOptions
})
.help()
.argv;

var command=argv._[0];

if(command==='add'){

    var note=notes.addNotes(argv.title, argv.body);
    if(note){
console.log('Note Created');

notes.logNote(note);

    }
    else{
console.log('Note Title Taken');
    }
}
else if(command==='list'){

    var allNotes=notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
allNotes.forEach((note)=>notes.logNote(note));
}
else if(command=='read'){
  var note=  notes.readNote(argv.title);
if(note){
console.log('Note Found');
notes.logNote(note);

}
else{
    console.log('Note not found');
}
}
else if(command==='remove'){
     var noteRemoved=notes.removeNote(argv.title);

     var message= noteRemoved ? 'Note Removed' : 'Note not found';
     console.log(message);
}
else{
    console.log('Command not recognized');
}