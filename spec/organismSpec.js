/**
 * Created by jerod on 7/6/2015.
 */

/*
 describe("test", function() {
 it(" ", function() {
 expect().toBe();
 });
 });
 */
var org1, org2;

function testOrganisms() {
    gene1 = new iDNA.Gene('A', 'phys', {r: 40, g: 0, b: 140}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene2 = new iDNA.Gene('B', 'phys', {r: 20, g: 0, b: 160}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene3 = new iDNA.Gene('C', 'phys', {r: 40, g: 0, b: 140}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene4 = new iDNA.Gene('D', 'phys', {r: 20, g: 0, b: 160}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene5 = new iDNA.Gene('a', 'phys', {r: 140, g: 0, b: 40}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene6 = new iDNA.Gene('b', 'phys', {r: 120, g: 0, b: 60}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene7 = new iDNA.Gene('c', 'phys', {r: 140, g: 0, b: 40}, false, function () {
        return null;
    }, function () {
        return this.code.r;
    });
    gene8 = new iDNA.Gene('d', 'phys', {r: 110, g: 0, b: 60}, false, function () {
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

    org1 = new iDNA.Organism('A',0,chromPair);
    org2 = new iDNA.Organism('B',0,chromPair);
}

