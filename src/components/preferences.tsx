import * as React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    SIZE,
    ROLE
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { useTheme } from "../providers/ThemeProvider";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";
import { t } from "i18next";

const Preferences = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
    const themeContext = useTheme();
    const [darkMode, setDarkMode] = React.useState(
        localStorage.getItem("theme") === "dark"
    );
    React.useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        themeContext.changeTheme(darkMode ? "dark" : "light");
    }, [darkMode, themeContext]);

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
            </ModalBody>
            <ModalFooter>
                <ModalButton kind={ButtonKind.tertiary} onClick={() => setIsOpen(false)}>
                    Close
                </ModalButton>
            </ModalFooter>
        </Modal>
    );
}

export default Preferences;