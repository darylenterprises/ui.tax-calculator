import React, { createContext, useContext, useState } from "react";

interface Preferences {
  philHealthYear: number;
  taxRateYear: number;
}
interface PreferenceContextValues {
  value: Preferences;
  setPreferences: (value: Preferences) => void;
}

const philHealthYear = (year: number) => {
  if (year > 2024) {
    year = 2024;
  }
  return year;
};

const taxBracketYear = (year: number) => {
  if (year < 2023) {
    year = 2018;
  } else if (year > 2023) {
    year = 2023;
  }
  return year;
};

const defaultValues: PreferenceContextValues = {
  value: {
    philHealthYear: philHealthYear(new Date().getFullYear()),
    taxRateYear: taxBracketYear(new Date().getFullYear()),
  },
  setPreferences(value) {},
};

const PreferenceContext = createContext(defaultValues);

export const usePreferences = () => useContext(PreferenceContext);

const PreferenceProvider: React.FC<{}> = (props) => {
  const [preferences, setPreferences] = useState<Preferences>({
    philHealthYear: philHealthYear(new Date().getFullYear()),
    taxRateYear: taxBracketYear(new Date().getFullYear()),
  });

  const preferenceSetter = (preferences: Preferences) => {
    console.log(`setting `, preferences);
    setPreferences({
      philHealthYear: philHealthYear(preferences.philHealthYear),
      taxRateYear: taxBracketYear(preferences.taxRateYear),
    });
  };

  return (
    <PreferenceContext.Provider
      value={{
        value: preferences,
        setPreferences: preferenceSetter,
      }}
    >
      {props.children}
    </PreferenceContext.Provider>
  );
};

export default PreferenceProvider;
