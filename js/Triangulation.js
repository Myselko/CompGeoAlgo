function triangulation(){
    grahamScan();
    console.log(points,stack, edges);
    
    //remove other points inside hull
    //remove lines
    //sort
    stack.sort(sortPoints);
    console.log(stack);
    let firstP = stack[0];
    let lastP = stack[stack.length-1];
    let leftPath = [];            
    let rightPath = [];
    let tmpPoint = null;
    let lineStack = [];
    
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
    
    console.log('left: ',leftPath);
    console.log('right: ',rightPath);

    lineStack.push(stack[0]);
    lineStack.push(stack[1]);
    //we expect that we have correct convex hull
    let nextElem;
    let nextElemPath;
    let stackElemPath = checkPath(lineStack[1],rightPath);
    for (let i = 2; i < stack.length; i++) {
        
        nextElem = stack[i];
        
        //right - 1, left - 0
        nextElemPath = checkPath(nextElem,rightPath);

        console.log(lineStack[lineStack.length-1]);
        console.log(nextElem);
        console.log(nextElemPath);
        console.log(stackElemPath);

        if(nextElemPath === stackElemPath){
            for (let i = lineStack.length - 1; i > 0; i--){
                drawLine(nextElem,lineStack[i]);
                lineStack.pop(i);
            }
            lineStack.push(nextElem);
        }
        else{
            let top = lineStack[lineStack.length-1];
            for (let i = lineStack.length - 1; i > 0; i--){
                drawLine(nextElem,lineStack[i]);
                lineStack.pop(i);
            }
            lineStack.push(top);
            lineStack.push(nextElem);
        }
        stackElemPath = checkPath(lineStack[lineStack.length-1],rightPath);
    }
}