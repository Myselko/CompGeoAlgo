function crossProdOrientation(a, b, c){
    return ((b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x));
}

function calculateCircle(p1,p2,p3){
            
    let cp = 0;
    let d = 0;
    cp = 2*crossProdOrientation(p1,p2,p3);
    // d = 2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));
    // console.log(d);
    if(cp == 0) return;
    let p1Sq = 0;
    let p2Sq = 0;
    let p3Sq = 0;
    let num = 0;
    let num2 = 0;
    let cx = 0;
    let cy = 0;
    let centerPoint;

    p1Sq = Math.pow(p1.x,2) + Math.pow(p1.y,2);
    p2Sq = Math.pow(p2.x,2) + Math.pow(p2.y,2);
    p3Sq = Math.pow(p3.x,2) + Math.pow(p3.y,2);

    num = p1Sq*(p2.y - p3.y) + p2Sq*(p3.y - p1.y) + p3Sq*(p1.y - p2.y);
    cx = num/(cp);
    num2 = p1Sq*(p3.x - p2.x) + p2Sq*(p1.x - p3.x) + p3Sq*(p2.x - p1.x);
    cy = num2 / (cp);
    centerPoint = {
        x:cx,
        y:cy,
    }
    circle = {
        center:centerPoint,
        radius:distance(centerPoint,p1),
    }
    return circle;
}


//test if point p lies inside circle with center in point center
function insideCircle(center,p,circle){
    if(Math.pow(distance(center,p),2) < Math.pow(circle.radius,2)){
        return true;
    }
    else
        return false;
}

//returns distance between two points
function distance(a,b){
    return Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2));
}

//returns delaunay distance
//a - first point of edge
//b - second point of edge
//p - point for which we look for a distance
//s - middle of the circle
function delaunayDistance(a,b,p,s){
    pDistance = distance(p,s);
    pSide = crossProdOrientation(a,p,b) > 0;
    sSide = crossProdOrientation(a,s,b) > 0;
    if (pSide === sSide){
        return pDistance;
    }
    else
        return pDistance * -1;
}

function normalize(val,len){
    if (len === 0){
        return {x:1,y:0}
    }
    else {
        return {x: val.x/=len, y: val.y/=len}
    }
}

function checkBorderEdge(edge,center){
    if(edge.opposite) return;
    let middle = {x: edge.from.x + edge.to.x, y: edge.from.y + edge.to.y};
    middle.x = middle.x/2;
    middle.y = middle.y/2;
    let len = Math.sqrt(middle.x * middle.x + middle.y * middle.y);
    let direction = {x: middle.x - center.x, y: middle.y - center.y};
    direction = normalize(direction,len);
    direction.x *= 10000;
    direction.y *= 10000;

    if(crossProdOrientation(edge.from, edge.to, center) > 0){
        direction.x *= -1;
        direction.y *= -1;
    }
    let outsidePoint = {x:center.x + direction.x, y:center.y + direction.y};
    drawLine(center,outsidePoint,'orange');
}

function checkNeighbour(edge,toProcess,processedEdges,c){
    //zisti ci je hranicna hrana
    if (edge === null) return;
    let isSame = false;
    //zisti ci je v processed
    processedEdges.forEach((el) => {
        if (el.isSame(edge.from,edge.to)) isSame = true;
    })
    if (isSame){
        console.log('includes');
        return;
    }
    // if (processedEdges.includes(edge)){ console.log('includes'); return}
    if (edge.next !== null){
    //najdi trojuholnik ku ktoremu patri
    //sprav do jeho taziska ciaru
    //pridaj hrany/triuholnik do toProcess
        let nextCenter = calculateCircle(edge.from,edge.to,edge.next.to);
        drawLine(nextCenter.center,c,'blue');
        toProcess.push(edge);
        console.log('neighbours ',edge);
    }
}

function findShortestDelDistance(p,edge){
    let minDelDistance = Infinity;
    let tmpDelDistance = null;
    let tmpCircle = null;
    bestCircle = null;
    newPoint = null;
    noPoint = null;
    p.forEach( (el) => {
        let crsProd = crossProdOrientation(edge.from,el,edge.to);
        //we are looking only for points situated on the left from the edge
        if (crsProd > 0){
            noPoint = true;
            //left
            //calculate delaunay distance
            console.log('left ',p,edge);
            tmpCircle = calculateCircle(edge.from,edge.to,el);
            tmpDelDistance = delaunayDistance(edge.from, edge.to, el,circle.center);                    
            //if its smaller than minimum assing it to min
            if (tmpDelDistance < minDelDistance){
                minDelDistance = tmpDelDistance;
                bestCircle = tmpCircle;
                newPoint = el;
            }
            //drawCircle(tmpCircle);
        }
        else if (crsProd === 0){
            console.log('on line');
            //on the line
        }
        else { // < 0
            console.log('right');
            //right
        }
    })
}
