class Graph {
    constructor() {
        this.nodes = [];
        this.nodeList = {};
    }
    nodes_list(node) {
        this.nodes.push(node);
        this.nodeList[node] = {};
    }
    
    addLink(node1, node2, weight) {
        this.nodeList[node1][node2] = weight;
    }
    
    changeWeight(node1, node2, weight) {
        this.nodeList[node1][node2] = weight;
    }
    dijkstra(source) {
        let distances = {},
            parents = {},
            visited = new Set();
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.nodes[i]] = Infinity;
            }
            parents[this.nodes[i]] = null;
        }
        
        let currNode = this.minDistanceNode(distances, visited);
    
        while (currNode !== null) {
            let distance = distances[currNode],
                neighbors = this.nodeList[currNode];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currNode;
                }
            }
            visited.add(currNode);
            currNode = this.minDistanceNode(distances, visited);
        }
    
        console.log(parents);
        console.log(distances);
    }
    minDistanceNode(distances, visited) {
        let minDistance = Infinity,
            minNode = null;
        for (let node in distances) {
            let distance = distances[node];
            if (distance < minDistance && !visited.has(node)) {
                minDistance = distance;
                minNode = node;
            }
        }
        return minNode;
    }
}


// let g = new Graph();

// // add the nodes
// g.nodes_list('A');
// g.nodes_list('B');
// g.nodes_list('C');
// g.nodes_list('D');

// // create the links
// g.addLink('A', 'B', 3);
// g.addLink('A', 'C', 2);
// g.addLink('B', 'D', 2);
// g.addLink('C', 'D', 6);

// // A as the source node.
// g.dijkstra('A');

// should log
// { A: null, B: 'A', C: 'A', D: 'B' }
// { A: 0, B: 3, C: 2, D: 5 }
