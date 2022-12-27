import * as React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Select } from "baseui/select";
import { KIND as ButtonKind } from "baseui/button";
import { useTheme } from "../providers/ThemeProvider";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";
import { t } from "i18next";
import { usePreferences } from "../providers/PreferenceProvider";
import { useStyletron } from "baseui";
import { LabelLarge, LabelMedium } from "baseui/typography";

const Preferences = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const themeContext = useTheme();
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("theme") === "dark"
  );
  React.useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    themeContext.changeTheme(darkMode ? "dark" : "light");
  }, [darkMode, themeContext]);
  const { value: preferences, setPreferences } = usePreferences();
  React.useEffect(() => {
    console.log(`current pref`, preferences);
  }, [preferences]);
  const [, theme] = useStyletron();
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Preferences</ModalHeader>
      <ModalBody>
        <Checkbox
          checked={darkMode}
          checkmarkType={STYLE_TYPE.toggle}
          onChange={(e) => setDarkMode(e.currentTarget.checked)}
          labelPlacement={LABEL_PLACEMENT.right}
        >
          {t("dark")}
        </Checkbox>
        <div style={{ marginTop: theme.sizing.scale800 }}>
          <LabelMedium marginBottom={theme.sizing.scale400}>
            Tax bracket
          </LabelMedium>
          <Select
            value={[{ value: preferences.taxRateYear }]}
            options={[{ value: 2018 }, { value: 2023 }]}
            clearable={false}
            labelKey={"value"}
            valueKey={"value"}
            onChange={(v) => {
              console.log(v.value[0].value);
              setPreferences({
                philHealthYear: preferences.philHealthYear,
                taxRateYear: v.value[0].value,
              });
            }}
          />
        </div>
        <div style={{ marginTop: theme.sizing.scale800 }}>
          <LabelMedium marginBottom={theme.sizing.scale400}>
            PhilHealth Bracket
          </LabelMedium>
          <Select
            value={[{ value: preferences.philHealthYear }]}
            options={[
              { value: 2019 },
              { value: 2020 },
              { value: 2021 },
              { value: 2022 },
              { value: 2023 },
              { value: 2024 },
            ]}
            clearable={false}
            labelKey={"value"}
            valueKey={"value"}
            onChange={(v) => {
              console.log(v.value[0].value);
              setPreferences({
                philHealthYear: v.value[0].value,
                taxRateYear: preferences.taxRateYear,
              });
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind={ButtonKind.tertiary}
          onClick={() => setIsOpen(false)}
        >
          Close
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default Preferences;
