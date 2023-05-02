type ToBeTextFileOptions = Readonly<{
  encoding?: BufferEncoding;
}>;

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace jest {
  interface Matchers<R> {
    toExist(): Promise<R>;

    toBeTextFile(
      expectedText: string,
      options?: ToBeTextFileOptions
    ): Promise<R>;
  }
}
