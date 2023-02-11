Module["preInit"] = () => {
  const { lstatSync, readFileSync } = require("fs");
  const path = require("path");

  const getFile = (file) => readFileSync(file);
  const getArg = (args, arg) => {
    const regex = `^${arg}`;

    let [file] = args.filter((arg) => arg.match(new RegExp(regex)));

    if (file && file.includes(arg)) {
      if (file.trim() === arg) {
        return args[args.indexOf(file) + 1];
      }

      if (file.includes("=")) {
        [arg, file] = file.split("=");

        if (file) {
          return arg.trim() === arg ? file : undefined;
        }
      }
    }
  };

  const hashOption = getArg(process.argv, "-H") || getArg(process.argv, "--sha1");
  const hashOptionBase = path.parse(hashOption ? hashOption : "").base;

  if (hashOption) {
    try {
      if (hashOptionBase === ".") {
        return;
      }

      if (lstatSync(hashOption).isDirectory()) {
        FS.mkdir(hashOptionBase);

        return;
      }

      const file = getFile(hashOption);
      const fd = FS.open(hashOptionBase, "w+");

      FS.write(fd, file, 0, file.length);
      FS.close(fd);
    } catch (error) {
      console.error(error);
    }
  }
};
