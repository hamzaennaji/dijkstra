class Graph{
    constructor(){
        this.nodes_list={};
    }

    add_node(node){
        if(!this.nodes_list[node]){
            this.nodes_list[node]=new Set();
        }
    }

    add_link(node1, node2, weight){
        if(!this.nodes_list[node1]){
            this.add_node(node1);
        }
        if(!this.nodes_list[node2]){
            this.add_node(node2);
        }
        this.nodes_list[node1].add([node2,weight]);
        this.nodes_list[node2].add([node1,weight]);
    }

    change_weight(node1, node2, weight){
        let a=this.nodes_list[node1],
        b=this.nodes_list[node2], 
        a_link=[...a][0][0],
        b_link=[...b][0][0];
        // if(!this.nodes_list[node1]){
            //     this.add_node(node1);
        // }
        // if(!this.nodes_list[node2]){
            //     this.add_node(node2);
            // }
            if(a_link===node2&&b_link===node1){
                for(let arr of a){
                    if(arr[0]===a_link){
                        arr[1]=weight;
                        break;
                    }
                }
                for(let arr of b){
                    if(arr[0]===b_link){
                        arr[1]=weight;
                        break;
                    }
                }
                // this.nodes_list[node1].clear();
                // this.nodes_list[node1].add([node2,weight]);
                // this.nodes_list[node2].clear();
                // this.nodes_list[node2].add([node1,weight]);
            }
        }
        
        dijkstra(start, end){
            let distances={},
            visited={};
            for(let node in this.nodes_list){
                if(start===node) distances[node]=0;
                else{
                    distances[node]=Infinity;
                }
            }

        }

    link_exist(node1, node2){
        return ([...this.nodes_list[node1]][0][0]===node2&&[...this.nodes_list[node2]][0][0]===node1);
    }

    display(){
        for(let node in this.nodes_list){
            console.log(node+"->"+[...this.nodes_list[node]]);

        }
    }
}

let graph=new Graph();
graph.add_node("a");
graph.add_node("b");
graph.add_node("c");
graph.add_node("d");


graph.add_link("a","b",1);
graph.add_link("b","d",3);
graph.add_link("b","c",2);
graph.add_link("c","d",9);
// graph.display();
// graph.change_weight("a","b",6);
// graph.display();
// graph.change_weight("a","b",3);
// graph.display();
// console.log(graph.link_exist("a", "b"));
graph.dijkstra("a","b");