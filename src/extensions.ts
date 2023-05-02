type ToBeTextFileOptions = Readonly<{
  encoding?: BufferEncoding;
}>;

type StatsPredicate = (stats: import("node:fs").Stats) => boolean;

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace jest {
  interface Matchers<R> {
    toHaveStats(statsPredicate: StatsPredicate): Promise<R>;

    toExist(): Promise<R>;

    toBeTextFile(
      expectedText: string,
      options?: ToBeTextFileOptions
    ): Promise<R>;
  }
}
