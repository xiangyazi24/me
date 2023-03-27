---
title: "Almost Shortest Path via ChatGPT"
date: "2023-03-26"
slug: "asp"
math: mathjax
---
I teach CSC 482: Algorithm and Computation every semester. In the past few semesters, I like to assign [Beecrowd 1391: Almost Shortest Path](https://www.beecrowd.com.br/judge/en/problems/view/1391) as a two-part homework assignment. In the first part, I asked my students to implement a customized heap, with some addition feature such as lookup dictionary for data items. In the second part, they need to solve the Beecrowd problem. The overall framework to solve the problem is simple.
- Read in a graph. 
- Run Dijkstra's Algorithm to get a subgraph consist of all the shortest paths.
- Remove the subgraph via BFS algorithm. 
- Dijkstra's Algorithm again. 

It is a neat problem that can touch many topics we cover in the course.
- Heap.
- Dijkstra;s Algorithm. (And they need to hack it.)
- BFS algorithm. 

In the beginning of this semester, I thought some of the concepts in the ASP problem is not so easy to understand by ChatGPT. So it will still take quite some efforts for a student to solve it, even with the help of ChatGPT, since after all, the first time I ran ChatGPT and asked it to implement Dijkstra's algorithm a few month ago, it did not even compile. But as we know, ChapGPT evolved quickly in the past few months. (And I have not even try GPT-4 yet.) Now it can easily generate all the useful pieces to solve my homework assignment. 

**Today I will demonstrate how to solve the problem via ChatGPT.** 

{{< table_of_contents >}}

# Input Processing

Beecrowd, as many ICPC programming contest sites, feeds formatted input through standard input. Each semester I have students complain they spend too much time on processing the input. Generally speaking, input processing is easy, and ChapGPT can make it easier: You can just speak English and it understands you. 

Below is my conversation with ChatGPT. My occasional grammar error does not affect its "understanding".

Person: 
- create python code to read the following format data into a graph:
First line: two numbers, the first number "n" represent the number of nodes of the graph, the second number "m"  represent  the number of edges .
Second line:  two numbers. Read the first one into a variable name "start", the second "dest"
Follow by  m lines. Each line is tuple (a, b, w), which means an edge from a to b with weight w. 

- We have multiple such graph as input, until we run into a line "0 0". Then the input ends. 

- Create a loop and read each session of the data into a graph

ChatGPT: 
- Sure, here's the code to read the input data and create a graph:

```python
def read_graph():
    n, m = map(int, input().split())  # read n and m from first line
    if n == 0 and m == 0:  # end of input
        return None
    start, dest = map(int, input().split())  # read start and dest from second line
    graph = {i: {} for i in range(n)}  # initialize graph with n nodes
    for _ in range(m):
        a, b, w = map(int, input().split())  # read edge from input
        graph[a][b] = w  # add edge to graph
    return start, dest, graph

while True:
    data = read_graph()
    if data is None:
        break
    start, dest, graph = data
    # do something with start, dest, and graph
```



- The `read_graph` function reads the input data for a single graph session and returns a tuple of `start`, `dest`, and `graph`. If the first line of input is "0 0", it returns `None` to indicate the end of input.

- The `while` loop repeatedly calls `read_graph` until it returns `None`, indicating the end of input. For each graph session, it unpacks the tuple into `start`, `dest`, and `graph` variables, and you can do whatever you want with them inside the loop.

*I found that it did not use adjacency list but matrix. So I request it to do so.*

Person: 
- use adj list for the graph in the above code

ChatGPT: 
- Sure, here's the modified code that uses an adjacency list to represent the graph:

```python
def read_graph():
    n, m = map(int, input().split())  # read n and m from first line
    if n == 0 and m == 0:  # end of input
        return None
    start, dest = map(int, input().split())  # read start and dest from second line
    graph = [[] for _ in range(n)]  # initialize graph with n nodes
    for _ in range(m):
        a, b, w = map(int, input().split())  # read edge from input
        graph[a].append((b, w))  # add edge to graph
    return start, dest, graph

while True:
    data = read_graph()
    if data is None:
        break
    start, dest, graph = data
    # do something with start, dest, and graph
```



The `graph` variable is initialized as a list of `n` empty lists. Each element of the list represents a node in the graph, and the list contains tuples representing edges from that node. Each tuple contains two values: the destination node and the weight of the edge.

When reading an edge from the input, we append a tuple of `(b, w)` to the `graph[a]` list to represent an edge from node `a` to node `b` with weight `w`.

# Min Heap Implementation
*I asked ChatGPT to implement a min heap with extra requirements. It understood my request about the swap function.*

Person: 
- implement a min heap in python; add a dict name "position" to map the data items to their indices; add a changePriority() function to allow a user change an item's priority; add a swap function, in side the swap function, maintenance the position mapping.

ChatGPT: 
- Sure, here's an implementation of a min heap in Python that includes the `position` dictionary and a `changePriority()` function:

```python
class MinHeap:
    def __init__(self):
        self.heap = []
        self.position = {}
        
    def parent(self, i):
        return (i-1)//2
    
    def left_child(self, i):
        return 2*i+1
    
    def right_child(self, i):
        return 2*i+2
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
        self.position[self.heap[i][1]] = i
        self.position[self.heap[j][1]] = j
    
    def insert(self, item):
        self.heap.append(item)
        n = len(self.heap)
        self.position[item[1]] = n-1
        self.sift_up(n-1)
        
    def sift_up(self, i):
        while i > 0 and self.heap[i][0] < self.heap[self.parent(i)][0]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
        
    def extract_min(self):
        min_item = self.heap[0]
        del self.position[min_item[1]]
        last_item = self.heap.pop()
        if self.heap:
            self.heap[0] = last_item
            self.position[last_item[1]] = 0
            self.sift_down(0)
        return min_item
    
    def sift_down(self, i):
        n = len(self.heap)
        min_idx = i
        l = self.left_child(i)
        if l < n and self.heap[l][0] < self.heap[min_idx][0]:
            min_idx = l
        r = self.right_child(i)
        if r < n and self.heap[r][0] < self.heap[min_idx][0]:
            min_idx = r
        if i != min_idx:
            self.swap(i, min_idx)
            self.sift_down(min_idx)
    
    def changePriority(self, item, new_priority):
        if item in self.position:
            i = self.position[item]
            old_priority = self.heap[i][0]
            self.heap[i] = (new_priority, item)
            if new_priority < old_priority:
                self.sift_up(i)
            else:
                self.sift_down(i)
```



In this implementation, the heap is represented as a list of tuples, where the first element of each tuple is the priority value and the second element is the data item. The `position` dictionary maps each data item to its index in the heap.

The `swap()` function swaps two elements in the heap and updates their positions in the `position` dictionary accordingly.

The `changePriority()` function takes a data item and a new priority value and updates the heap and `position` dictionary accordingly. If the new priority is lower than the old priority, the function calls `sift_up()` to move the item up the heap, otherwise it calls `sift_down()` to move the item down the heap.

# Modified Dijkstra's Algorithm
*I asked ChatGPT to implement Dijkstra's algorithm for me. I asked it to preserve all the alternative paths with the same distance. And use a list of lists to maintain that information. It correctly implement the functionality I requested. I then tweaked it a little bit, asking it use `list`, instead of `dict` for distances.* 

Person: 
- Dijkstra algorithm implementation via heap

ChatGPT: 
- *I skip the content here. ChapGPT gave me an standard implementation, not satisfying my needs.*

Person: 
- in the above implementation: the alternative path where new_distance == distances[neighbor] is discard; use a data structure having the type list of lists with name prev, to maintain that information

ChatGPT: 
- Sure, we can modify the previous implementation to keep track of the predecessor of each node on the shortest path. Here's the updated Python code:

```python
import heapq

def dijkstra_heap(graph, start):
    distances = {node: float('inf') for node in graph}  # set all distances to infinity
    distances[start] = 0  # set the distance to the start node to 0
    heap = [(0, start)]  # initialize heap with starting node and its distance
    prev = {node: [] for node in graph}  # initialize predecessor list for all nodes
    while heap:
        (distance, node) = heapq.heappop(heap)  # get node with smallest distance from heap
        if distance > distances[node]:  # if node is already processed, skip it
            continue
        for neighbor, weight in graph[node].items():  # visit neighbors of the node
            new_distance = distances[node] + weight
            if new_distance < distances[neighbor]:  # if new distance to neighbor is shorter, update it
                distances[neighbor] = new_distance
                prev[neighbor] = [node]  # set the node as the only predecessor of the neighbor
                heapq.heappush(heap, (new_distance, neighbor))  # add neighbor and its distance to heap
            elif new_distance == distances[neighbor]:  # if there's a tie in distance, add the node as a predecessor
                prev[neighbor].append(node)
    return distances, prev
```



The `prev` dictionary is initialized with empty lists as the predecessor of each node. In the main loop, if a shorter distance to a neighbor is found, its predecessor list is updated with the current node. If there's a tie in distance, the current node is added to the predecessor list.

The modified function returns two values: `distances` and `prev`. `distances` is the same as before, containing the shortest distances to all nodes from the starting node. `prev` is a dictionary where each key is a node, and its value is a list of nodes that are its predecessors on the shortest path.


Person: 
- use list for distances, and name it dist instead

ChatGPT: 
- Sure, here's the modified implementation that uses a list for `distances` instead of a dictionary, and names it `dist`:

```python
import heapq

def dijkstra_heap(graph, start):
    n = len(graph)
    dist = [float('inf')] * n  # set all distances to infinity
    dist[start] = 0  # set the distance to the start node to 0
    heap = [(0, start)]  # initialize heap with starting node and its distance
    prev = [[] for _ in range(n)]  # initialize predecessor list for all nodes
    while heap:
        (distance, node) = heapq.heappop(heap)  # get node with smallest distance from heap
        if distance > dist[node]:  # if node is already processed, skip it
            continue
        for neighbor, weight in graph[node].items():  # visit neighbors of the node
            new_distance = dist[node] + weight
            if new_distance < dist[neighbor]:  # if new distance to neighbor is shorter, update it
                dist[neighbor] = new_distance
                prev[neighbor] = [node]  # set the node as the only predecessor of the neighbor
                heapq.heappush(heap, (new_distance, neighbor))  # add neighbor and its distance to heap
            elif new_distance == dist[neighbor]:  # if there's a tie in distance, add the node as a predecessor
                prev[neighbor].append(node)
    return dist, prev
```



The `dist` list is initialized with `float('inf')` for all nodes except the starting node, which is set to 0. The `prev` list is initialized with empty lists as the predecessor of each node.

In the main loop, the `distance` variable is renamed to `dist[node]` for readability, and the `distances` dictionary is replaced with `dist`. The `n` variable is added to store the number of nodes in the graph.

The `shortest_path` function from the previous answer should still work without any modification.

# Putting Everything Together

By now I have everything we need. Let's put them all together. There are very few lines of codes that I really need to write, in the case I need to do so, my GitHub Copilot plugin give me very good suggestion: I just need to type a few initial letters and then hit `Tab`.

Besides changing a few variables/functions name. Here are some modification I did. 

## Break Early In Dijkstra's Algorithm

We don't care about the shortest distance of other nodes more than necessary. When `dest` is extracted from the heap, its shortest distance is not going to change anymore. Hence we break the loop. See **line 21-23**. (GitHub Copilot promote the right code and write the comments for me, although its not always accurate.)

```python {.myclass linenos=table,hl_lines=["21-23"],linenostart=1}
def dijkstra(graph, start):
    n = len(graph)
    dist = [float('inf')] * n  # set all distances to infinity
    dist[start] = 0  # set the distance to the start node to 0
    heap = MinHeap()  # initialize heap
    heap.insert((0, start))  # initialize heap with starting node and its distance
    prev = [[] for _ in range(n)]  # initialize predecessor list for all nodes
    while heap.isempty() == False:
        (distance, node) = heap.extract_min()  # get node with smallest distance from heap
        if distance > dist[node]: # if node is already processed, skip it
            continue
        for neighbor, weight in graph[node]:  # visit neighbors of the node
            new_distance = dist[node] + weight
            if new_distance < dist[neighbor]:  # if new distance to neighbor is shorter, update it
                dist[neighbor] = new_distance
                prev[neighbor] = [node]  # set the node as the only predecessor of the neighbor
                heap.insert((new_distance, neighbor))  # add neighbor and its distance to heap
            elif new_distance == dist[neighbor]:  # if there's a tie in distance, add the node as a predecessor
                prev[neighbor].append(node)

    # break early if we reached the destination
        if node == dest:  # if we reached the destination, stop
            break
    return dist, prev

```
## No `changeKey` Needed

Note that in this implementation, no `changeKey()` function is needed. The trick happens in line 10-11 of the above code block. 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~python
        if distance > dist[node]: # if node is already processed, skip it
            continue
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The distance is saved in two places: the heap and the array `dist`. The distances `dist[node]` get updated more often than the copy in the heap: whenever some neighbor of the node get popped from the heap, it might receive an alternative value. If we want to make all the copy of the `dist[node]` up-to-date, we need to do a `changeKey`. However, the `changeKey` operation is expensive: we need to look though the underlying array of the heap, or use a fast look-up table to find where the `(dist[node], node)` is stored in the heap and changing it will cause a heapify process. 

The above code use a **lazy strategy**. When a alternative (smaller) distance is found, we just insert into the heap the node and its new distance. The heap-copy of the distance is now outdated. But we still leave it in the heap, until at some point we pop it and do the above comparison to find that it is outdated, then discard it. This strategy is more efficient, but it can incur higher space cost since we will have many copy of the `(dist, node)` pair in the heap. The correctness is always guarantee, for the smallest copy always get processed first since we are using a min heap!

## BFS Deletion

Similarly to the early exit of Dijkstra's algorithm, I add a line of code to exit the BFS deletion function early. See line 10-11.


```python {.myclass linenos=table,hl_lines=["10-11"],linenostart=1}
def delete(graph, prev, s, t):
    # Initialize visited and queue for BFS
    visited = set()
    queue = deque([t])
    visited.add(t)

    # Traverse the previous node list with BFS
    while queue:
        u = queue.popleft()
        if u == s:
            break
        for v in prev[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)
            # Remove the edge (u, v) from the graph
            graph[v] = [(w, weight) for w, weight in graph[v] if w != u]


    return graph

```
Note that we just want to delete shortest paths starting from `s` and ending at `t`, and we begin this BFS in a backward way. When `s` is pop from the queue, we need to end immediately, otherwise the algorithm might delete other useful edges.

The following test case can make the idea clearer.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~txt
5 6
0 1
0 1 1
0 2 1
2 3 1
2 4 1
3 1 1
4 1 1
0 0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
You can easily draw the graph out. After the first round, if you break early from Dijkstra's algorithm, your `prev` will basically contain two edges {(0,1),(0,2)}. The BFS algorithm will only need to delete (0,1), since s=0, t=1. If you delete also (0,2), you will get a wrong answer! I had to run a debugger to figure this out.

**The above few lines of code are the real codes that I add to this project!** Easy task? No! If you don't know the algorithm well, there is no way you know what to do! That is why you still need to learn. 


## The Full Solution

This blog has already becoming too long. You can download the file [here](/src/ASP/main.py).

![Beecrowd](/images/ASP.png)

# Conclusion

1. [ChatGPT and GitHub Copilot](https://github.blog/2023-03-22-github-copilot-x-the-ai-powered-developer-experience/)  dramatically changes the way we write codes. In the above project, I only "wrote" four lines of codes, which are generated by Copilot after I typed the first few letters. With ChatGPT and Copilot, one can have great confidence even when writing in an unfamiliar language.
2. A lot of laborious intermediate-level software development jobs will be accelerated by them, if not **replace** by them. ChatGPT will become a basic tool, just like the calculator in your pocket. You can not get a job by claiming you know how to press the buttons on a calculator. You need to go beyond that. 
3. Learning is still important. As you can see from the above, insights into the algorithms are critical. Without a good understanding of the algorithms, you can not go very far. 
