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

iDNA.Organism = function Organism(name, generation, chromosomePair) {
    //ChromosomePair contains the entire genome of the organism and is used to pass info to offspring.
    //activeGenes contains a subset of the genome with only active genes.
    //changes to activeGenes does not change the chromosomePair

    this.name = name || "noName";
    this.generation = generation || 1;
    this.chromosomePair = chromosomePair || null;
    this.matured = false;
    this.activeGenes = null;
    this.regId = null;
    this.birthTime = Math.floor(Date.now() / 1000);
    this.deathTime = null;
    this.puberty = 3;
    this.age = 0;
    this.lifespan = 6;
    this.mortalityRateAfter = 90;  // chance of death after lifespan reached.
    this.maxOffspringPerMating = 2;
    if(this.chromosomePair !== null) { this.grow();}
};
iDNA.Organism.prototype.reset = function reset() {
    this.generation = 1;
    this.matured = false;
    this.activeGenes = null;
    this.regId = null;
    this.birthTime = Math.floor(Date.now() / 1000);
    this.deathTime = null;
    this.age = 0;
    if(this.chromosomePair !== null) {this.grow();}
}
iDNA.Organism.prototype.express = function express(type) {
    var that = this;
    var genes = this.activeGenes.getGenes();

    if (typeof type !== null) {
        genes = _.where(genes, {type: type});
    }
    _.each(genes, function(gene) {
        gene.express(that);
    });

};

iDNA.Organism.prototype.grow = function grow() {
    // go through genes to get a list of active gene.code and gene.express
    this.activeGenes = this.chromosomePair.getActiveGenes();
};

iDNA.Organism.prototype.mature = function mature() {
    //prepare for reproduction
    //for now only one Chromosome pair.
    this.chromosomePair.produceGametes();
    this.matured = true;
};

iDNA.Organism.prototype.getGametes = function getGametes() {
    // for now only a single chromosome pair
    if (!this.matured) { this.mature();}
    return this.chromosomePair.getGamete()
};

iDNA.Organism.prototype.getGeneMap = function getGeneMap() {
    var that = this;
    if(this.activeGenes === null) {this.grow();}
    var ag = _.map(_.pluck(this.activeGenes.getGenes(),'name'), function(name){
        return name;
    });
    var geneMap = {};
    geneMap['chrom1'] = [];
    _.each(this.chromosomePair.chromo1.genes, function(gene){
       geneMap['chrom1'].push({
           name: gene.name,
           code: JSON.stringify(gene.code), //any functions will not show
           express: gene.express.toString(),
           type: gene.type,
           active: _.contains(ag, gene.name)
           });
    });
    geneMap['chrom2'] = [];
    _.each(this.chromosomePair.chromo2.genes, function(gene){
        geneMap['chrom2'].push({
            name: gene.name,
            code: JSON.stringify(gene.code), //any functions will not show
            express: gene.express.toString(),
            type: gene.type,
            active: _.contains(ag, gene.name)
        });
    });
    geneMap['name'] = this.name;
    geneMap['birthTime'] = this.birthTime;
    geneMap['deathTime'] = this.deathTime;
    geneMap['generation'] = this.generation;
    geneMap['activeGenes'] = ag.join(',');
    return JSON.stringify(geneMap);
/*
    var chrom1 = _.pluck(this.chromosomePair.chromo1.genes, 'name');
    var chrom2 = _.pluck(this.chromosomePair.chromo2.genes, 'name');
    return chrom1.join('.') + '\n' + chrom2.join('.');
*/

};
