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

var iDNA = iDNA || {};

iDNA.Chromosome = function Chromosome() {
    // object containing gene objects.  Name of gene is a property of this object and points to the gene object.
    this.genes = [];
};

iDNA.Chromosome.prototype.getGenes = function getGenes() {
    return this.genes;
};

/**
 * getGene(x)
 * Returns gene at location x or if x is a string, returns gene name equal to string.
 * @param x (string) or (int)
 * @returns {*} null if not found or gene
 */
iDNA.Chromosome.prototype.getGene = function getGene(x){
    // if x is not passed, set to 0 to get first gene
    x = x || 0;
    var gene = undefined;
    if(typeof x === 'string') {
        gene = _.find(this.getGenes(), function(gene) {
            return gene.name.toLowerCase() === x.toLowerCase();
        });
    } else {
        if (x < this.size() && x >= 0) { //make sure x is within range
            gene = this.genes[x]
        }
    }
    return typeof gene === 'undefined' ? null : gene;
};

/**
 * addGene(gene)
 * Adds gene to array of genes.  Checks if already exists
 * @param gene
 * @returns {boolean}
 */
iDNA.Chromosome.prototype.addGene = function addGene(gene) {

    if(gene instanceof iDNA.Gene){
        var index = _.findIndex(this.genes,{name: gene.name});
        if(index == -1){
            this.genes.push(gene);
        } else {
            this.genes[index] = gene; //replace gene if gene with same name already exists
        }
        return true;
    } else {
        return false;
    }
};

//TODO Order may matter - may need a way to access in the order they were put in and a way to move/splice them around.
//TODO add Spec tests that confirm how we want the case sensitivity of gene names and that it works with all functions using gene.name
/**
 * delGene(gene)
 * Removes gene contained on this Chromosome
 * @param gene
 */
//TODO - do we remove gene if case doesn't match?

iDNA.Chromosome.prototype.delGene = function delGene(gene) {
    if(gene instanceof iDNA.Gene) {
        this.genes = _.reject(this.genes, {name: gene.name});
    }

};

/**
 * size()
 * Returns number of genes on this chromosome
 * @returns {*}
 */
iDNA.Chromosome.prototype.size = function size() {
    return _.size(this.genes);
};

/**
 * copy()
 * Returns a new chromosome with copy of all genes.
 * @returns {iDNA.Chromosome}
 */
iDNA.Chromosome.prototype.copy = function copy() {
    /* This was first way, but then implemented piece()
     var copy = new iDNA.Chromosome();
     _.each(this.genes, function(gene){ copy.addGene(gene.copy());})
     return copy;*/
    return this.piece();
};

/**
 * piece(j, k)
 * Returns a new chromosome with copies of genes on current chromosome.
 *
 * @param j - beginning gene to start copy.  0 is default and first gene on chromosome
 * @param k - ending gene to stop copy. last gene number on chromosome is the default.
 * @returns {iDNA.Chromosome}
 */
iDNA.Chromosome.prototype.piece = function piece(j, k) {
    //returns a new Chromosome containing a copy of current chromosome's genes in the range i thru k
    j = j == null ? 0 : j;
    var currentSize = this.size();
    k = k == null ? currentSize-1 : k;

    var piece = new iDNA.Chromosome();

    if (j > currentSize || j < 0 || k < 0) {return piece;} //empty piece

    k = k < currentSize ? k : currentSize-1;

    for (var i=j; i <= k; i++) {
        piece.addGene(this.genes[i].copy());
    }
    return piece;
};

