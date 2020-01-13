function voronoiDiagram(){
    //ohnisko (stred kruznice) patriace nejakemu trojuholniku
    //ak ma s nejakym inym spolocnu hranu tak spojim tieto ohniska
    delaunayTriangulation();

    //iterate throught triangles
    //add all of the edges of triangle to processedEdges
    //checkni susedne trojuholniky
    //otestujem ci uz neboli spracovane alebo ci ma opacnu hranu
    //vezmes hranu vyhladam ju v trojuholnikoch - dostanem trojuholnik
    //ak nie tak je hranicna
    let processedEdges = [];
    let toProcess = [];
    let currentTriangle = triangles[0];
    let edge1 = dt[0];
    console.log(edge1);
    //let edgeToProcess;
    //do toProcess dam prvy trojuholnik/hranu?
    //vlozim cely trojuholnik/vsetky hrany od processedEdges
    //ceknem susedne hrany/trojuholniky
    //ak neboli este spracovane tak ich pridam do toProcess
    
    //toProcess.push(triangles[0]);
    let edge2 = edge1.next;
    let edge3 = edge2.next;
    let firstCircle = calculateCircle(edge1.from,edge1.to,edge2.to);
    
    processedEdges.push(edge1,edge2,edge3);
    
    checkNeighbour(edge1.oppositeEdge,toProcess,processedEdges,firstCircle.center);
    
    checkNeighbour(edge2.oppositeEdge,toProcess,processedEdges,firstCircle.center);
    checkNeighbour(edge3.oppositeEdge,toProcess,processedEdges,firstCircle.center);

    checkBorderEdge(edge1,firstCircle.center);
    checkBorderEdge(edge2,firstCircle.center);
    checkBorderEdge(edge3,firstCircle.center);

    while (toProcess.length > 0){
        let edge1 = toProcess.pop();
        let edge2 = edge1.next;
        let edge3 = edge2.next;
        let firstCircle = calculateCircle(edge1.from,edge1.to,edge2.to);
        processedEdges.push(edge1,edge2,edge3);                
        checkNeighbour(edge1.oppositeEdge,toProcess,processedEdges,firstCircle.center);
        checkNeighbour(edge2.oppositeEdge,toProcess,processedEdges,firstCircle.center);
        checkNeighbour(edge3.oppositeEdge,toProcess,processedEdges,firstCircle.center);
        //pushto processed
        //checkNeighbour
        checkBorderEdge(edge1,firstCircle.center);
        checkBorderEdge(edge2,firstCircle.center);
        checkBorderEdge(edge3,firstCircle.center);
        
        //console.log(processedEdges);
        //console.log(toProcess);
        //
    }

}