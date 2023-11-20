function visualize(g) {
    for (let node in g.nodeList) {
        // Create a circle for each node
        let circle = document.createElement('div');
        circle.className = 'node';
        circle.innerText = node;
        circle.style.left = Math.floor(Math.random() * 400) + 'px';
        circle.style.top = Math.floor(Math.random() * 400) + 'px';
        circle.id = node; // Set the id attribute
        document.body.appendChild(circle);
    }

    for (let node in g.nodeList) {
        let neighbors = g.nodeList[node];
        for (let neighbor in neighbors) {
            // Connect the nodes with spans
            let span = document.createElement('span');
            span.className = 'link';
            span.style.left = (getX(node) + getX(neighbor)) / 2 + 'px';
            span.style.top = (getY(node) + getY(neighbor)) / 2 + 'px';
            span.style.width = getDistance(node, neighbor) + 'px';
            span.innerHTML = neighbors[neighbor];
            document.body.appendChild(span);
        }
    }

    function getX(node) {
        let element = document.getElementById(node);
        return element ? parseFloat(element.style.left) + 20 : 0; // Adjust for circle width
    }

    function getY(node) {
        let element = document.getElementById(node);
        return element ? parseFloat(element.style.top) + 20 : 0; // Adjust for circle height
    }

    function getDistance(node1, node2) {
        let x1 = getX(node1);
        let y1 = getY(node1);
        let x2 = getX(node2);
        let y2 = getY(node2);
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}
