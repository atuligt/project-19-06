
function GetData(a:number, b:number) {
    return a + b;
  }

  
  // test('adds 1 + 2 to equal 3', () => {
  //   expect(GetData(1, 2)).toBe(3);
  // });

  describe('GetData function', () => {
    test.each([
      [0, 0, 0], // Test case 1: 0 + 0 = 0
      [5, 5, 10], // Test case 2: 5 + 5 = 10
      [-1, 1, 0], // Test case 3: -1 + 1 = 0
      [10, -5, 5], // Test case 4: 10 + (-5) = 5
    ])('adds %i + %i to equal %i', (a, b, expected) => {
      expect(GetData(a, b)).toBe(expected);
    });
  });