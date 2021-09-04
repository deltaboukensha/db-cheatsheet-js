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

test("regex any digit 1", () => {
  const s = "abc 123 abc abc abc";
  const r = new RegExp("[0-9]+", "g");
  const m = s.match(r);
  expect(m).toEqual(["123"]);
});

test("regex any digit 2", () => {
  const s = "abc 123 abc abc abc";
  const r = new RegExp("d+", "g");
  const m = s.match(r);
  // \d does not for some reason
  expect(m).toEqual(null);
});

test("regex any digit 3", () => {
  const s = "one to 100";
  const r = /\d+/;
  const m = s.match(r);
  const z = m.map((i) => i);
  expect(z).toEqual(["100"]);
});

test("regex any non digit", () => {
  const s = "abc 123 abc 456 abc";
  const r = /\w+/g;
  const m = s.match(r);
  const z = m.map((i) => i);
  expect(z).toEqual(["abc", "123", "abc", "456", "abc"]);
});

// exec only finds one match at a time
test("regex exec all match groups", () => {
  const s = "abc 123 abc abc abc";
  const r = new RegExp("(?<name>abc)", "g");
  const m = [];
  let match = null;
  while ((match = r.exec(s))) {
    m.push(match.groups["name"]);
  }
  expect(m).toEqual(["abc", "abc", "abc", "abc"]);
});

// match cant be used with named groups
test("regex match all", () => {
  const s = "abc 123 abc abc abc";
  const r = new RegExp("(?<name>abc)", "g");
  const m = s.match(r);
  expect(m).toEqual(["abc", "abc", "abc", "abc"]);
});

test("regex match groups named short syntax 1", () => {
  const s = "abc 123 abc 456 abc";
  const r = /(?<name>\d+)/g;
  const m = s.match(r);
  // no way to extract the group name with the g flag on
  expect(m).toEqual(["123", "456"]);
});

test("regex match groups named short syntax while loop", () => {
  const s = "abc 123 abc 456 abc";
  const r = /(?<name>\d+)/g;
  const m = [];
  let match = null;

  while ((match = r.exec(s))) {
    m.push(match.groups["name"]);
  }

  expect(m).toEqual(["123", "456"]);
});

test("regex match groups named short syntax for loop", () => {
  const s = "abc 123 abc 456 abc";
  const r = /(?<name>\d+)/g;
  const matches = [];

  for (let m; (m = r.exec(s)); ) {
    matches.push(m.groups["name"]);
  }

  expect(matches).toEqual(["123", "456"]);
});

test("regex variables", () => {
  const s = "abc 123 abc 456 abc";
  const v = "abc";
  const r = new RegExp(`(?<name>${v}+)`, "g");
  const matches = [];

  for (let m; (m = r.exec(s)); ) {
    matches.push(m.groups["name"]);
  }

  expect(matches).toEqual(["abc", "abc", "abc"]);
});

test("null == undefined", () => {
  expect(null == undefined).toEqual(true);
});

test("null === undefined", () => {
  expect(null === undefined).toEqual(false);
});

test("1 == '1'", () => {
  expect(1 == "1").toEqual(true);
});

test("1 === '1'", () => {
  expect(1 === "1").toEqual(false);
});

test("lookup", () => {
  const a = ["a", "b", "c"];
  const lookup = a.reduce((acc, cur) => {
    acc[cur] = cur;
    return acc;
  }, {});
  expect(lookup).toEqual({ a: "a", b: "b", c: "c" });
});

test("array destructuring assignment", () => {
  const array = ["a", "b", "c", "d", "e"];
  const [a, b, ...rest] = array;
  expect(a).toEqual("a");
  expect(b).toEqual("b");
  expect(rest).toEqual(["c", "d", "e"]);
});

test("array destructuring assignment", () => {
  const o = { a: "a", b: "b", c: "c", d: "d", e: "e" };
  const { a, b, ...rest } = o;
  expect(a).toEqual("a");
  expect(b).toEqual("b");
  expect(rest).toEqual({ c: "c", d: "d", e: "e" });
});

test("Number MIN_VALUE", () => {
  expect(Number.MIN_VALUE.toString()).toEqual("5e-324");
});

test("Number MAX_VALUE", () => {
  expect(Number.MAX_VALUE.toString()).toEqual("1.7976931348623157e+308");
});

test("Number MIN_SAFE_INTEGER", () => {
  expect(Number.MIN_SAFE_INTEGER.toString()).toEqual("-9007199254740991");
});

test("Number MAX_SAFE_INTEGER", () => {
  expect(Number.MAX_SAFE_INTEGER.toString()).toEqual("9007199254740991");
});

test("iterator", () => {
  function* foo() {
    for (let i = 0; i < 5; i++) {
      yield i;
    }
  }

  const iterator = foo();
  expect(iterator.next().value).toEqual(0);
  expect(iterator.next().value).toEqual(1);
  expect(iterator.next().value).toEqual(2);
  expect(iterator.next().value).toEqual(3);
  expect(iterator.next().value).toEqual(4);

  const v = [];
  for (const i of foo()) {
    v.push(i);
  }
  expect(v).toEqual([0, 1, 2, 3, 4]);
});

test("dfs", () => {
  const root = {
    value: 999,
    a: {
      value: 215,
      a: {
        value: 532,
        a: {
          value: 231,
        },
        b: {
          value: 923,
        },
      },
      b: {
        value: 472,
        a: {
          value: 723,
        },
        b: {
          value: 936,
        },
      },
    },
    b: {
      value: 623,
      a: {
        value: 123,
        a: {
          value: 763,
        },
        b: {
          value: 843,
        },
      },
      b: {
        value: 723,
        a: {
          value: 653,
        },
        b: {
          value: 632,
        },
      },
    },
  };

  const list = [];

  const dfs = (node) => {
    if (!node) return;

    list.push(node.value);
    dfs(node.a);
    dfs(node.b);
  };

  dfs(root);
  expect(list).toEqual([
    999, 215, 532, 231, 923, 472, 723, 936, 623, 123, 763, 843, 723, 653, 632,
  ]);
});

test("dfs 2", () => {
  const root = {
    value: 999,
    a: {
      value: 215,
      a: {
        value: 532,
        a: {
          value: 231,
        },
        b: {
          value: 923,
        },
      },
      b: {
        value: 472,
        a: {
          value: 723,
        },
        b: {
          value: 936,
        },
      },
    },
    b: {
      value: 623,
      a: {
        value: 123,
        a: {
          value: 763,
        },
        b: {
          value: 843,
        },
      },
      b: {
        value: 723,
        a: {
          value: 653,
        },
        b: {
          value: 632,
        },
      },
    },
  };

  const list = [];
  const stack = [];

  stack.push(root);

  while (stack.length) {
    const node = stack.pop();
    list.push(node.value);

    if (node.b) stack.push(node.b);
    if (node.a) stack.push(node.a); // note that it is pushed last
  }

  expect(list).toEqual([
    999, 215, 532, 231, 923, 472, 723, 936, 623, 123, 763, 843, 723, 653, 632,
  ]);
});

test("bfs", () => {
  const root = {
    value: 999,
    a: {
      value: 215,
      a: {
        value: 532,
        a: {
          value: 231,
        },
        b: {
          value: 923,
        },
      },
      b: {
        value: 472,
        a: {
          value: 723,
        },
        b: {
          value: 936,
        },
      },
    },
    b: {
      value: 623,
      a: {
        value: 123,
        a: {
          value: 763,
        },
        b: {
          value: 843,
        },
      },
      b: {
        value: 723,
        a: {
          value: 653,
        },
        b: {
          value: 632,
        },
      },
    },
  };

  const list = [];
  const stack = [];

  stack.push(root);

  while (stack.length) {
    const node = stack.shift();
    list.push(node.value);

    if (node.a) stack.push(node.a);
    if (node.b) stack.push(node.b);
  }

  expect(list).toEqual([
    999, 215, 623, 532, 472, 123, 723, 231, 923, 723, 936, 763, 843, 653, 632,
  ]);
});

test("dynamic programming", () => {
  const list = [];
  const memory = {};

  const f = (n) => {
    if (n == 0) return 0;
    if (n == 1) return 1;
    if (n == 2) return 1;
    if (memory[n]) return memory[n];

    const data = f(n - 2) + f(n - 1);
    memory[n] = data;
    return data;
  };

  for (let i = 40; i > 0; i--) {
    list.push(f(i));
  }
  expect(list).toEqual([
    102334155, 63245986, 39088169, 24157817, 14930352, 9227465, 5702887,
    3524578, 2178309, 1346269, 832040, 514229, 317811, 196418, 121393, 75025,
    46368, 28657, 17711, 10946, 6765, 4181, 2584, 1597, 987, 610, 377, 233, 144,
    89, 55, 34, 21, 13, 8, 5, 3, 2, 1, 1,
  ]);
});
