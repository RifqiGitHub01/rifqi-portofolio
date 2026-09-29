export interface LightboxItem {
  src: string;
  alt: string;
  type: "photo" | "certificate" | "document";
}

/** Builds the reusable image model from a list of asset file names. */
export function toLightboxItems(
  files: string[],
  type: LightboxItem["type"],
  makeAlt: (file: string, index: number) => string,
  assetPath: (file: string) => string,
): LightboxItem[] {
  return files.map((file, index) => ({
    src: assetPath(file),
    alt: makeAlt(file, index),
    type,
  }));
}
