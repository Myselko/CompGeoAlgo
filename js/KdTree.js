function kdTree(points, depth, verStart, verEnd, horStart, horEnd){
    let axis, median, node = {};
    let left, rightP = [];
    if (points.length < 1){return null;}
    
    else {
        median = Math.floor(points.length / 2);
        node.value = points[median];
        leftP = points.slice(0,median);
        rightP = points.slice(median+1);
        //horiz
        axis = depth % 2;
        if (axis){                    
            drawLine({x:horStart, y:node.value.y},{x:horEnd, y:node.value.y});
            leftP.sort((a,b) => {
                return a.x - b.x
            })
            rightP.sort((a,b) => {
                return a.x - b.x
            })
            node.left = kdTree(leftP, depth+1, verStart, node.value.y, horStart, horEnd);
            node.right = kdTree(rightP, depth+1, node.value.y, verEnd, horStart, horEnd);
        }
        //vert
        else{
            drawLine({x:node.value.x, y:verStart},{x:node.value.x, y:verEnd});
            rightP.sort((a,b) => {
                return a.y - b.y
            })
            leftP.sort((a,b) => {
                return a.y - b.y
            })            
            node.left = kdTree(leftP, depth+1, verStart, verEnd, horStart, node.value.x);
            node.right = kdTree(rightP, depth+1, verStart, verEnd, node.value.x, horEnd);    
        }
        
        // node.left = kdTree(leftP, depth+1);
        // node.right = kdTree(rightP, depth+1);
        return node;
    }
}

function createKDTree(){
    points.sort((a,b) => {
        return a.x - b.x;
    });
    let tree = kdTree(points,0,0,bodyHeight,0,bodyWidth);
    // console.log(tree);
}        