# iDNA #

 A javascript implementation mimicking genes, chromosomes, chromosome pairs, meiosis, mutation, and gene expression.

 Currently, it mimics an organism with a single chromosome pair where each chromosome can have unlimited genes.

 Each gene has

 1. a name
 1. a type - like 'physical', or 'metabolism'
 1. a code object - this is the data of the gene. It can be some JSON data and/or functions.
 1. an express function - this function is used to express this gene, typically, using the data from the code object.
 1. codeValue function - a function that can be defined that can determine if a gene is active.  Since there are usually genes of the same name on the other chromosome, this will compare the two genes to decide which gene is active.
 1. mutate function - a function that can be defined to determine how the code object can mutate.

Organisms with different chromosome pairs can be created.

Index.html has a simulation where one can enter in how many generations you want it to run.  There are two organisms in the test tube.  The simulation uses visjs
from visjs.org to create a tree of organisms.  One can click an organism to view its genetics or double-click to show a different tree with only the clicked
organism's ancestors.  If you double-click in ancestor tree, it will expand with the organism's descendants.

I did start adding a couple of genes that have mutate functions.  One mutates the color where the gene "code" is a json representation of the rgb values.
The other is a gene that pretends to have an input of the letter 'a'. The code for the gene is a string representing a list of bitwise
operations to manipulate this input to produce an output. I have a function that then compares this output bit by bit to determine how close
to the desired output it is.  I haven't implemented this yet, but the mutate
function would then mutate the list of bitwise operations to see if the next generation might get closer to the desired output.  I'll also
add viability scores to select the organisms that get closer to the desired value.

I had fun and learned a lot by writing this.  I think it has much potential such as in learning genetics or evolutionary algorithms. Also, the genes themeselves
can be anything.  You decide what the code is and how the express function uses the code to manipulate the organism. Why not create genes that cause the organisms
 to manipulate the DOM or send out ajax requests.  If you are interested or have ideas, let me know!

You can try a demo of this at [my website](http://jhtechservices.com/idna/index.html)

Here's a screenshot:
![iDNA screenshot](http://jhtechservices.com/idna/screenshot.jpg "iDNA sample")

 * Using visjs for visualization of data
 * Using jasmine for testing
 * Using rivets for data-binding
 * Using underscorejs for its javascript awesomeness

## Change log ##
### Version 0.0.1 ###

