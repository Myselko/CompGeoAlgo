function grahamScan(){
            
    if (points.length === 0) {
        return;
    }
    clearLines();
    let beginningPoint = points[0];
    let edge = {
        a: {},
        b: {},
    };
    stack = [];
    edges = [];
    
    function rightMostPoint(){
        points.forEach(element => {
            beginningPoint = element.x > beginningPoint.x ? element : beginningPoint;
        });
        return beginningPoint;
    }
    beginningPoint = rightMostPoint();
    
    let newNextPoint, newNextPointIndex;
    let maxAngle = -Infinity;
    let tmpAngle = 0;
    let startingPoint = {x:beginningPoint.x, y:bodyHeight};
    let mutualPoint = beginningPoint;
    let tmpPoints = [...points];
    let orderedPoints = [];
    orderedPoints.push(beginningPoint);
    
    while (tmpPoints.length > 1){
        tmpPoints.forEach((nextPoint,index) => {
            tmpAngle = computeAngle(startingPoint,mutualPoint,nextPoint);
            if(isNaN(tmpAngle) || tmpAngle === 0){return;}                                
            if (tmpAngle > maxAngle){
                maxAngle = tmpAngle;
                newNextPoint = nextPoint;
                newNextPointIndex = index;
            };
        });
        tmpPoints.splice(newNextPointIndex,1);                
        orderedPoints.push(newNextPoint);
        maxAngle = 0;

    }
    let first = beginningPoint;
    let second = orderedPoints[1];
    let j = 2;
    let side;
    while (j < orderedPoints.length){
        side = crossProdOrientation(first,second,orderedPoints[j]);
        if(side === 0) {
            stack.push(first);                    
            first = second;
            second = orderedPoints[j];                                
            j++;
        }
        else if(side < 0) {
            stack.push(first);                    
            first = second;
            second = orderedPoints[j];
            j++;
        }
        else{
            second = first;
            first = stack.pop();
            
        }
    }
    //draw hull
    stack.push(first);
    stack.push(second);
    for (let i = 0; i < stack.length -1; i++){
        drawLine(stack[i],stack[i+1]);
        edge = {a:stack[i],b:stack[i+1]};
        edges.push(edge);
    }
    drawLine(stack[stack.length-1],stack[0]);
    edge = {a:stack[stack.length-1],b:stack[0]};
    edges.push(edge);
}