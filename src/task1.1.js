const stdin = process.openStdin();

stdin.addListener("data", data =>
  console.log(
    String(data)
      .split("")
      .reverse()
      .join("")
  )
);