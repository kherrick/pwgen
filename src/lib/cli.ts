const path = require("path");
const pwgen = require("./pwgen.js");

const getHashArgBase = (args, arg) => {
  const regex = `^${arg}`;

  let [file] = args.filter((arg) => arg.match(new RegExp(regex)));

  if (file && file.includes(arg)) {
    const index = args.indexOf(file);

    if (file.trim() === arg) {
      const next = index + 1;

      return [path.parse(args[next] ? args[next] : "").base, next, ">"];
    }

    if (file.includes("=")) {
      const [arg, splitFile] = file.split("=");

      if (splitFile) {
        return arg.trim() === arg
          ? [path.parse(splitFile).base, index, "="]
          : undefined;
      }
    }
  }
};

const hashOption = getHashArgBase(process.argv, "-H") || getHashArgBase(process.argv, "--sha1");

const args = process.argv.reduce((pre: string[], cur, ind) => {
  if (!hashOption) {
    return [...pre, cur];
  }

  return hashOption[2] === "="
    ? [...pre, ind === hashOption[1] ? `--sha1=${hashOption[0]}` : cur]
    : [...pre, ind === hashOption[1] ? hashOption[0] : cur];
}, []);

pwgen({
  arguments: args.splice(2, args.length - 2),
});
