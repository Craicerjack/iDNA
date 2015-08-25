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


$('.output').html('in the beginning...');
gene1 = new iDNA.Gene('a', 'phys', {r: 40, g: 0, b: 140}, false, function () {
    return null;
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
console.log(organisms);
//  get size of organisms
//     random index...splice out orof organisms into mating array
//     random index-1 ...splice out of organisms into mating array
//     if organisms even and not zero, then repeat
//   mate organisms..produce 4 offspring each or random..push to organism array
// repeat x number of times
var nodes = new vis.DataSet();
var edges = new vis.DataSet();

mating = [];
content = $('.output');
content.append('<ul></ul>');
generation = content.find('ul');
var id = 2;

org1.visId = id++;
org2.visId = id++;
nodes.add([{id: 1, label: 'root'},{id : org1.visId, label: org1.name},{id:org2.visId, label: org2.name}]);
edges.add([{from: 1, to: org1.visId}, {from: 1, to: org2.visId}]);
for(var i = 0; i < 5; i++){
   generation.append('<li class="gen'+i+'">Generation '+ i+'<ul class="matings"></ul></li>');
    while (_.size(organisms) >=2) {
        index = _.size(organisms);
        firstIndex = _.random(index - 1);
        secondIndex = _.random(index - 2);
        mating.push(organisms.splice(firstIndex, 1)[0]);
        mating.push(organisms.splice(secondIndex, 1)[0]);
    }
    couples = _.size(mating) / 2;
    for(var j = 0; j < couples; j++) {
        var mate1 = mating[j*2];
        var mate2 = mating[j*2+1];
        generation.find('.gen' + i + ' .matings').append('<li id="c'+i+j+'">'+mate1.name + 'x' + mate2.name + '<ul class="offspring"></ul></li>');
        var $couple = generation.find('#c'+i+j);
        for(var k = 0; k < 2 +_.random(3); k++){

            mate1.mature();
            mate2.mature();
            var offspring = iDNA.mate(mate1,mate2, i);
            offspring.visId = id++;
            nodes.add([{id: offspring.visId , label : offspring.name}]);
            edges.add([{from: mate1.visId, to: offspring.visId,  arrows:'to'}, {from: mate2.visId, to: offspring.visId,  arrows:'to'}]);
            $couple.find('.offspring').append('<li id="m'+i+j+k+'">' + offspring.name + ' ' + offspring.getGeneMap() +'</li>');
            organisms.push(offspring);
        }
    }
    console.log('generation: '+i);
    console.log('number of organisms: ' + _.size(organisms));
    mating = [];
}
