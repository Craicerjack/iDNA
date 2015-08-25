describe("Testing binaryPoints for a gene", function() {

 it("binaryPoints should be 0 if desired is 65 and current is 65", function() {
    expect(binaryPoints(65,65)).toBe(0) ;
 });
    it("binaryPoints should be -1 if desired is 65 and current is 97", function() {
        expect(binaryPoints(65,97)).toBe(-1) ;
    });
    it("binaryPoints should be -3 if desired is 65 and current is 98", function() {
        expect(binaryPoints(65,98)).toBe(-3) ;
    });
    it("binaryPoints should be -2 if desired is 65 and current is 66", function() {
        expect(binaryPoints(65,66)).toBe(-2) ;
    });
    it("binaryPoints should be -4 if desired is 65 and current is 128", function() {
        expect(binaryPoints(65,128)).toBe(-4) ;
    });
    it("binaryPoints should be -3 if desired is 65 and current is 7", function() {
        expect(binaryPoints(65,7)).toBe(-3) ;
    });
    it("binaryPoints should be -14 if desired is 65 and current is 16321", function() {
        expect(binaryPoints(65,16321)).toBe(-14) ;
    });
    it("binaryPoints should be -2 if desired is 65 and current is 193", function() {
        expect(binaryPoints(65,193)).toBe(-2) ;
    });
});