/**
 * Created by jerod on 7/2/2015.
 */
/*
 describe("test", function() {
 it(" ", function() {
     expect().toBe();
     });
 });
 */

describe("iDNA is created", function() {

    it("it exists", function() {
        expect(iDNA).not.toBe(null);
    });

});

describe("iDNA.Gene: Testing codeValue() and isActive() of gene", function() {

    beforeEach(function() {
        gene1 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140}, false, function(){return null;}, function(){return this.code.r;});
        gene2 = new iDNA.Gene('color', 'phys', {r:20,g:0,b:160}, false, function(){return null;}, function(){return this.code.r;});

    });


    it("if gene1 has codevalue > gene2's codevalue, isActive should return true", function() {
        expect(gene1.isActive(gene2)).toBe(true);
    });
    it("if gene2 has codevalue < gene1's codevalue, isActive should return false", function() {
        expect(gene2.isActive(gene1)).toBe(false);
    });
    it("if gene1 has codevalue = to gene2 codeValue,isActive should return true", function() {
        gene2.code = {r:40,g:0,b:140};
        expect(gene1.isActive(gene2)).toBe(true);
    });
    it("if gene1 has codevalue and gene2 does not, gene1.isActive() should return true", function() {
        expect(gene1.isActive()).toBe(true);
    });
    it("if gene1 has default codeValue(), gene1.isActive() should return false", function() {
        gene1 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140}, false, function(){return null;});
        expect(gene1.isActive()).toBe(false);
    });
    it("if gene1 has default codeValue() and gene2 has codeValue(), gene2.isActive() should return true", function() {
        gene1 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140}, false, function(){return null;});
        expect(gene2.isActive(gene1)).toBe(true);
    });
    it("if gene1 has no express function, gene1.isActive() should return false", function() {
        gene1 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140});
        expect(gene1.isActive()).toBe(false);
    });
});

describe("iDNA.Gene: Testing gene.copy function to produce a copy of the gene", function() {
    beforeEach(function() {
        gene1 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140}, false, function(){return null;}, function(){return this.code.r;});
        gene2 = new iDNA.Gene('color', 'phys', {r:20,g:0,b:160}, false, function(){return null;}, function(){return this.code.r;});

    });

    it("if gene1 is cloned to gene3, gene3.code literals can be changed without affecting gene1.code", function(){
        var gene3 = gene1.copy();
        expect(gene3.name === gene1.name).toBe(true);
        gene3.code.r = 80;
        expect(gene3.code.r).toBe(80);
        expect(gene1.code.r).toBe(40);
    });
    it("if a gene with gene.code containing sub-objects is cloned, changes to sub-objects on copy does not affect original gene.code", function() {
        var gene3 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140,sub:{r:50,g:40}}, false, function(){return null;}, function(){return this.code.r;});
        var gene4 = gene3.copy();
        expect(gene4.name === gene3.name);
        gene4.code.sub.r = 80;
        expect(gene4.code.sub.r).toBe(80);
        expect(gene3.code.sub.r).toBe(50);
    });

    it("if sub-object gene.code contains boolean values, they are transferred successfully", function(){
        var gene3 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140,sub:{r:50,g:40,bool:false}}, false, function(){return null;}, function(){return this.code.r;});
        var gene4 = gene3.copy();
        expect(gene4.name === gene3.name);
        expect(gene4.code.sub.bool).toBe(false);
        gene4.code.sub.bool = true;
        expect(gene4.code.sub.bool).toBe(true);
        expect(gene3.code.sub.bool).toBe(false);
    });

    it("if sub-object gene.code contains functions, they are transferred successfully", function(){
        var gene3 = new iDNA.Gene('color', 'phys', {r:40,g:0,b:140,sub:{r:50,g:40,func:function(){return true;}}}, false, function(){return null;}, function(){return this.code.r;});
        var gene4 = gene3.copy();
        expect(gene4.name === gene3.name);
        expect(gene4.code.sub.func()).toBe(true);
        gene4.code.sub.func = function(){return false;};
        expect(gene4.code.sub.func()).toBe(false);/**/
        expect(gene3.code.sub.func()).toBe(true);
    });

    it("if gene.code is {}, no errors", function(){
        gene1.code = {};
        var gene3 = gene1.copy();
        expect(gene3.name == gene1.name).toBe(true);
        expect(Object.keys(gene3.code).length).toBe(0);
    })
});