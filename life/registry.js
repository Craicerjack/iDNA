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

//iDNA.Registry is dependent on vis.js
//TODO - if vis.DataSet() undefined or null, create a basic graph Function with prototype function add(), get().  See http://visjs.org/docs/data/dataset.html



var iDNA = iDNA || {}

iDNA.Registry = function Registry(){


    this.nodes = new vis.DataSet();
    this.edges = new vis.DataSet();
    this.nextId = 1;

    this.myNodes = [];   //implementing a secondary way of traversing tree not tied to visjs

};

iDNA.Registry.prototype.addNode = function addNode(org) {
    this.myNodes.push({id: org.id, fromIds: [], toIds: []});
    this.nodes.add(org);
};
iDNA.Registry.prototype.addEdge = function addEdge(off, par1, par2) {
    var node = _.find(this.myNodes, {id: off.regId});
    node.fromIds.push(par1.regId);
    node.fromIds.push(par2.regId);
    var nodePar1 = _.find(this.myNodes, {id: par1.regId});
    var nodePar2 = _.find(this.myNodes, {id: par2.regId});
    nodePar1.toIds.push(off.regId);
    nodePar2.toIds.push(off.regId);
    this.edges.add({from: par1.regId, to: off.regId, arrows: 'to'});
    this.edges.add({from: par2.regId, to: off.regId, arrows: 'to' });
};

iDNA.Registry.prototype.newId = function newId() {
    return this.nextId++;
};

iDNA.Registry.prototype.addOrg = function addOrg(org) {
    // add an organism that has no parents.
    var newId = this.newId();
    this.addNode({id: newId, label: org.name, birthTime: org.birthTime, color: org.color, title: org.name, font: {size:12, color:'black'}, genome: org.getGeneMap()});
    org.regId = newId;
}

iDNA.Registry.prototype.addOffpring = function addOffspring(off, par1, par2) {
    // Registration for a birth certificate
    if(par1.regId === null) { this.addOrg(par1);}
    if(par2.regId === null) { this.addOrg(par2);}
    var newId = this.newId();
    this.addNode({id: newId, label: off.name, birthTime: off.birthTime, color: off.color, title: off.name, genome: off.getGeneMap()});
    off.regId = newId;
    this.addEdge(off, par1, par2);
};

iDNA.Registry.prototype.update = function update(org) {
    if(org.regId === null) {
        this.addOrg(org);
    } else {
        this.nodes.update({id: org.regId, label: org.name, birthTime: org.birthTime, color: org.color, deathTime: org.deathTime, genome: org.getGeneMap()});
    }
};

iDNA.Registry.prototype.getAncestors = function getAncestors(id) {

    var that = this;
    var getem = function(id) {
        id = +id;   //convert any strings to numbers
        var node = _.find(that.myNodes, {id: id});
        console.log(node);
        console.log(id);
        console.log(that.myNodes);
        console.log(_.find(that.myNodes, {id: id}));
        if (typeof node !== 'undefined') {
            var arry = [];
            if (node.fromIds.length != 0) {
                arry = arry.concat(node.fromIds);
                node.fromIds.forEach(function (id) {
                    arry = arry.concat(getem(id));
                }, this);
            }
            return arry;
        }
    }
    // return a sorted array with each ancestor listed only once.
    return _.unique(getem(id).sort(function(a, b){return a-b}),true);

};

iDNA.Registry.prototype.getDescendants = function getDecendants(id) {

    var that = this;
    var getem = function(id) {
        id = +id;   //convert any strings to numbers
        var node = _.find(that.myNodes, {id: id});
        if (typeof node !== 'undefined') {
            var arry = [];
            if (node.toIds.length != 0) {
                arry = arry.concat(node.toIds);
                node.toIds.forEach(function (id) {
                    arry = arry.concat(getem(id));
                }, this);
            }
            return arry;
        }
    };
    // return a sorted array with each descendant listed only once.
    return _.unique(getem(id).sort(function(a, b){return a-b}),true);
};




/*
filter registry of ancestors of a node.
edges.get({filter: function(item) {
    return item.to == currentNode;
},
fields: ['from']
});


 */