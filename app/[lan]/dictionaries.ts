export const getDictionary = async (lan: string) => {
  switch (lan) {
    case 'de':
      return import('./dictionaries/de.json').then((m) => m.default);
    case 'en':
    default:
      return import('./dictionaries/en.json').then((m) => m.default);
  }
};
