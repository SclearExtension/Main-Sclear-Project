var depth;
var circularReporting = [];
let linksInPage = document.getElementsByTagName("a");
var testedLinks = {titles: [], texts: []};
var nextLinks1 = [];
var nextLinks2 = [];
var text = document.getElementById("output");
document.getElementById("inputBox").onblur = function(){getVal()} 
function getVal(){
  depth= JSON.parse(document.querySelector('input').value)
}
function run(depthArg){
  text.textContent = JSON.stringify(depthArg)
    for (let n = 1; n<Object.keys(linksInPage).length; n++){ 
    const inspected = linksInPage[n].href;
    if (inspected in testedLinks.titles){
        circularReporting.push(inspected);
        testedLinks.texts[testedLinks.titles.indexOf(inspected)].push(window.location.href);
    }else{
        testedLinks.titles.push(inspected);
        testedLinks.texts.push([window.location.href]);
        nextLinks1.push(inspected)
    }}
    //for depth, cycle though nextLinks1 then nextLinks2 doing this same thing
    for (let depthLevel = 0; depthLevel < depthArg; depthLevel++) {
      if (depthLevel%2==1){
        for (let x=0; x<nextLinks1.length;x++){
          window.open(nextLinks1[x],"_self") //i will add the "view-source:x" here, but it is running me into issues due to denying access. then, the same code will be copied with switched variables.
          for (let n = 1; n<Object.keys(linksInPage).length; n++){ 
            const inspected = linksInPage[n].href;
            if (inspected in testedLinks.titles){
                circularReporting.push(inspected); //i must also add what was already in it if the cardinality is 0. add what is already attached to it.
                testedLinks.texts[testedLinks.titles.indexOf(inspected)].push(window.location.href);
            }else{
                testedLinks.titles.push(inspected);
                testedLinks.texts.push([window.location.href]);
                nextLinks2.push(inspected)
            }}}
         }else{
          // it starts here, and its still not edited.
          for (let x=0; x<nextLinks2.length;x++){
            window.open(nextLinks2[x],"_self") //i will add the "view-source:x" here, but it is running me into issues due to denying access. then, the same code will be copied with switched variables.
            for (let n = 1; n<Object.keys(linksInPage).length; n++){ 
              const inspected = linksInPage[n].href;
              if (inspected in testedLinks.titles){
                  circularReporting.push(inspected);
                  testedLinks.texts[testedLinks.titles.indexOf(inspected)].push(window.location.href);
              }else{
                  testedLinks.titles.push(inspected);
                  testedLinks.texts.push([window.location.href]);
                  nextLinks1.push(inspected)}
        }}
      }
    } //else's
  console.log(depth)
  //text = JSON.stringify(window.location.href)
  //text = JSON.stringify(testedLinks) + " " + JSON.stringify(circularReporting)
  } //run

document.getElementById("run!").onclick = function(){run(depth)};