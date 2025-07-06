import {describe, it, expect} from "@jest/globals";
import {getWardrobeSetup} from "../src/WardrobeKata";


describe('getWardrobeSetup', () => {
  it('all combination returned should add up to the exact size of the wall', () => {
    //fixtures
    const modules = [50,75,100,120]
    const wallsize = 250
    
    // tests
    const result = getWardrobeSetup(modules, wallsize)
    for(let i = 0; i < result.length; i++) {
      const sizeallmodule = result[i].reduce((acc, val) => acc + val,0)
      expect(sizeallmodule).toBe(wallsize)   
    }
    expect(result).toHaveLength(5)
    // assertions
  })
  it('should return an empty table if smallest module is larger than wall size', () => {
    // fixtures
    const modules = [200,300,275]
    const wallSize = 50;
    
    // test
    const result = getWardrobeSetup(modules,wallSize);
    
    //assertion
    expect(result).toHaveLength(0)
  })
  it('should never return a module that is larger than the wall', () => {
    //fixtures
    const modules = [50,75,100,120, 350];
    const wallSize = 300;
    
    // tests
    const result = getWardrobeSetup(modules, wallSize)
    
    for(let combinaison of result) {
       for(let m of combinaison) {
         expect(m).toBeLessThanOrEqual(wallSize);
       }
    }
  })
  it('should not return two similar combinaison', () => {
    //fixtures
    const modules = [50,100]
    const wallsize = 200;
    
    // test
    const result = getWardrobeSetup(modules, wallsize);
    
    //assertion
    const setOfUniqueComb = new Set();
    for(let comb of result) {
      const combString = comb.sort().toString();
      expect(setOfUniqueComb.has(combString)).toBe(false);
      setOfUniqueComb.add(combString);
    }
    
    expect(setOfUniqueComb.size).toEqual(result.length);
  })
})
