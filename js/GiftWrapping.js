// p1 - tmpPoint, a
// p2 - mutualPoint, b
// p3 - tryPoint, c
function computeAngle(p1, p2, p3){
    // //* (180/Math.PI); for angledegree
    // return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let ab = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    let bc = Math.sqrt(Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2));
    let ac = Math.sqrt(Math.pow(p3.x - p1.x, 2) + Math.pow(p3.y - p1.y, 2));
    return Math.acos((bc*bc+ab*ab-ac*ac)/(2*bc*ab));
}


function giftWrapping2(){
    if (points.length === 0) {
        return;
    }
    clearLines();

    let beginningPoint = points[0];
    function rightMostPoint(){
        points.forEach(element => {
            beginningPoint = element.x > beginningPoint.x ? element : beginningPoint;
        });
        return beginningPoint;
    }
    
    beginningPoint = rightMostPoint();          
    resultLine.push(beginningPoint);

    let startingPoint = {x:beginningPoint.x, y:bodyHeight};
    let mutualPoint = beginningPoint;
    let maxAngle = -Infinity;
    let newNextPoint = points[0];
    let tmpAngle = computeAngle(startingPoint,mutualPoint,newNextPoint);
    let i = 0;
    while(true){
        points.forEach(nextPoint => {
            tmpAngle = computeAngle(startingPoint,mutualPoint,nextPoint);
            if(isNaN(tmpAngle) || tmpAngle === 0){return;}                                
            if (tmpAngle > maxAngle){
                maxAngle = tmpAngle;
                newNextPoint = nextPoint;
            };                    
        });
        drawLine(mutualPoint,newNextPoint);
        if (newNextPoint === beginningPoint)
            break;
        startingPoint = mutualPoint;
        mutualPoint = newNextPoint;
        newNextPoint = points[0];
        maxAngle = -Infinity;
        i++;
    }
}