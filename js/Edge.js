class Edge {
    constructor(a, b, tr = null, nxt = null, opp = true, oppEdge = null) {
        this.from = a;
        this.to = b;
        this.next = nxt;
        this.opposite = opp;
        this.oppositeEdge = oppEdge;
        this.triangle = tr;
    }
    
    getOpposite(){
        return this.to,this.from;
    }

    isSame(a,b){
        if (a === this.from && b === this.to){
            return true;
        }
        else return false;
    }

    isSameEdge(a,b){
        if ((a === this.from && b === this.to) || (a === this.to && b === this.from)){
            return true;
        }
        else return false;
    }

    isOpposite(a,b){
        if (a === this.to && b === this.from){
            return true;
        }
        else return false;
    }
    newOpposite(){
        return new Edge(this.to, this.from);
    }

}