const { isValid } = require("./enclosure")

test("test 1", () => {
  expect(isValid()).toEqual(true);
});

test("test 2", () => {
  expect(isValid("")).toEqual(true);
});

test("test 3", () => {
  expect(isValid("()")).toEqual(true);
});

test("test 4", () => {
  expect(isValid("(]")).toEqual(false);
});

test("test 5", () => {
  expect(isValid("((()()()))")).toEqual(true);
});
