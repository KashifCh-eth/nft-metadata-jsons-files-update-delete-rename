const fs = require('fs');
const path = __dirname + '/metadata';
// const buildDescription =(oldvalue,id) => 'codeapachi erc721 ';
// const buildName = (oldvalue,id) => 'codeapachi#'+ id;



const  buildName  =(oldvalue,id) => 'ipfs://ipfsuri................./'+ addLeadingZeros(id) +'.png';

function addLeadingZeros(number) {
    // Convert the number to a string
    let numberString = String(number);
    // Add leading zeros until the string is at least 4 characters long
    while (numberString.length < 4) {
      numberString = "0" + numberString;
    }
    return numberString;
  }

   
const getTokenId = (filepath) => {
    return filepath.match(/([0-9]+)\.json/)[1];
}


fs.readdirSync (path).forEach((fileName)=>{
    const filepath = path +'/'+fileName;
   const stat = fs.statSync(filepath);
   if(! stat.isFile()){
       return;
   }
   if(fileName.endsWith('.json')){
       const jsonContant = require(filepath);
       const tokeId = getTokenId(fileName);
       let keys = Object.keys(jsonContant);
       // rename the keys
    for (let key of keys) {
    let newKey = key.replace('metadata', 'image');  // create the new key name
    Object.defineProperty(jsonContant, newKey, Object.getOwnPropertyDescriptor(jsonContant, key));  // add the new property
  }

    //    jsonContant.name = buildName(jsonContant.name,tokeId);
    //    jsonContant.description = buildDescription(jsonContant.description,tokeId);
    //    jsonContant.image = buildName(jsonContant.name,tokeId);
          jsonContant.image = buildName(jsonContant.buildImageUri,tokeId);
        fs.writeFileSync(fileName,JSON.stringify(jsonContant,null,2));
       
 
   }
});


// power by skillscodified
