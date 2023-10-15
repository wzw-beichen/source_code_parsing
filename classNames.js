/**
 * @exapmple
 * classNames('foo', 'bar'); // => 'foo bar'
 * classNames('foo', { bar: true }); // => 'foo bar'
 * classNames({ 'foo-bar': true }); // => 'foo-bar'
 * classNames({ 'foo-bar': false }); // => ''
 * classNames({ foo: true }, { bar: true }); // => 'foo bar'
 * classNames({ foo: true, bar: true }); // => 'foo bar'
 * lots of arguments of various types
 * classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'
 * other falsy values are just ignored
 * classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
 * classNames(['b', { c: true, d: false }]) => 'b c'
 */
const classNames = () => {
  const classes = [];
  const hasOwn = {}.hasOwnProperty;
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
    if (!arg) continue;
    const argType = typeof arg;
    if (["string", "number"].includes(argType)) {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (
        arg.toString !== Object.prototype.toString &&
        arg.toString.toString().includes("[native code]")
      ) {
        classes.push(arg.toString());
        continue;
      }
      for (let key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(" ");
};

const classNamesOne = (...arguments) => {
  const nameList = arguments.reduce((total, arg) => {
    const argType = typeof arg;
    if (!arg) return total;
    let argStr = "";
    if (["string", "number"].includes(argType)) {
      total.push(arg);
    } else if (Array.isArray(arg) && item?.length) {
      argStr = classNames(...arg);
    } else if (argType === "object") {
      if (
        arg.toString !== Object.prototype.toString &&
        !arg.toString.toString().includes("[native code]")
      ) {
        argStr = arg.toString();
      } else {
        const itemArr = Object.entries(arg);
        argStr = itemArr
          .reduce((totalItem, arrItem) => {
            const [key, value] = arrItem;
            if (value) {
              totalItem.push(key);
            }
            return totalItem;
          }, [])
          .join(" ");
      }
    }
    if (argStr) {
      total.push(argStr);
    }
    return total;
  }, []);
  return nameList.join(" ");
};
