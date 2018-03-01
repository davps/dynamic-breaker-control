# dynamic-breaker-control
This web application is a demostration of a modern and non-trivial javascript application that helps to design an electrical network composed by feeders, bus bars and circuit breakers, and simulating the power flow of an electrical network.

Live demo:
http://davps.s3-website-us-east-1.amazonaws.com

Documentation:
http://davps.s3-website-us-east-1.amazonaws.com/docs.html

Source code:
https://github.com/davps/dynamic-breaker-control


### Interesting aspects of the `single-line-diagram` widget app

1.  The application must be able to represent circuit breakers, feeders, bus bars.
2.  The user must be able to insert these components
3.  The application can simulate the flow of the power on the busbars connected to one or more feeders in conformance with the Kirchhoff law.
4.  The user must be able to change the status (open|close) of the circuit breakers and run the simulation again.

### The solution of item number 3

In this section I will describe only the requirement number 3, which is the most sofisticated from the electrical engineering perspective.

They are some considerations in order to plot consistently (in all the cases) a simulated state of an electrical topology designed dynamically by the user. In order to solve that, I am using some mathematical tools from power analysis:

1.  Kirchhoff's circuit laws
2.  Theory of electrical power flow and its underlying math (graph theory), including:

*   Incidence matrix
*   Connected component (I am not sure about the translation. In spanish, we call it "gráficos conexos")

Basically, I calculate the incidence matrix of the electrical topology designed dynamically by the user, verify on which bus bar (vertex) the feeder is connected, and then I populate and paint each vertex of the graph starting from the feeder vertex. I populate the graph using a computational algorithm called BFS (breadth-first search). So, each connected graph that contains a feeder will be energized, and the isolated graphs without feeders will be not energized. [\[source](./app/javascript/widgets/single-line-diagram/views/PowerFlowView.js) [code\]](./app/javascript/widgets/single-line-diagram/models/Topology.js)
