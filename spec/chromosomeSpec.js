/**
 * Created by jerod on 7/3/2015.
 */
/*
 describe("test", function() {
 it(" ", function() {
 expect().toBe();
 });
 });
 */

function isArraysEqual(a1,a2,orderMatters) {
    orderMatters = orderMatters != null ? orderMatters : true;
    if (orderMatters) {
        return _(a1).isEqual(a2);
    } else {
        return _.isEmpty(_.difference(a1, a2)) && _.isEmpty(_.difference(a2, a1));
    }
}


describe("Testing Testing helper functions", function() {
   it("Testing isArrayEquals with multiple arrays", function() {
      expect(isArraysEqual([1,2,3,4,5],[1,2,3,4,5])).toBe(true);
       expect(isArraysEqual(["a","b","c","3"],["a","b","c","3"])).toBe(true);
       expect(isArraysEqual(["a","b","c","3"],["a","b","c","3"],false)).toBe(true);
       expect(isArraysEqual(["a","c","b","3"],["a","b","c","3"],false)).toBe(true);
       expect(isArraysEqual(["a","c","b","3"],["a","b","c","3"])).toBe(false);
       expect(isArraysEqual(["a","b","b","3"],["a","b","c","3"])).toBe(false);
       expect(isArraysEqual(["a","b","b","3"],["a","b","c","3"],false)).toBe(false);
       expect(isArraysEqual(["a","b","c"],["a","b","c","3"],false)).toBe(false);
       expect(isArraysEqual(["a","b","c"],["a","b","c","3"])).toBe(false);
   });

});

describe("iDNA.Chromosome: Testing addGene function", function() {
    beforeEach(function() {
        gene1 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140}, false, function(){return null;}, function(){return this.code.r;});
        gene2 = new iDNA.Gene('color2', 'phys', {r:20,g:0,b:160}, false, function(){return null;}, function(){return this.code.r;});
        chrom1 = new iDNA.Chromosome();
    });

    it("returns true when a gene is added", function() {
        expect(chrom1.addGene(gene1)).toBe(true);
    });
    it("returns false when a non-gene object is added", function() {
        expect(chrom1.addGene({name:'test'})).toBe(false);
    });
    it("returns true when a second gene is added and length of Chromosome.genes increases by one", function() {
        expect(chrom1.addGene(gene1)).toBe(true);
        expect(chrom1.addGene(gene2)).toBe(true);
        expect(chrom1.genes.length == 2).toBe(true);
    });
    it("returns true when gene with same name is added and length of Chromosome.genes stays the same", function() {
        expect(chrom1.addGene(gene1)).toBe(true);
        expect(chrom1.addGene(gene1)).toBe(true);
        expect(chrom1.genes.length == 1).toBe(true);
    });
});

describe("iDNA.Chromosome: Testing delGene function", function() {
    beforeEach(function () {
        gene1 = new iDNA.Gene('color', 'phys', {r: 40, g: 0, b: 140}, false, function () {
            return null;
        }, function () {
            return this.code.r;
        });
        gene2 = new iDNA.Gene('color2', 'phys', {r: 20, g: 0, b: 160}, false, function () {
            return null;
        }, function () {
            return this.code.r;
        });
        chrom1 = new iDNA.Chromosome();
    });

    it("delGene reduces Chomosomes.genes by 1", function(){
        chrom1.addGene(gene1);
        chrom1.addGene(gene2);
        expect(chrom1.genes.length == 2).toBe(true);
        chrom1.delGene(gene1);
        expect(chrom1.genes.length == 1).toBe(true);
    });

});
describe("iDNA.Chromosome: Testing size function", function() {
    beforeEach(function () {
        gene1 = new iDNA.Gene('color', 'phys', {r: 40, g: 0, b: 140}, false, function () {
            return null;
        }, function () {
            return this.code.r;
        });
        gene2 = new iDNA.Gene('color2', 'phys', {r: 20, g: 0, b: 160}, false, function () {
            return null;
        }, function () {
            return this.code.r;
        });
        chrom1 = new iDNA.Chromosome();
    });
    it("Empty Chromosome should have size 0", function() {
       expect(chrom1.size()).toBe(0);
    });
    it("Using addGene and delGene on Chromosome and confirming size increases and decreases accordingly", function() {
        chrom1.addGene(gene1);
        expect(chrom1.size()).toBe(1);
        chrom1.addGene(gene2);
        expect(chrom1.size()).toBe(2);
        chrom1.delGene(gene1);
        expect(chrom1.size()).toBe(1);
        chrom1.delGene(gene1);
        expect(chrom1.size()).toBe(1);
        chrom1.delGene(gene2);
        expect(chrom1.size()).toBe(0);
    });
});
function init1 () {
    gene1 = new iDNA.Gene('color', 'phys', {r: 40, g: 0, b: 140}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene2 = new iDNA.Gene('color2', 'phys', {r: 20, g: 0, b: 160}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene3 = new iDNA.Gene('color3', 'phys', {r: 40, g: 0, b: 140}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene4 = new iDNA.Gene('color4', 'phys', {r: 20, g: 0, b: 160}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    chrom1 = new iDNA.Chromosome();
    chrom1.addGene(gene1);
    chrom1.addGene(gene2);
    chrom1.addGene(gene3);
    chrom1.addGene(gene4);
}
    describe("iDNA.Chromosome: Testing copy function", function() {
        beforeEach(init1);


    it("Copy produces a chromosome with the same length", function() {
        var chrom2 = chrom1.copy();
        expect(chrom2.size()).toBe(chrom1.size());
    });


});

describe("iDNA.Chromosome: Testing piece function", function() {
    beforeEach(init1);


    it("Piece() produces a copy of the full chromosome", function() {
        var chrom2 = chrom1.piece();
        expect(chrom2.size()).toBe(chrom1.size());
        expect(isArraysEqual(_.pluck(chrom2.genes,'name'), _.pluck(chrom1.genes,'name'))).toBe(true);
    });

    it("Piece(1,1) produces a chromosome with a single gene using second gene of original Chromosome", function() {
       var chrom2 = chrom1.piece(1,1);
        expect(chrom2.size()).toBe(1);
        expect(chrom2.genes[0].name == chrom1.genes[1].name).toBe(true);
    });
    it("Piece(1,2) produces a chromosome with two gene using second gene and third of original Chromosome", function() {
        var chrom2 = chrom1.piece(1,2);
        expect(chrom2.size()).toBe(2);
        expect(chrom2.genes[0].name == chrom1.genes[1].name).toBe(true);
        expect(chrom2.genes[1].name == chrom1.genes[2].name).toBe(true);
    });
    it("Piece(1,3) produces a chromosome with two gene using second gene and third of original Chromosome", function() {
        var chrom2 = chrom1.piece(1,3);
        expect(chrom2.size()).toBe(3);
        expect(chrom2.genes[0].name == chrom1.genes[1].name).toBe(true);
        expect(chrom2.genes[1].name == chrom1.genes[2].name).toBe(true);
        expect(chrom2.genes[2].name == chrom1.genes[3].name).toBe(true);

    });
});

describe("iDNA.Chromosome.getGene() function", function() {
    beforeEach(init1);

    it("Returns the first gene if no parameter is given", function() {
        expect(chrom1.getGene().name).toBe(gene1.name);
    });
    it("Returns the second gene if 1 is the parameter", function(){
        expect(chrom1.getGene(1).name).toBe(gene2.name);
    });
    it("Returns null if parameter > size of chromosome.", function(){
        expect(99 > chrom1.size()).toBe(true);
        expect(chrom1.getGene(99) == null).toBe(true);
    });
    it("Returns null if number less than zero is the parameter", function(){
        expect(chrom1.getGene(-1) == null).toBe(true);
    });
    it("Returns gene2 if parameter is gene2.name", function(){
        expect(chrom1.getGene(gene2.name).name).toBe(gene2.name);
    });
    it("Returns gene4 if parameter is gene4.name", function(){
        expect(chrom1.getGene(gene4.name).name).toBe(gene4.name);
    });
    //TODO Do we want to make name of gene lowercase when searching to make case insensitive.
    it("Returns null if parameter is string and chromosome does not have gene", function(){
        expect(chrom1.getGene('HotTamale')).toBe(null);
    });
});