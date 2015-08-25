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

iDNA.Gene = function(name, type, code, deactivated, express, codeValue) {
    this.name = name || _.random(2,9999999);  //TODO Create a unique random name
    this.type = type || "noType";
    this.code = code || {};  // code must be type of object due to object cloning issues.
    this.deactivated = deactivated || false;
    this.express = express || null;
    this.codeValue = codeValue || function() { return null; };  //to be overwritten.  codeValue should be calculated using data in this.code.
    // If codeValue of the gene with same name on another chromosome is lower, then this gene is active
    // needs to be a positive number.
    this.mutate = null; //unique function defined that mutates the genetic code.  Function
};

iDNA.Gene.prototype.setName = function(name) {
    //name needs to be unique. //TODO Check here or check when adding to Chromosome or just let user determine?
    this.name = setName;
};

iDNA.Gene.prototype.getName = function() {
    return this.name;
};

iDNA.Gene.prototype.isActive = function(gene) {  //codeValue of other gene.
    //if codeValue's are not null, value will be true if they are equal or this.codeValue is higher
    //so if equal, both genes on each chromosome will be expressed

    if(this.deactivated || this.express === null || this.codeValue() === null) {
        return false;
    }
    var codeValue = null;
    if(gene instanceof iDNA.Gene && typeof gene.codeValue == "function") {
        codeValue = gene.codeValue();
    }
    codeValue = codeValue || null;
    if(codeValue !== null) {
        return this.codeValue() >= codeValue;
    } else {
        return true;
    }
};
iDNA.Gene.prototype.copy = function() {
    // return a new copy of gene.
    // tried this
    //var cloned = _.copy(this);
    //cloned.code = JSON.parse(JSON.stringify(cloned.code));
    // but gene.code could have sub-objects which has to be copied. functions in gene.code is not copied.  not iDNA.Gene anymore.

    // So tried this
    //var cloned = jQuery.extend(true, {}, this);
    // But not a great copy.  not of type iDNA.Gene anymore, it is of type object.
    //  Gene.prototype functions are copied to object and not in prototype

    // So this code was the best copy.

    var clonedCode = jQuery.extend(true, {}, this.code);
    var copy = new iDNA.Gene(this.name,this.type, clonedCode,this.deactivated,this.express,this.codeValue);
    copy.mutate = this.mutate;
    return copy;
};


iDNA.Gene.prototype.toString = function() {
  return 'Gene: "' + this.name + '" of type: "' + this.type + '". It is ' + (this.isActive?"Active. ":"NOT Active. ")+" Code is " + JSON.stringify(this.code);
};

//TODO Add more setters and getters if need to perform validation or error correction
//TODO mutate rate? mutate function?



