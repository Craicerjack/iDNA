/**
 *
 *     Author: Jerod Hammerstein
 *     Website: jhtechservices.com
 *     Date: 2015
 *
 *     This file is part of iDNA.
 *
 iDNA is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 iDNA is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 See <http://www.gnu.org/licenses/> for a copy of the GNU General Public License.
 */

gene1 = new iDNA.Gene('a', 'physical', {r: 40, g: 0, b: 140}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene1.express = function (o) {
    o.color = 'rgb(' + this.code.r + ',' + this.code.g + ',' + this.code.b + ')';
}
gene2 = new iDNA.Gene('b', 'physical', {r: 20, g: 0, b: 160}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene3 = new iDNA.Gene('c', 'physical', {r: 40, g: 0, b: 140}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene4 = new iDNA.Gene('d', 'physical', {r: 20, g: 0, b: 160}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene5 = new iDNA.Gene('A', 'physical', {r: 140, g: 0, b: 40}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene5.mutate = function () {
    this.code.g = this.code.g + 30;
};
gene5.express = function (o) {
    o.color = 'rgb(' + this.code.r + ',' + this.code.g + ',' + this.code.b + ')';
};

gene6 = new iDNA.Gene('B', 'physical', {r: 120, g: 0, b: 60}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene7 = new iDNA.Gene('C', 'physical', {r: 140, g: 0, b: 40}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene8 = new iDNA.Gene('D', 'physical', {r: 110, g: 0, b: 60}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene9 = new iDNA.Gene('eatA', 'metabolism', {op: 'AOXNLRZ'}, false, function () {
    return null;
}, function () {
    return this.code.op.length;
});

gene9.express = function (o) {
    if (typeof o.input === 'undefined' || o.input === '' || o.input === null) {
        o.input = 65; // 0b1000001 // desired output is 97 0b1100001
        return;
    }
    var input = o.input;
    var desired = 97;
    var code = this.code.op;
    var output = input;
    for (var i = 0; i < code.length; i++) {
        console.log(code.substr(i, 1));
        switch (code.substr(i, 1)) {
            case 'A':
                output = output & input;
                break;
            case 'O':
                output = output | input;
                break;
            case 'X':
                output = output ^ input;
                break;
            case 'N':
                output = ~output;
                break;
            case 'L':
                output = output << input;
                break;
            case 'R':
                output = output >> input;
                break;
            case 'Z':
                output = output >>> input;
                break;
        }

    }
    o.output = output;
    console.log('output:' + output);
// determine if output is better or not.  if better, increase lifespan or maxnumberofOffspring. percentage of correct binary positions.
    // desired value dv ^ output
    if (o.output === desired) {
        console.log("OPTIMIZED CODE REACHED! " + o.code.op);
    } else {

    var points = binaryPoints(desired, o.output);

        //compare store points in organism...compare new points with previous.  If no change, do nothing.  If worse, decrease offspring and lifespan
        //if better, increase offspring and lifespan

    }


};
/**
 * binaryPoints looks at the number in binary and compares how similar they are.
 * First it gets the number of binary digits as JavaScript does not use specific int sizes
 * It does this by changing the number to a string containing its binary representation and gets the length.
 * Second it XORs desired with the current value.  Each zero on the right-hand side up to the length of desired in this string represents a match
 * Any extra binary digits to the left are extra and subtracts a point or 2 points if the number is a one.
 * @param desired
 * @param current
 * @returns {number} - a point system representing how similar two numbers are in binary.  Zero being a match, negative numbers if not
 */
function binaryPoints(desired, current) {
    var lengthOfDesired = desired.toString(2).length; // num of binary digits.  JavaScript thing

    var compare = pad(lengthOfDesired, (current ^ desired).toString(2), '0'); //String where every zero on right-hand side up to length of desired is a correct binary value
    var points = compare.substr(-lengthOfDesired).split('0').length - 1;
    var lengthOfLeft = compare.length - lengthOfDesired;
    if (lengthOfLeft > 0) {
        points -= lengthOfLeft;
        numOfOnes = compare.slice(0, lengthOfLeft).split('1').length - 1;
        points -= numOfOnes;
    }
    return points - lengthOfDesired;
}

function pad(width, string, padding) {
    return (width <= string.length) ? string : pad(width, padding + string, padding)
}

chrom1 = new iDNA.Chromosome();
chrom1.addGene(gene1);
chrom1.addGene(gene2);
chrom1.addGene(gene3);
chrom1.addGene(gene4);
chrom1.addGene(gene9);
chrom2 = new iDNA.Chromosome();
chrom2.addGene(gene5);
chrom2.addGene(gene6);
chrom2.addGene(gene7);
chrom2.addGene(gene8);
chromPair = new iDNA.ChromosomePair(chrom1, chrom2);

org1 = new iDNA.Organism('A', 0, chromPair);
org2 = new iDNA.Organism('B', 0, chromPair);
org1.grow();
org2.grow();
org1.mature();
org2.mature();


function startWorld(gen) {
    var tt = new iDNA.TestTube();
    org1.reset();
    org2.reset();
    org1.mature();
    org2.mature();
    org1.express('physical');
    org2.express('physical');
    tt.organisms.push(org1, org2);

// create a network
    var container = document.getElementById('mynetwork');

// provide the data needed for the visjs
    var data = {
        nodes: tt.registry.nodes,
        edges: tt.registry.edges
    };
    var options = {
        layout: {
            randomSeed: undefined,
            hierarchical: {
                enabled: true,
                levelSeparation: 120,
                direction: 'LR', //UD, DU, LR, RL
                sortMethod: 'directed' //hubsize, directed
            }
        },
        interaction: {
            navigationButtons: true,
            keyboard: true
        }

    };

// initialize visjs network
    var network = new vis.Network(container, data, options);
    var tmpnetwork;

    // define event create another visjs of just the direct ancestors of the organism double-clicked.
    network.on("doubleClick", function (params) {

        var family = tt.registry.getAncestors(params.nodes[0]).concat([+params.nodes[0]]);  //id needs to be a number, not string

        var familyData = {
            nodes: new vis.DataSet(data.nodes.get(family)),
            edges: data.edges
        }

        tmpnetwork = new vis.Network(document.getElementById('zoom'), familyData, options);

        //define event to add the descendants of organism
        tmpnetwork.on("doubleClick", function (params) {
            var descendants = tt.registry.getDescendants(params.nodes[0]);
            var newNodes = data.nodes.get(descendants);
            _.each(newNodes, function (node) {
                if (familyData.nodes.get(node.id) === null) {
                    familyData.nodes.add(node);
                }
            });


        });
        tmpnetwork.on("selectNode", function (params) {
            var selectedNode2 = data.nodes.get(params.nodes[0]);
            var context = JSON.parse(selectedNode2.genome);
            context.regId = selectedNode2.id;
            tt.selectedNode2 = context;

        });
    });
    network.on("selectNode", function (params) {
        var selectedNode1 = data.nodes.get(params.nodes[0]);
        var context = JSON.parse(selectedNode1.genome);
        context.regId = selectedNode1.id;

        tt.selectedNode1 = context;

    });

    //data-binding of tt (TestTube) to interface
    var $rvGenomeMap = jQuery('.genomeMapContainer');
    var $rvWorldInfo = jQuery('.worldInfo');
    var rvGenomeMapHTML = $rvGenomeMap.html();
    var rvWorldInfoHTML = $rvWorldInfo.html();
    var rvGenomeMap = rivets.bind($rvGenomeMap, {tt: tt});
    var rvWorldInfo = rivets.bind($rvWorldInfo, {tt: tt});

    $rvGenomeMap.show();
    $rvWorldInfo.show();

    //controls

    //using visjs to create graph of population
    var pop = new vis.Graph2d(document.getElementById('census'), tt.visGrowth, {
        width: '100%',
        height: '150px',
        style: 'bar',
        showCurrentTime: false,
        showMajorLabels: false,

        barChart: {
            width: 25
        },
        dataAxis: {
            showMajorLabels: false,
            showMinorLabels: true,
            visible: true,
            left: {
                range: {min: 0}
            }
        }

    });
    tt.visGrowth.on('add', function () {
        pop.fit();
    });

    //using visjs to create a graph on loop speed.
    var comp = new vis.Graph2d(document.getElementById('comp'), tt.visLoopSpeed, {
        width: '100%',
        height: '150px',
        style: 'bar',
        showCurrentTime: false,
        showMajorLabels: false,

        barChart: {
            width: 25
        },
        dataAxis: {
            showMajorLabels: false,
            showMinorLabels: true,
            visible: true,
            left: {
                range: {min: 0}
            }
        }

    });
    tt.visLoopSpeed.on('add', function () {
        comp.fit();
    });

    //Let the organisms in the test tube mate! Start the loop in another thread with a callback to let us know it is complete.
    _.defer(iDNA.braveNewWorld(tt, gen, function (tt) {
        console.log('iDNA.braveNewWorld is done.');
        console.log(tt);
    }));

    return {
        reset: function () {
            // function to reset networks, rivets and graphs
            console.log('reset()');
            rvGenomeMap.unbind();
            rvWorldInfo.unbind();
            $rvGenomeMap.html(rvGenomeMapHTML);
            $rvWorldInfo.html(rvWorldInfoHTML);
            tt.stopped = true;
            iDNA.nameTracker = [];
            network.destroy();
            if (typeof tmpnetwork !== "undefined") {
                tmpnetwork.destroy()
            }
            ;

        },

        stop: function () {
            console.log('stop()');
            tt.stopped = true;
        }
    };
}