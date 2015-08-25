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


// a pair of chromosomes.  One chromosome from each parent.  It is assumed that they are homologous, meaning the order
// of the genes are relatively the same.  If they are not, chromosomal crossover can cause genetic abnormalities in offspring.

var iDNA = iDNA || {};

iDNA.ChromosomePair = function ChromosomePair(chromo1, chromo2) {
    this.chromo1 = chromo1 || {};
    this.chromo2 = chromo2 || {};
    this.gametes = [];  //a collection of possible chromosomes these chromosomes could produce and give to offspring
};

iDNA.ChromosomePair.prototype.produceGametes = function(x) {
    // populates this.gametes with possible chromosomes this chromosomal pair would produce in Meiosis.
    // Possible swapping of genes between the original two during chromosomal crossover.
    //TODO x being the number of possible gametes to produce..will always produce at least two. Default 8
    // using Gene's mutate function to produce mutated code

    // add simple gametes
    this.gametes = [this.chromo1.piece(), this.chromo2.piece()];

    //TODO add gametes with crossover

    //add gametes with some mutation
    if(_.random(100) < iDNA.mutationRate) {
        var mutated1 = this.chromo1.piece();
        var mutated2 = this.chromo2.piece();

        _.each(mutated1.getGenes(), function(gene) {
           if (typeof gene.mutate === 'function') {
               gene.mutate.call(gene);
           }
        });
        _.each(mutated2.getGenes(), function(gene) {
            if (typeof gene.mutate === 'function') {
                gene.mutate.call(gene);
            }
        });

        this.gametes.push(mutated1, mutated2);
    }


};
/**
 * Returns a random gamete from this.gametes.
 */

iDNA.ChromosomePair.prototype.getGamete = function() {
    var max = _.size(this.gametes);
    return this.gametes[_.random(max-1)].piece();
};

iDNA.ChromosomePair.prototype.getActiveGenes = function() {
    // returns a collection of genes that are active
    // returned collection uses gene.copy to produce a clone of the genes
    // some genes can have same name if both are active
    // order of genes should be somewhat retained


    // now thinking the following
    // go through genes of chromo1, match with case insensitive to gene names on chromo2
    // isActive run on it... add gene(s) to activeGene array.. if no corresponding gene on chromo2, add it to activeGene arry
    // now we have array of active genes and any extra genes on chromo1.  Need to see if chromo2 has any extra genes
    // obtain array,c1, of gene names of chromo1 (gene names put lowercase)
    // obtain array,c2, of gene names of chromo2 (gene names put lowercase)
    // obtain _.difference(c2,c1) to array d2

    // for each item in d2, find the gene name of the gene right before in c2 (if prevGene not in activeGene, try previous gene in c2, etc, then find the previous one, etc)
    //     then find that gene name in ag and splice this name right after.

    var activeGenes = new iDNA.Chromosome;
    chromosome1 = this.chromo1;
    chromosome2 = this.chromo2;
    _.each(chromosome1.getGenes(), function(c1gene) {
        var c2gene = chromosome2.getGene(c1gene.name); //corresponding gene on chromo2

        if (c2gene != null) {
            if (c1gene.isActive(c2gene)) {
                activeGenes.addGene(c1gene.copy());
            }
            if (c2gene.isActive(c1gene)) {
                activeGenes.addGene(c2gene.copy());
            }
        } else { // no corresponding gene on chromo2 so just check if active
            if (c1gene.isActive()) {
                activeGenes.addGene(c1gene.copy());
            }
        }
    });

    var c1 = _.map(_.pluck(chromosome1.getGenes(),'name'), function(name){
        return name.toLowerCase();
    });
//    console.log('c1:' + c1);
    var c2 = _.map(_.pluck(chromosome2.getGenes(),'name'), function(name){
        return name.toLowerCase();
    });
//   console.log('c2:' + c2);
    var ag = _.map(_.pluck(activeGenes.getGenes(),'name'), function(name){
        return name.toLowerCase();
    });

    var d2 = _.difference(c2,c1);

    //TODO - find a way to approximate where extra chromo2 genes would go in activeGenes - for now - at the end

    _.each(d2, function(name){
        var d2gene = chromosome2.getGene(name);
       if(d2gene.isActive()){
           activeGenes.addGene(d2gene.copy())
       }
    });

    return activeGenes;

};
/*
 c1 = ["A","B","C","D"]
 ["A", "B", "C", "D"]
 c1.splice(1,0,"Z");
 []
 c1
 ["A", "Z", "B", "C", "D"]
 c1.splice(3,0,"F","G");
 []
 c1
 ["A", "Z", "B", "F", "G", "C", "D"]
 c1.splice([6,0].concat(["F","G"]));
 ["A", "Z", "B", "F", "G", "C", "D"]
 c1
 []
 c1 = ["A","B","C","D"]
 ["A", "B", "C", "D"]
 c1.splice([2,0].concat(["F","G"]));
 ["A", "B", "C", "D"]
 c1
 []
 c1 = ["A","B","C","D"]
 ["A", "B", "C", "D"]
 c1.splice(2,0,"F","G");
 []
 c1
 ["A", "B", "F", "G", "C", "D"]

 j1 = ["A", "B", "C", "D", "Z"]
 ["A", "B", "C", "D", "Z"]
 j2 = ["A", "E", "B", "C", "D"]
 ["A", "E", "B", "C", "D"]
 _.difference{j1, j2)
 VM3719:2 Uncaught SyntaxError: Unexpected token {
 at Object.InjectedScript._evaluateOn (<anonymous>:895:140)
 at Object.InjectedScript._evaluateAndWrap (<anonymous>:828:34)
 at Object.InjectedScript.evaluate (<anonymous>:694:21)InjectedScript._evaluateOn @ VM2695:895InjectedScript._evaluateAndWrap @ VM2695:828InjectedScript.evaluate @ VM2695:694
 _.difference(j1, j2)
 ["Z"]
 _.difference(j2, j1)
 ["E"]
 _.union(j1,j2)
 ["A", "B", "C", "D", "Z", "E"]
 _.intersection(j1,j2)
 ["A", "B", "C", "D"]
 */