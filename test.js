class Graph{
    constructor(){
        this.adjacents={};
    }
    add_node(node){
        if(!this.adjacents[node]){
            this.adjacents[node]=new Set();
        }
    }
    add_link(node1, node2, weight){
        if(!this.adjacents[node1]){
            this.addlink(node1);
        }
        if(!this.adjacents[node2]){
            this.addlink(node2);
        }
        this.adjacents[node1].add(node2,weight);
        this.adjacents[node2].add(node1,weight);


    }

    display(){
        for(let node in this.adjacents){
            console.log(node+"->"+[...this.adjacents[node]]+" "+);

        }
    }
}

let graph=new Graph();
graph.add_node("a");
graph.add_node("b");


graph.add_link("a","b",1)


graph.display();