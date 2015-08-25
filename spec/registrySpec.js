/**
 * Created by jerod on 7/9/2015.
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

describe("iDNA.Registry:", function(){
    beforeEach(init1);

    it("addOrg() adds a node to nodes with unique id's, updates org.regId, and birthTime is filled in", function() {
        var org1 = new iDNA.Organism('A',0,chromPair);
        var org2 = new iDNA.Organism('B',0,chromPair);
        console.log(org1);
        var theReg = new iDNA.Registry();
        expect(theReg.nextId).toBe(1);
        theReg.addOrg(org1);
        expect(theReg.nextId).toBe(2);
        expect(org1.regId).toBe(1);
    })
    it("addOffspring() adds a node to nodes with unique id's, updates org.regId, and birthTime is filled in, if parent not registered-it will be first, edges are added pointing to parents", function() {
        var org1 = new iDNA.Organism('A',0,chromPair);
        var org2 = new iDNA.Organism('B',0,chromPair);
        console.log(org1);
        var theReg = new iDNA.Registry();
        expect(theReg.nextId).toBe(1);
        theReg.addOrg(org1);
        expect(theReg.nextId).toBe(2);
        expect(org1.regId).toBe(1);
        var org3 = new iDNA.Organism('C',1,chromPair);
        theReg.addOffpring(org3, org1, org2);
        expect(org3.regId).toBe(3);
        expect(org2.regId).toBe(2);
        console.log(theReg);
    })
});

