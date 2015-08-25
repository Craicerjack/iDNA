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

gene1 = new iDNA.Gene('a', 'phys', {r: 40, g: 0, b: 140}, false, function (o) {
    o.color = 'rgb(' + this.code.r + ',' + this.code.g + ','+ this.code.b +')';
}, function () {
    return this.code.r;
});
gene2 = new iDNA.Gene('b', 'phys', {r: 20, g: 0, b: 160}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene3 = new iDNA.Gene('c', 'phys', {r: 40, g: 0, b: 140}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene4 = new iDNA.Gene('d', 'phys', {r: 20, g: 0, b: 160}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene5 = new iDNA.Gene('A', 'phys', {r: 140, g: 0, b: 40}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene6 = new iDNA.Gene('B', 'phys', {r: 120, g: 0, b: 60}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene7 = new iDNA.Gene('C', 'phys', {r: 140, g: 0, b: 40}, false, function () {
    return null;
}, function () {
    return this.code.r;
});
gene8 = new iDNA.Gene('D', 'phys', {r: 110, g: 0, b: 60}, false, function () {
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
org1.grow();
org2.grow();
org1.mature();
org2.mature();

organisms = [];
organisms.push(org1,org2);
console.log('size of prepopulation: ' + _.size(organisms));
registry = new iDNA.Registry();

_.defer(iDNA.world(organisms, registry, 5, function() {console.log('iDNA.world is done.'); console.log(registry);}));


