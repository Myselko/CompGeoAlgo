function delaunayTriangulation(){
    //sort points based on x axis
    points.sort((a,b) => {
        return a.x - b.x;
    })
    ael = [];
    let tmpPoint;
    let dist = 0;
    let minDistance = Infinity;
    let nextPoint, edge;

    //pick first point (left most point)
    if (points.length < 3) {return;}
    tmpPoint= points[0];
    
    //pick nearest point
    points.forEach((element)=>{
        if(element === tmpPoint) return;
        dist = distance(tmpPoint,element);
        if(dist < minDistance){
            minDistance = dist;
            nextPoint = element;
        }
    })
    //create edge
    edge = new Edge(tmpPoint,nextPoint);
    oppositeEdge = edge.newOpposite();
    oppositeEdge.oppositeEdge = edge;
    edge.oppositeEdge = oppositeEdge;
    
    
    let tmpEdge = null;
    let triangIndex = 0;
    findShortestDelDistance(points,edge);
    //add all three edges to the list of active edges AEL
    if (noPoint){     
        //edge.opposite = true;
        edge.triangle = triangIndex;
        
        //ael.push(edge);
        let edge2 =  new Edge(edge.to,newPoint,triangIndex);
        let edge3 =  new Edge(newPoint, edge.from,triangIndex);
        edge.next = edge2;
        edge2.next = edge3;
        edge3.next = edge;
        ael.push(edge);
        ael.push(edge2);
        ael.push(edge3);
        triangles.push(new Triangle(edge,edge2,edge3));
        dt.push(edge);
    }
    else {
        console.log('opposite');
        findShortestDelDistance(points,oppositeEdge);
        //ael.push(oppositeEdge);
        oppositeEdge.triangle = triangIndex;
        let edge2 =  new Edge(oppositeEdge.to,newPoint,triangIndex);
        let edge3 =  new Edge(newPoint, oppositeEdge.from,triangIndex);
        oppositeEdge.next = edge2;
        edge2.next = edge3;
        edge3.next = oppositeEdge;
        ael.push(edge2);
        ael.push(edge3);
        triangles.push(new Triangle(oppositeEdge,edge2,edge3));
        oppositeEdge.opposite = false;
        dt.push(oppositeEdge);
    }

    function addToAEL(edge,ael,dt){
        let isInAEL = false;
        let isInDT = false;
        ael.forEach( (el) => {
            if(el.isSameEdge(edge.from,edge.to))
                isInAEL = true;
        })
        dt.forEach( (el) => {
            if(el.isSameEdge(edge.from,edge.to))
                isInAEL = true;
        })
        if(!isInAEL && !isInDT)
            ael.push(edge);
        else console.log('edge is in list!', edge);
    }
    
    drawCircle(bestCircle,'green');
    // circleCenters.push(bestCircle);
    triangles[0].circle = bestCircle;
    
    //while AEL is not empty do
    while (ael.length){                
        
        
        let currentEdge = ael.pop();
        let oppEdge1 = currentEdge.newOpposite();
        oppEdge1.oppositeEdge = currentEdge;
        currentEdge.oppositeEdge = oppEdge1;
        findShortestDelDistance(points,oppEdge1);
        if (noPoint){
            triangIndex++;
            currentEdge.triangle = triangIndex;                    
            let edge2 = new Edge(oppEdge1.to,newPoint,triangIndex);
            let edge3 = new Edge(newPoint, oppEdge1.from,triangIndex);
            oppEdge1.next = edge2;
            edge2.next = edge3;
            edge3.next = oppEdge1;
            
            
            //let oppEdge2 =  edge2.newOpposite();
            //let oppEdge3 =  edge3.newOpposite();
            addToAEL(edge2,ael,dt);
            addToAEL(edge3,ael,dt);
            drawCircle(bestCircle,'green');
            // circleCenters.push(bestCircle);
            triangles.push(new Triangle(oppEdge1,edge2,edge3,bestCircle));
        }
        else currentEdge.opposite = false;
        dt.push(currentEdge);
        //dt.push(edge2);
        //dt.push(edge3);
        //console.log('AEL: ',ael);
    }
    console.log(dt);
    //console.log(circleCenters);
    // console.log(triangles);
    dt.forEach( (el) => {
        drawLine(el.from,el.to);
    })
}

