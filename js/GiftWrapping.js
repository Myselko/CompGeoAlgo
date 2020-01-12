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