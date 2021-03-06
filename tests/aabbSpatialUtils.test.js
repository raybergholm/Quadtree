import {
    describe,
    it
} from "mocha";
import {
    expect
} from "chai";

import Aabb, {
    aabbEquals
} from "../src/spatial/Aabb";

import {
    xRelation,
    yRelation,
    RELATIONSHIPS
} from "../src/spatial/aabbSpatialUtils";

import AxisAlignedDivider, {
    DEFAULT_DIVIDER
} from "../src/spatial/AxisAlignedDivider";

describe("aabbSpatialUtils tests", () => {
    describe("X-axis sanity tests", () => {
        const refAabb = new Aabb({
            x: 0,
            width: 100
        });
        const insideAabb = new Aabb({
            x: 25,
            width: 50
        });
        const outsideAabb = new Aabb({
            x: -100,
            width: 500
        });
        const farAwayAabb = new Aabb({
            x: 300,
            width: 100
        });
        const intersectingAabb = new Aabb({
            x: -25,
            width: 100
        });
        const leftEdgeTouchingAabb = new Aabb({
            x: 0,
            width: 50
        });
        const rightEdgeTouchingAabb = new Aabb({
            x: 50,
            width: 50
        });

        it("Enclosing should work", () => {
            expect(xRelation(refAabb, insideAabb)).to.equal(RELATIONSHIPS.ENCLOSING);
        });

        it("EnclosedBy should work", () => {
            expect(xRelation(refAabb, outsideAabb)).to.equal(RELATIONSHIPS.ENCLOSED_BY);
        });

        it("OutOfBounds should work", () => {
            expect(xRelation(refAabb, farAwayAabb)).to.equal(RELATIONSHIPS.OUT_OF_BOUNDS);
        });

        it("Intersecting should work", () => {
            expect(xRelation(refAabb, intersectingAabb)).to.equal(RELATIONSHIPS.INTERSECTING);
        });
        it("... for touching edges too", () => {
            expect(xRelation(refAabb, leftEdgeTouchingAabb)).to.equal(RELATIONSHIPS.INTERSECTING);
            expect(xRelation(refAabb, rightEdgeTouchingAabb)).to.equal(RELATIONSHIPS.INTERSECTING);
        });
    });

    describe("Y-axis sanity tests", () => {
        const refAabb = new Aabb({
            y: 0,
            height: 100
        });
        const insideAabb = new Aabb({
            y: 25,
            height: 50
        });
        const outsideAabb = new Aabb({
            y: -100,
            height: 500
        });
        const farAwayAabb = new Aabb({
            y: 300,
            height: 100
        });
        const intersectingAabb = new Aabb({
            y: -25,
            height: 100
        });
        const leftEdgeTouchingAabb = new Aabb({
            y: 0,
            height: 50
        });
        const rightEdgeTouchingAabb = new Aabb({
            y: 50,
            height: 50
        });

        it("Enclosing should work", () => {
            expect(yRelation(refAabb, insideAabb)).to.equal(RELATIONSHIPS.ENCLOSING);
        });

        it("EnclosedBy should work", () => {
            expect(yRelation(refAabb, outsideAabb)).to.equal(RELATIONSHIPS.ENCLOSED_BY);
        });

        it("OutOfBounds should work", () => {
            expect(yRelation(refAabb, farAwayAabb)).to.equal(RELATIONSHIPS.OUT_OF_BOUNDS);
        });

        it("Intersecting should work", () => {
            expect(yRelation(refAabb, intersectingAabb)).to.equal(RELATIONSHIPS.INTERSECTING);
        });
        it("... for touching edges too", () => {
            expect(yRelation(refAabb, leftEdgeTouchingAabb)).to.equal(RELATIONSHIPS.INTERSECTING);
            expect(yRelation(refAabb, rightEdgeTouchingAabb)).to.equal(RELATIONSHIPS.INTERSECTING);
        });
    });

    describe("Intersection and relational tests", () => {
        const refAabb = new Aabb({
            x: 0,
            y: 0,
            width: 100,
            height: 100
        });
        const insideAabb = new Aabb({
            x: 25,
            y: 25,
            width: 25,
            height: 25
        });
        const outsideAabb = new Aabb({
            x: -50,
            y: -50,
            width: 200,
            height: 200
        });
        const farAwayAabb = new Aabb({
            x: -200,
            y: 300,
            width: 10,
            height: 10
        });
        const tooFarRightAabb = new Aabb({
            x: 101,
            y: 25,
            width: 10,
            height: 10
        });
        const tooFarUpAabb = new Aabb({
            x: 25,
            y: -11,
            width: 10,
            height: 10
        });
        const intersectingAabb = new Aabb({
            x: 20,
            y: -12,
            width: 25,
            height: 25
        });
        const leftEdgeTouchingAabb = new Aabb({
            x: 0,
            y: 25,
            width: 50,
            height: 200
        });
        const rightEdgeTouchingAabb = new Aabb({
            x: 50,
            y: 25,
            width: 50,
            height: 200
        });

        describe("Single AABB - AABB tests", () => {
            it("Smaller AABB should be inside", () => {
                expect(refAabb.is.enclosing(insideAabb)).to.be.true;
            });
            it("... and all others should be false", () => {
                expect(refAabb.is.enclosing(outsideAabb)).to.be.false;
                expect(refAabb.is.enclosing(farAwayAabb)).to.be.false;
                expect(refAabb.is.enclosing(tooFarRightAabb)).to.be.false;
                expect(refAabb.is.enclosing(tooFarUpAabb)).to.be.false;
                expect(refAabb.is.enclosing(intersectingAabb)).to.be.false;
                expect(refAabb.is.enclosing(leftEdgeTouchingAabb)).to.be.false;
                expect(refAabb.is.outOfBounds(rightEdgeTouchingAabb)).to.be.false;
            });

            it("Bigger AABB should be outside", () => {
                expect(refAabb.is.enclosedBy(outsideAabb)).to.be.true;
            });
            it("... and all others should be false", () => {
                expect(refAabb.is.enclosedBy(insideAabb)).to.be.false;
                expect(refAabb.is.enclosedBy(farAwayAabb)).to.be.false;
                expect(refAabb.is.enclosedBy(tooFarRightAabb)).to.be.false;
                expect(refAabb.is.enclosedBy(tooFarUpAabb)).to.be.false;
                expect(refAabb.is.enclosedBy(intersectingAabb)).to.be.false;
                expect(refAabb.is.enclosedBy(leftEdgeTouchingAabb)).to.be.false;
                expect(refAabb.is.enclosedBy(rightEdgeTouchingAabb)).to.be.false;
            });

            it("Out of bounds AABB should be recognised", () => {
                expect(refAabb.is.outOfBounds(farAwayAabb)).to.be.true;
            });
            it("... one axis is entirely misaligned should also be picked up", () => {
                expect(refAabb.is.outOfBounds(tooFarRightAabb)).to.be.true;
                expect(refAabb.is.outOfBounds(tooFarUpAabb)).to.be.true;
            });
            it("... and all others should be false", () => {
                expect(refAabb.is.outOfBounds(insideAabb)).to.be.false;
                expect(refAabb.is.outOfBounds(outsideAabb)).to.be.false;
                expect(refAabb.is.outOfBounds(intersectingAabb)).to.be.false;
                expect(refAabb.is.outOfBounds(leftEdgeTouchingAabb)).to.be.false;
                expect(refAabb.is.outOfBounds(rightEdgeTouchingAabb)).to.be.false;
            });

            it("Intersecting AABB should be touching", () => {
                expect(refAabb.is.intersecting(intersectingAabb)).to.be.true;
            });
            it("... and edge-touching AABBs too", () => {
                expect(refAabb.is.intersecting(leftEdgeTouchingAabb)).to.be.true;
                expect(refAabb.is.intersecting(rightEdgeTouchingAabb)).to.be.true;
            });
            it("... plus enclosing/enclosed AABBs too", () => {
                expect(refAabb.is.intersecting(insideAabb)).to.be.true;
                expect(refAabb.is.intersecting(outsideAabb)).to.be.true;
            });

            it("... and all others should be false", () => {
                expect(refAabb.is.intersecting(farAwayAabb)).to.be.false;
                expect(refAabb.is.intersecting(tooFarRightAabb)).to.be.false;
                expect(refAabb.is.intersecting(tooFarUpAabb)).to.be.false;
            });
        });

        describe("Filtering AABB tests", () => {
            const allAabbs = [
                insideAabb,
                outsideAabb,
                farAwayAabb,
                tooFarRightAabb,
                tooFarUpAabb,
                intersectingAabb,
                leftEdgeTouchingAabb,
                rightEdgeTouchingAabb
            ];

            it("Enclosing filter should be correct", () => {
                const result = refAabb.filter.enclosing(allAabbs);
                expect(result).to.be.an("array").and.have.members([insideAabb]);
            });
            it("EnclosedBy filter should be correct", () => {
                const result = refAabb.filter.enclosedBy(allAabbs);
                expect(result).to.be.an("array").and.have.members([outsideAabb]);
            });
            it("OutOfBounds filter should be correct", () => {
                const result = refAabb.filter.outOfBounds(allAabbs);
                expect(result).to.be.an("array").and.have.members([farAwayAabb, tooFarRightAabb, tooFarUpAabb]);
            });
            it("Intersecting filter should be correct", () => {
                const result = refAabb.filter.intersecting(allAabbs);
                expect(result).to.be.an("array").and.have.members([insideAabb, outsideAabb, intersectingAabb, leftEdgeTouchingAabb, rightEdgeTouchingAabb]);
            });
        });
    });

    describe("AABB split tests", () => {
        const splitBoundsEquals = (ref, target) => {
            const keys = ["ne", "nw", "sw", "se"];
            expect(ref).to.have.all.keys(keys);
            expect(target).to.have.all.keys(keys);

            const notMatching = Object.keys(ref).filter((key) => !aabbEquals(ref[key], target[key]));
            return notMatching.length === 0 ? true : notMatching;
        };

        describe("Starting from origin", () => {
            const refAabb = new Aabb({
                x: 0,
                y: 0,
                width: 100,
                height: 100
            });

            it("Split with default dividers (50-50 split)", () => {
                const expectedResult = {
                    ne: new Aabb({
                        x: 50,
                        y: 0,
                        width: 50,
                        height: 50
                    }),
                    nw: new Aabb({
                        x: 0,
                        y: 0,
                        width: 50,
                        height: 50
                    }),
                    sw: new Aabb({
                        x: 0,
                        y: 50,
                        width: 50,
                        height: 50
                    }),
                    se: new Aabb({
                        x: 50,
                        y: 50,
                        width: 50,
                        height: 50
                    }),
                };
                const result = refAabb.split(DEFAULT_DIVIDER);

                expect(result).to.be.an("object");
                expect(splitBoundsEquals(result, expectedResult)).to.be.true;
            });

            it("Split with specific dividers (25-25 split)", () => {
                const expectedResult = {
                    ne: new Aabb({
                        x: 25,
                        y: 0,
                        width: 75,
                        height: 25
                    }),
                    nw: new Aabb({
                        x: 0,
                        y: 0,
                        width: 25,
                        height: 25
                    }),
                    sw: new Aabb({
                        x: 0,
                        y: 25,
                        width: 25,
                        height: 75
                    }),
                    se: new Aabb({
                        x: 25,
                        y: 25,
                        width: 75,
                        height: 75
                    }),
                };
                const quarteredDivider = new AxisAlignedDivider({
                    x: 25,
                    y: 25
                });
                const result = refAabb.split(quarteredDivider);

                expect(result).to.be.an("object");
                expect(splitBoundsEquals(result, expectedResult)).to.be.true;
            });

            it("Split with specific dividers (25-75 split)", () => {
                const expectedResult = {
                    ne: new Aabb({
                        x: 25,
                        y: 0,
                        width: 75,
                        height: 75
                    }),
                    nw: new Aabb({
                        x: 0,
                        y: 0,
                        width: 25,
                        height: 75
                    }),
                    sw: new Aabb({
                        x: 0,
                        y: 75,
                        width: 25,
                        height: 25
                    }),
                    se: new Aabb({
                        x: 25,
                        y: 75,
                        width: 75,
                        height: 25
                    }),
                };
                const rectangularDivider = new AxisAlignedDivider({
                    x: 25,
                    y: 75
                });
                const result = refAabb.split(rectangularDivider);

                expect(result).to.be.an("object");
                expect(splitBoundsEquals(result, expectedResult)).to.be.true;
            });
        });

        describe("Across axes", () => {
            const refAabb = new Aabb({
                x: -100,
                y: -100,
                width: 200,
                height: 200
            });

            it("Split with default dividers (50-50 split)", () => {
                const expectedResult = {
                    ne: new Aabb({
                        x: 0,
                        y: -100,
                        width: 100,
                        height: 100
                    }),
                    nw: new Aabb({
                        x: -100,
                        y: -100,
                        width: 100,
                        height: 100
                    }),
                    sw: new Aabb({
                        x: -100,
                        y: 0,
                        width: 100,
                        height: 100
                    }),
                    se: new Aabb({
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100
                    }),
                };
                const result = refAabb.split(DEFAULT_DIVIDER);

                expect(result).to.be.an("object");
                expect(splitBoundsEquals(result, expectedResult)).to.be.true;
            });

            it("Split with specific dividers (25-25 split)", () => {
                const expectedResult = {
                    ne: new Aabb({
                        x: -50,
                        y: -100,
                        width: 150,
                        height: 50
                    }),
                    nw: new Aabb({
                        x: -100,
                        y: -100,
                        width: 50,
                        height: 50
                    }),
                    sw: new Aabb({
                        x: -100,
                        y: -50,
                        width: 50,
                        height: 150
                    }),
                    se: new Aabb({
                        x: -50,
                        y: -50,
                        width: 150,
                        height: 150
                    }),
                };
                const quarterDivider = new AxisAlignedDivider({
                    x: 25,
                    y: 25
                });
                const result = refAabb.split(quarterDivider);

                expect(result).to.be.an("object");
                expect(splitBoundsEquals(result, expectedResult)).to.be.true;
            });

            it("Split with specific dividers (25-75 split)", () => {
                const expectedResult = {
                    ne: new Aabb({
                        x: -50,
                        y: -100,
                        width: 150,
                        height: 150
                    }),
                    nw: new Aabb({
                        x: -100,
                        y: -100,
                        width: 50,
                        height: 150
                    }),
                    sw: new Aabb({
                        x: -100,
                        y: 50,
                        width: 50,
                        height: 50
                    }),
                    se: new Aabb({
                        x: -50,
                        y: 50,
                        width: 150,
                        height: 50
                    }),
                };
                const rectangleDivider = new AxisAlignedDivider({
                    x: 25,
                    y: 75
                });
                const result = refAabb.split(rectangleDivider);

                expect(result).to.be.an("object");
                expect(splitBoundsEquals(result, expectedResult)).to.be.true;
            });
        });
    });
});