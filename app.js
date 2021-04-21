const fs = require("fs");
const convert = require("xml-js");
const xml2js = require("xml2js");
const util = require("util");

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();



let referenceFile = "ELITESERIEN_RUNDE.XML";
let configEliteserien = "eliteserien_setup.json";
let configObosligaen = "obosligaen_setup.json";

function readConfigFile(configFile) {
  fs.readFile(configFile, (err, result) => {
      resultString = JSON.parse(result);
      console.log(configFile);
      console.log(resultString.leagueId);
      console.log(resultString.kamper[1]);
  });  
};

fs.readFile('ELITESERIEN_RUNDE.xml', (err, data) => {
    parser.parseString(data, (err, result) => {
        let jsonRaw = result;
        /*
        result.element.entry[1].entry[9]._ = "147";
        result.element.entry[1].entry[10]._ = "2021";
        result.element.entry[1].entry[11]._ = "99999";
        */
        
        let jsonString = JSON.stringify(jsonRaw, null, 2);

        let xmlResult = builder.buildObject(jsonRaw);
        /* console.log(jsonString); */

        fs.writeFile('test.json', jsonString, (err) => {
            if (err) throw err;
            console.log("saved");
        });

        fs.writeFile('test.xml', xmlResult, (err) => {
            if (err) throw err;
            console.log("saved");
        });
        
    });

});

readConfigFile(configEliteserien);
readConfigFile(configObosligaen);