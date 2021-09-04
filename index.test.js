test("regex look ahead", () => {
  const s = "abc abc abc abc abc";
  const r = new RegExp(".(?=bc)", "g");
  const m = s.match(r);
  expect(m).toEqual(["a", "a", "a", "a", "a"]);
});

test("regex look behind", () => {
  const s = "abc abc abc abc abc";
  const r = new RegExp("(?<=ab).", "g");
  const m = s.match(r);
  expect(m).toEqual(["c", "c", "c", "c", "c"]);
});

test("regex capture groups", () => {
  const s = "Width: 1280, Height: 960";
  const r = new RegExp("Width: (?<w>[0-9]+), Height: (?<h>[0-9]+)", "g");
  const m = r.exec(s);
  expect(m.groups["w"]).toEqual("1280");
  expect(m.groups["h"]).toEqual("960");
});

test("regex characters", () => {
  const s = "abc abc abc abc abc";
  const r = new RegExp("[bc]", "g");
  const m = s.match(r);
  expect(m).toEqual(["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"]);
});

test("regex any character", () => {
  const s = "abc abc abc abc abc";
  const r = new RegExp(".+", "g");
  const m = s.match(r);
  expect(m).toEqual(["abc abc abc abc abc"]);
});

test("regex any digit brackets", () => {
  const s = "abc 123 abc abc abc";
  const r = new RegExp("[0-9]+", "g");
  const m = s.match(r);
  expect(m).toEqual(["123"]);
});
