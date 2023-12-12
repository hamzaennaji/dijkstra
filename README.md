# Dijkstra's Algorithm Simulator

## Overview

Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest path tree.

The algorithm exists in many variants; Dijkstra's original variant found the shortest path between two nodes, but a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree.

Follow the steps below to apply Dijkstra's algorithm in this project.

### Step 1: Provide Nodes

Start by providing all the nodes you want to apply Dijkstra's algorithm to. Ensure you provide more than one node, and duplicated nodes are not allowed. The initial node you provide will be considered the 'source.'


Example:

| Node |
|------|
| A    |
| B    |
| C    |
| D    |

### Step 2: Link Nodes

Link each node with its connected nodes and provide the weight of the link. Ensure that nodes are not linked to themselves, links are not duplicated, the weight is not negative, and each node must have at least one link from the source node.

Example:

| Source | Weight | Link |
|--------|--------|------|
| A      | 3      | B    |
| A      | 2      | C    |
| B      | 2      | D    |
| C      | 6      | D    |

### Step 3: Launch Simulation

Once all nodes are linked, launch the simulation to visualize the graph. Nodes are generated randomly on the screen, and you can interact with the graph by dragging nodes to change their positions.

## Troubleshooting

In case of errors, an error message will be displayed on the screen.

## What's next ?

Adding Kruskal algorithm between two selected nodes to find their minimum spanning tree.

## Link

Dijkstra's Algorithm Simulator : https://hamzaennaji.github.io/dijkstra/
