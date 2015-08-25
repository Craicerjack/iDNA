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
iDNA.nameTracker = [];  // used in mate to help in numbering child organisms
iDNA.mutationRate = 50;
//TODO make as class.  needs to reset this if multiple calls to iDNA.world maybe put in TestTube

iDNA.TestTube = function TestTube() {
    this.batchId = new Date().toISOString();  //unique ID
    this.registry = new iDNA.Registry(); //registry of all organisms alive and dead
    this.organisms = [];  // array of current alive organisms
    this.generation = 1; // how many generations in the tube
    this.epoch = 0; //each full loop is one epoch
    this.stopped = false;
    //These are for state to show in views..maybe put this in another object later
    this.selectedNode1 = {};
    this.selectedNode2 = {};
    this.population = 0;
    this.dead = 0;
    this.growth = [];  //population per epoch { epoch, population }
    this.loopSpeed = []; //loop speed in ms per epoch { epoch, ms (milliseconds) }*/
    //for visjs
    this.visGrowth = new vis.DataSet();
    this.visLoopSpeed = new vis.DataSet();
    //TODO - functions to save / load registry/organisms from file
};
iDNA.TestTube.prototype.addGrowth = function addGrowth(obj) {
    this.growth.push(obj);
    this.visGrowth.add({x: obj.epoch, y: obj.population});
};

iDNA.TestTube.prototype.addLoopSpeed = function addLoopSpeed(obj){
    this.loopSpeed.push(obj);
    this.visLoopSpeed.add({x: obj.epoch, y: obj.ms});
};

iDNA.mate = function mate(org1, org2,i) {
    if (org1 instanceof iDNA.Organism && org2 instanceof iDNA.Organism) {
        var chromosomePair = new iDNA.ChromosomePair(org1.getGametes(), org2.getGametes());
        if(typeof iDNA.nameTracker[org1.name+org2.name] !== 'number'){
            iDNA.nameTracker[org1.name+org2.name] = 0;
        }
        var a = org1.name.indexOf('_') + 1;
        var b = org2.name.indexOf('_') + 1;

        var name = i + '_' + org1.name.substr(a,4)+ org2.name.substr(b,4) + ++iDNA.nameTracker[org1.name+org2.name];
        var gen = org1.generation <= org2.generation ? org1.generation+1 : org2.generation+1;
        return new iDNA.Organism(name, gen, chromosomePair);
    }
};


iDNA.world = function world(organisms, registry, apocalypse, callback){
    // organisms - array of seed organisms already in registry (will be mutated)
    // registry - list of nodes and edges with info of each organism to be stored for posterity.
    //      also used for visualization.  (will be mutated)
    // apocalypse - is a number representing the number of generations or a function that determines when to end.
    // callback - function to call when world is over.

    if(_.size(organisms) === 0 ){ return false;}
    organisms = _.map(organisms, function(org) { //make sure all seed organisms have generation set to 1
        org.generation = 1;
        return org;
    });
    if (typeof apocalypse === 'number') {  // if apocalypse is a number
        var generations = apocalypse;  // then turn it into function that tests that number
        apocalypse = function(g) {
            return g > generations;
        }
    }
    var bigBang = Math.floor(Date.now()/1000);
    var generation = 1;

    var whileloops = 0;
    var throttledLoops = 0;

    theLoop =  function() {

        var orgsToUpdateInRegistry = [];

        var now = Math.floor(Date.now()/1000);
        // Aging Loop
        organisms = _.filter(organisms, function(org){
            var ded = false;
            org.age = now - org.birthTime;
            if(org.age > org.lifespan) {
                if (_.random(100) < org.mortalityRateAfter ) {
                    org.deathTime = now;
                    orgsToUpdateInRegistry.push(org);

                    ded = true;  //organism will no longer be in organisms array.  D.E.D., dead
                }
            }
            if(!ded && org.age >= org.puberty) {
                org.mature();
            }
            return !ded;  // return true if not dead, other false so no longer in organisms array.
        });

        //Mating Loop

        var brothel = _.filter(organisms, function(org) {
            return org.matured;
        });

        var couples = Math.floor(_.size(brothel)/2);
        var gen = generation;
        for(var j = 0; j < couples; j++){
            mate1 = brothel.splice(_.random(_.size(brothel-1)),1)[0];
            mate2 = brothel.splice(_.random(_.size(brothel-1)),1)[0];
            var thisGen = Math.max(mate1.generation, mate2.generation);
            if (thisGen > gen) { generation = thisGen;}
            var numOfOffspring = _.random(Math.min(mate1.maxOffspringPerMating, mate2.maxOffspringPerMating));
            for(var k = 0; k < numOfOffspring; k++) {
                var offspring = iDNA.mate(mate1, mate2, thisGen);

                offspring.grow();
                organisms.push(offspring);
                offspring.express();
                registry.addOffpring(offspring, mate1, mate2);
            }
        }

        // Express Loop

        _.each(organisms, function(org) {
            org.express();
        });

        // Update Registry
        _.each(orgsToUpdateInRegistry, function(org){
            registry.update(org);
        });



    };
    var notRunning = true;
    var outerLoop = function() {
        if(! apocalypse(generation) && _.size(organisms) > 0){
            whileloops++;
            if (notRunning) {
                notRunning = false;
                theLoop();
                notRunning = true;
            }
            setTimeout(outerLoop, 3000);
        } else {
            if(callback){ callback(organisms,registry);}
        }
    };
    outerLoop();

    return true;
}

iDNA.braveNewWorld = function braveNewWorld(tt, apocalypse, callback){
    // changing world function to work with TestTube

    // tt is iDNA.TestTube containing organisms and registry.  Organisms should already be inoculated with at least two
    // organisms- array of seed organisms already in registry (will be mutated)
    // registry - list of nodes and edges with info of each organism to be stored for posterity.
    //      also used for visualization.  (will be mutated)
    // apocalypse - is a number representing the number of generations or a function that determines when to end.
    // callback - function to call when world is over.

    if(_.size(tt.organisms) === 0 ){ return false;}
/*    _.each(tt.organisms, function(org) { //make sure all seed tt.organisms have generation set to 1
        org.generation = 1;
        return org;
    });*/
    if (typeof apocalypse === 'number') {  // if apocalypse is a number
        var generations = apocalypse;  // then turn it into function that tests that number
        apocalypse = function(g) {
            return g > generations;
        }
    }



    var whileloops = 0;
    var throttledLoops = 0;
    var generation = 1; //
    theLoop =  function() {

        var orgsToUpdateInRegistry = [];

        var now = Math.floor(Date.now()/1000);

        // Aging Loop
        tt.organisms = _.filter(tt.organisms, function(org){
            var ded = false;
            org.age++;
            if(org.age > org.lifespan) {
                if (_.random(100) < org.mortalityRateAfter ) {
                    org.deathTime = now;
                    orgsToUpdateInRegistry.push(org);
                    tt.dead++;
                    ded = true;  //organism will no longer be in tt.organisms array.  D.E.D., dead
                }
            }
            if(!ded && org.age >= org.puberty) {
                org.mature();
            }
            return !ded;  // return true if not dead, other false so taken out of the tt.organisms array.
        });


        //Mating Loop

        var brothel = _.filter(tt.organisms, function(org) {  // create array of mature organisms
            return org.matured;
        });

        var couples = Math.floor(_.size(brothel)/2);
        var gen = generation;
        for(var j = 0; j < couples; j++){
            var mate1 = brothel.splice(_.random(_.size(brothel-1)),1)[0];
            var mate2 = brothel.splice(_.random(_.size(brothel-1)),1)[0];
            var thisGen = Math.max(mate1.generation, mate2.generation);
            if (thisGen > gen) { generation = thisGen;}
            var numOfOffspring = _.random(Math.min(mate1.maxOffspringPerMating, mate2.maxOffspringPerMating));
            for(var k = 0; k < numOfOffspring; k++) {
                var offspring = iDNA.mate(mate1, mate2, thisGen);

                offspring.grow();
                tt.organisms.push(offspring);
                offspring.express('physical');  //express any physical properties genes
                tt.registry.addOffpring(offspring, mate1, mate2);
            }
        }

        // Express Loop

        _.each(tt.organisms, function(org) {
            org.express('metabolism');
        });

        // Update Registry
        _.each(orgsToUpdateInRegistry, function(org){
            tt.registry.update(org);
        });


    };
    var before, after;
    var outerLoop = function() {
        if(! apocalypse(generation) && _.size(tt.organisms) > 0 && !tt.stopped){
            tt.epoch++;
            before = Date.now();
            theLoop();
            //update population stats
            tt.population = _.size(tt.organisms);
            tt.addGrowth( {epoch: tt.epoch, population: tt.population} );
            after = Date.now();
            tt.addLoopSpeed( {epoch: tt.epoch, ms: after-before} );
            setTimeout(outerLoop, 2000);
        } else {
            if(callback){ callback(tt);} //no more loops, call callback function if there is one.
        }
    };
    outerLoop();

    return true;
}
//TODO create a way so that if mating loop takes greater than a second that world time slows down so that processing speed doesn't effect the number of matings.
