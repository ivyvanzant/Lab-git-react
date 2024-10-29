// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = 2;
  const got = mut.div(100,50);
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers("Ivy123");
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success ', () => {
  const expected = false;
  const got = mut.containsNumbers("Ivy");
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers("123");
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = false;
  const got = mut.containsNumbers("");
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = false;
  const got = mut.containsNumbers("+*/");
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers("100+200");
  expect(got).toBe(expected);
});


test('Testing containsNumbers -- success', () => {
  const expected = false;
  const got = mut.containsNumbers(" ");
  expect(got).toBe(expected);
});



