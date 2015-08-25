/**
 * Created by jerod on 7/6/2015.
 */

function init1() {
    gene1 = new iDNA.Gene('Color', 'phys', {r: 40, g: 0, b: 140}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene2 = new iDNA.Gene('Color2', 'phys', {r: 20, g: 0, b: 160}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene3 = new iDNA.Gene('Color3', 'phys', {r: 40, g: 0, b: 140}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene4 = new iDNA.Gene('Color4', 'phys', {r: 20, g: 0, b: 160}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene5 = new iDNA.Gene('color', 'phys', {r: 140, g: 0, b: 40}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene6 = new iDNA.Gene('color2', 'phys', {r: 120, g: 0, b: 60}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene7 = new iDNA.Gene('color3', 'phys', {r: 140, g: 0, b: 40}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene8 = new iDNA.Gene('color4', 'phys', {r: 110, g: 0, b: 60}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    chrom1 = new iDNA.Chromosome();
    chrom1.addGene(gene1);
    chrom1.addGene(gene2);
    chrom1.addGene(gene3);
    chrom1.addGene(gene4);
    chrom2 = new iDNA.Chromosome();
    chrom2.addGene(gene5);
    chrom2.addGene(gene6);
    chrom2.addGene(gene7);
    chrom2.addGene(gene8);
    chromPair = new iDNA.ChromosomePair(chrom1,chrom2);
};
/*
describe("iDNA ChromosomePair: produceGametes", function() {
    beforeEach(init1);

    it("Testing produceGametes() should cause gametes array to be 4", function() {
        expect(_.size(chromPair.gametes)).toBe(0);
       chromPair.produceGametes();
        expect(_.size(chromPair.gametes)).toBe(4);
    });

});*/

describe("iDNA ChromosomePair: getActiveGenes", function() {

    it("Returns 4 genes, when each chromosome contains 4 genes with 4 corresponding genes on other chromosome and one gene of each will be active", function() {
        init1();
        var activeGenes = chromPair.getActiveGenes();
        expect(activeGenes.size()).toBe(4);
    });
    it("Returns chromo2 genes if 4 genes with 4 corresponding genes where all genes of chromo2 have higher codevalue", function() {
        init1();
        var activeGenes = chromPair.getActiveGenes();
        expect(activeGenes.size()).toBe(4);
        expect(activeGenes.getGene(0).name).toBe(gene5.name);
        expect(activeGenes.getGene(1).name).toBe(gene6.name);
        expect(activeGenes.getGene(2).name).toBe(gene7.name);
        expect(activeGenes.getGene(3).name).toBe(gene8.name);
        expect(activeGenes.getGene(0).name !== gene1.name).toBe(true);
        expect(activeGenes.getGene(1).name !== gene2.name).toBe(true);
        expect(activeGenes.getGene(2).name !== gene3.name).toBe(true);
        expect(activeGenes.getGene(3).name !== gene4.name).toBe(true);
    });
    it("Returns correct genes if codeValue() is higher on either chromosome", function() {
        init1();
        chrom1.getGene(0).code.r = 200;   // make codevalue of gene1 on chromo1 be higher than corres. gene on chromo2
        chrom1.getGene(2).code.r = 200;   // same deal here
        var activeGenes = chromPair.getActiveGenes();
        expect(activeGenes.size()).toBe(4);
        expect(activeGenes.getGene(0).name).toBe(gene1.name);
        expect(activeGenes.getGene(1).name).toBe(gene6.name);
        expect(activeGenes.getGene(2).name).toBe(gene3.name);
        expect(activeGenes.getGene(3).name).toBe(gene8.name);
    });
    //TODO function to splice a gene into chromosome other than addGene which adds at end.
    it("Returns correct genes in correct order if chromo1 contains an extra gene", function(){
        init1();
        var gene9 = gene1.copy();
        gene9.name = "NewGene";
        var chrom3 = new iDNA.Chromosome();
        chrom3.addGene(gene1);
        chrom3.addGene(gene9);
        chrom3.addGene(gene2);
        chrom3.addGene(gene3);
        chrom3.addGene(gene4);
        var chromPair2 = new iDNA.ChromosomePair(chrom3,chrom2);

        var activeGenes = chromPair2.getActiveGenes();
        expect(activeGenes.size()).toBe(5);
        expect(activeGenes.getGene(0).name).toBe(gene5.name);
        expect(activeGenes.getGene(1).name).toBe(gene9.name);
        expect(activeGenes.getGene(2).name).toBe(gene6.name);
        expect(activeGenes.getGene(3).name).toBe(gene7.name);
        expect(activeGenes.getGene(4).name).toBe(gene8.name);
    });
    it("Returns correct genes in correct order if chromo1 contains two extra genes", function(){
        init1();
        var gene9 = gene1.copy();
        var gene10 = gene1.copy();
        gene9.name = "NewGene";
        gene10.name = "NewGene2";
        var chrom3 = new iDNA.Chromosome();
        chrom3.addGene(gene1);
        chrom3.addGene(gene9);
        chrom3.addGene(gene2);
        chrom3.addGene(gene3);
        chrom3.addGene(gene10);
        chrom3.addGene(gene4);
        var chromPair2 = new iDNA.ChromosomePair(chrom3,chrom2);

        var activeGenes = chromPair2.getActiveGenes();
        expect(activeGenes.size()).toBe(6);
        expect(activeGenes.getGene(0).name).toBe(gene5.name);
        expect(activeGenes.getGene(1).name).toBe(gene9.name);
        expect(activeGenes.getGene(2).name).toBe(gene6.name);
        expect(activeGenes.getGene(3).name).toBe(gene7.name);
        expect(activeGenes.getGene(4).name).toBe(gene10.name);
        expect(activeGenes.getGene(5).name).toBe(gene8.name);
    });
    it("Returns correct genes in correct order if chromo1 contains two extra genes: one at beginning and one at end", function(){
        init1();
        var gene9 = gene1.copy();
        var gene10 = gene1.copy();
        gene9.name = "NewGene";
        gene10.name = "NewGene2";
        var chrom3 = new iDNA.Chromosome();
        chrom3.addGene(gene9);
        chrom3.addGene(gene1);
        chrom3.addGene(gene2);
        chrom3.addGene(gene3);
        chrom3.addGene(gene4);
        chrom3.addGene(gene10);
        var chromPair2 = new iDNA.ChromosomePair(chrom3,chrom2);

        var activeGenes = chromPair2.getActiveGenes();
        expect(activeGenes.size()).toBe(6);
        expect(activeGenes.getGene(0).name).toBe(gene9.name);
        expect(activeGenes.getGene(1).name).toBe(gene5.name);
        expect(activeGenes.getGene(2).name).toBe(gene6.name);
        expect(activeGenes.getGene(3).name).toBe(gene7.name);
        expect(activeGenes.getGene(4).name).toBe(gene8.name);
        expect(activeGenes.getGene(5).name).toBe(gene10.name);
    });
    it("Returns correct genes in correct order if chromo2 of Pair contains an extra gene - currently extra genes on chromo2 are appended to the end of activeGenes", function(){
        init1();
        var gene9 = gene1.copy();
        gene9.name = "NewGene";
        var chrom3 = new iDNA.Chromosome();
        chrom3.addGene(gene1);
        chrom3.addGene(gene9);
        chrom3.addGene(gene2);
        chrom3.addGene(gene3);
        chrom3.addGene(gene4);
        var chromPair2 = new iDNA.ChromosomePair(chrom2,chrom3);

        var activeGenes = chromPair2.getActiveGenes();
        expect(activeGenes.size()).toBe(5);
        expect(activeGenes.getGene(0).name).toBe(gene5.name);
        expect(activeGenes.getGene(1).name).toBe(gene6.name);
        expect(activeGenes.getGene(2).name).toBe(gene7.name);
        expect(activeGenes.getGene(3).name).toBe(gene8.name);
        expect(activeGenes.getGene(4).name).toBe(gene9.name);
    });
    it("Returns correct genes in correct order if chromo2 contains two extra genes - extras placed at end", function(){
        init1();
        var gene9 = gene1.copy();
        var gene10 = gene1.copy();
        gene9.name = "NewGene";
        gene10.name = "NewGene2";
        var chrom3 = new iDNA.Chromosome();
        chrom3.addGene(gene1);
        chrom3.addGene(gene9);
        chrom3.addGene(gene2);
        chrom3.addGene(gene3);
        chrom3.addGene(gene10);
        chrom3.addGene(gene4);
        var chromPair2 = new iDNA.ChromosomePair(chrom2,chrom3);

        var activeGenes = chromPair2.getActiveGenes();
        expect(activeGenes.size()).toBe(6);
        expect(activeGenes.getGene(0).name).toBe(gene5.name);
        expect(activeGenes.getGene(1).name).toBe(gene6.name);
        expect(activeGenes.getGene(2).name).toBe(gene7.name);
        expect(activeGenes.getGene(3).name).toBe(gene8.name);
        expect(activeGenes.getGene(4).name).toBe(gene9.name);
        expect(activeGenes.getGene(5).name).toBe(gene10.name);
    });
    it("Returns correct genes in correct order if chromo1 and chromo2 contains two extra genes - extras on chromo2 placed at end", function(){
        init1();
        var gene9 = gene1.copy();
        var gene10 = gene1.copy();
        var gene11 = gene1.copy();
        var gene12 = gene1.copy();
        gene9.name = "NewGene";
        gene10.name = "NewGene2";
        gene11.name = "NewGene3";
        gene12.name = "NewGene4";
        var chrom3 = new iDNA.Chromosome();
        var chrom4 = new iDNA.Chromosome();
        chrom3.addGene(gene1);
        chrom3.addGene(gene9);
        chrom3.addGene(gene2);
        chrom3.addGene(gene3);
        chrom3.addGene(gene10);
        chrom3.addGene(gene4);
        chrom4.addGene(gene11);
        chrom4.addGene(gene5);
        chrom4.addGene(gene12);
        chrom4.addGene(gene6);
        chrom4.addGene(gene7);
        chrom4.addGene(gene8);

        var chromPair2 = new iDNA.ChromosomePair(chrom3,chrom4);

        var activeGenes = chromPair2.getActiveGenes();
        expect(activeGenes.size()).toBe(8);
        expect(activeGenes.getGene(0).name).toBe(gene5.name);
        expect(activeGenes.getGene(1).name).toBe(gene9.name);
        expect(activeGenes.getGene(2).name).toBe(gene6.name);
        expect(activeGenes.getGene(3).name).toBe(gene7.name);
        expect(activeGenes.getGene(4).name).toBe(gene10.name);
        expect(activeGenes.getGene(5).name).toBe(gene8.name);
        expect(activeGenes.getGene(6).name).toBe(gene11.name);
        expect(activeGenes.getGene(7).name).toBe(gene12.name);
    });
});