/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'Music_Library_tech_test';
const collection = 'songs';

use(database);


db.getCollection(collection).insertMany([
            { artist: "The Verve", title: "The Drugs Don’t Work", length: "5:04", genre: "Pop", releaseYear: 2001 },
        { artist: "Bon Jovi", title: "Keep the Faith", length: "5:44", genre: "Rock", releaseYear: 2010 },
        { artist: "Disturbed", title: "If I Ever Lose my Faith", length: "4:34", genre: "Rock", releaseYear: 2020 },
        { artist: "Imagine Dragons", title: "Radioactive", length: "3:06", genre: "Indie", releaseYear: 2013 },
        { artist: "Alanis Morissette", title: "Hand in my Pocket", length: "3:41", genre: "Pop", releaseYear: 1995 }

], function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
});
    
