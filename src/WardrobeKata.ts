export function getWardrobeSetup(moduleAvailable: number[], wallSize: number): number[][] {
  const results : number[][] = [];
  const currentCombination : number[] = [];

  const exploreCombinaisons = (remainingWallsize, index) => {
    const isBaseCase = remainingWallsize === 0;
    if(isBaseCase) {
      results.push(JSON.parse(JSON.stringify(currentCombination)));
      return;
    }
    
    for(let i = index; i< moduleAvailable.length; i++) {
      const currentModule = moduleAvailable[i];
      const canFitCurrentWall = currentModule <= remainingWallsize;

      if(canFitCurrentWall) {
        currentCombination.push(currentModule);
        exploreCombinaisons(remainingWallsize - currentModule, i)
        currentCombination.pop();
      }
    }
  }
  
  exploreCombinaisons(wallSize, 0);
  return results;
}
