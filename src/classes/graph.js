class Graph{
    constructor(){
        this.nodes=[];//represente un sommet ex: O---->
        this.adjacency_list={};/* represente une liste des sommets adjacents  ex: O---2-->O
                                                                            ^   ^   ^
                                                                            s1  poids s2 */
    }
    //creation d'un sommet
    add_node(node){
        this.nodes.push(node);
        this.adjacency_list[node]={};//pour connecter les sommets entre eux avec un poids donne 
    }
    add_link(node1, node2, weight){
        this.adjacency_list[node1][node2]=weight;//l'ajout du poids entre les deux sommets
    }
    change_weight(node1, node2, weight){
        this.adjacency_list[node1][node2]=weight;//remplace un poids par autre
    }
    min_distance_node(distances, visited){
        let min_distance=Infinity,
        min_node=null;
        for(let node in distances){
            let distance=distances[node];
            if(distance<min_distance && !visited.has(node)){
                min_distance=distance;
                min_node=node;
            }
        }
        return min_node;
    }
    dijkstra(source){
        let distances={},
        parents={},
        visited=new Set();
        for(let i=0;i<this.nodes.length;i++){
            if(this.nodes[i]===source) distances[this.nodes[i]=0];
            else{
                this.nodes[i]=Infinity;
            }
            parents[this.nodes[i]]=null;
        }
        let current_node=this.min_distance_node(distances, visited);
        while(current_node!==null){
            let distance=distances[current_node],
            neighbors=this.adjacency_list[current_node];
            for(let neighbor  in neighbors){
                let new_distance=distance+neighbors[neighbor];
                if(distances[neighbor]>new_distance){
                    distances[neighbor]=new_distance;
                    parents[neighbor]=current_node;
                }
            }
        }
        console.log(parents);
        console.log(distances);
    }
}

let graph=new Graph();
graph.add_node('A');
graph.add_node('B');
graph.add_node('C');
graph.add_node('D');

graph.add_link('A', 'B', 3);
graph.add_link('A', 'C', 2);
graph.add_link('B', 'D', 2);
graph.add_link('C', 'D', 6);

graph.dijkstra('A');
