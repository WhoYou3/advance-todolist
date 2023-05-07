module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/node_modules/jest-transform-stub",
    "\\.(jpg|jpeg|png|gif|webp|ico)$":
      "<rootDir>/node_modules/jest-transform-stub",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "jest-transform-stub",
    "^.+\\.(jpg|jpeg|png|gif|webp|ico)$": "jest-transform-stub",
  },
};

export {};
