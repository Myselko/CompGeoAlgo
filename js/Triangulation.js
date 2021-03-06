function findPath(point,queue,end,path){
    let tmpP = point;
    edges.forEach(element => {
        if(tmpP === end){
            //queue.push(tmpP);
            return;
        }
        if(path === 0 && element.a === tmpP){
            queue.push(element.b);
            tmpP = element.b;
        }
        if(path === 1 && element.b === tmpP){
            queue.push(element.a);
            tmpP = element.a;
        }
    });
}
//check on which path the point is located
function checkPath(point,path){
    let pth = null;
    pth = path.find((element)=> element === point);
    if(pth) return 1;
    return 0;
}

function triangulation(){
    grahamScan();
    //remove other points inside hull
    stack.sort(sortPoints);
    let firstP = stack[0];
    let lastP = stack[stack.length-1];
    let leftPath = [];
    let rightPath = [];            
    let lineStack = [];
    //find first edge
    edges.forEach(element => {
        if(element.a === firstP){
            //left Path - because we go anticlockwise during graham scam
            //so the first point(a) is the highest one and the second (b)
            //is the lower
            leftPath.push(element.a);
            leftPath.push(element.b);
            if(element.b !== lastP){findPath(element.b,leftPath,lastP,0)}
        }
        else if(element.b === firstP){
            //right path - because the top point is point (b)
            rightPath.push(element.b);
            rightPath.push(element.a);
            if(element.a !== lastP){findPath(element.a,rightPath,lastP,1)}
        }
        else{}
    });
    // console.log('left: ',leftPath);
    // console.log('right: ',rightPath);
    //push first edge
    lineStack.push(stack[0]);
    lineStack.push(stack[1]);
    //we expect that we have correct convex hull
    let nextElem, nextElemPath;
    let stackElemPath = checkPath(lineStack[1],rightPath);
    //go through all the edges
    for (let i = 2; i < stack.length; i++) {
        nextElem = stack[i];
        //right - 1, left - 0
        nextElemPath = checkPath(nextElem,rightPath);
        // console.log('nextElem path: ',nextElemPath);
        // console.log('nextElem : ',nextElem);
        if(nextElemPath === stackElemPath){ //on the same path
            lineStack.push(nextElem);
            //for (let i = lineStack.length - 1; i >= 0; i--){
            //    drawLine(nextElem,lineStack[i]);
            //    lineStack.pop(i);
            //}
            //lineStack.push(nextElem);
        }
        //on the opposite path - draw lines
        else{
            let top = lineStack[lineStack.length-1];
            for (let i = lineStack.length - 1; i >= 0; i--){
                drawLine(nextElem,lineStack[i]);
                lineStack.pop(i);
            }
            //lineStack.push(top);
            lineStack.push(nextElem);
        }
        stackElemPath = checkPath(lineStack[lineStack.length-1],rightPath);
    }
}