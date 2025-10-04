export const FILE_UPLOAD = {
  MAX_SIZE: 1024 * 1024, // 1MB
  ALLOWED_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
  ] as string[],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".svg"],
} as const;
