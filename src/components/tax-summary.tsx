import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ChevronRight } from "baseui/icon";
import { ListItem, ListItemLabel } from "baseui/list";
import { LabelLarge, LabelMedium, LabelSmall } from "baseui/typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { peso } from "../lib/util";
import UnpaddedList from "./unpadded-list";

const TaxSummary: React.FC<ITaxSummary> = (props) => {
  const [summary, setSummary] = useState(props);
  const [, theme] = useStyletron();
  const { t } = useTranslation();

  const getDivisor = (period: ISummaryPeriod) => {
    switch (period) {
      case "Monthly":
        return 12;
      case "Biweekly":
        return 24;
      default:
      case "Annual":
        return 1;
    }
  };

  useEffect(() => {
    const divisor = getDivisor(props.period);
    const sum = Object.keys(props)
      .filter((q) => q !== "children")
      .map((q) => q as keyof ITaxSummary)
      .reduce((val, key) => {
        if (typeof props[key] == "object") {
          val = {
            ...val,
            [key]: Object.keys(props[key]).reduce(
              (v: any, k: string) => ({ ...v, [k]: v[k] / divisor }),
              props[key]
            ),
          };
        } else if (typeof props[key] == "string") {
          val = { ...val, [key]: props[key] };
        } else {
          val = { ...val, [key]: (props[key] as number) / divisor };
        }
        return val;
      }, props);
    setSummary(sum);
  }, [props]);

  return (
    <>
      <UnpaddedList>
        <ListItem
          endEnhancer={() => (
            <LabelMedium>{peso.format(summary.gross)}</LabelMedium>
          )}
        >
          <ListItemLabel description>{t("summary.gross.label")}</ListItemLabel>
        </ListItem>
        <ListItem
          endEnhancer={() => (
            <LabelMedium>{peso.format(summary.nonTaxable)}</LabelMedium>
          )}
        >
          <ListItemLabel>{t("summary.nonTaxable.label")}</ListItemLabel>
        </ListItem>
        <ListItem
          sublist
          artwork={() => <ChevronRight color={theme.colors.primary} />}
          endEnhancer={() => (
            <LabelMedium>{peso.format(summary.deminimis)}</LabelMedium>
          )}
        >
          <ListItemLabel sublist>{t("summary.deminimis.label")}</ListItemLabel>
        </ListItem>

        <ListItem
          endEnhancer={() => (
            <LabelMedium>{peso.format(summary.totalContribution)}</LabelMedium>
          )}
        >
          <ListItemLabel>{t("summary.contributions.label")}</ListItemLabel>
        </ListItem>

        <ListItem
          endEnhancer={() => (
            <LabelMedium>{peso.format(summary.taxable)}</LabelMedium>
          )}
        >
          <ListItemLabel>{t("summary.taxable.label")}</ListItemLabel>
        </ListItem>

        <Block
          backgroundColor={theme.colors.accent}
          color={"white"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={"1rem"}
          margin={"2rem"}
        >
          <LabelLarge color={theme.colors.buttonPrimaryText}>
            {peso.format(summary.taxDue)}
          </LabelLarge>
          <LabelSmall color={theme.colors.buttonPrimaryText}>
            {t("summary.taxDue.label")}
          </LabelSmall>
        </Block>
        <Block
          backgroundColor={theme.colors.backgroundInversePrimary}
          color={"white"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={"1rem"}
          margin={"2rem"}
        >
          <LabelLarge color={theme.colors.buttonPrimaryText}>
            {peso.format(
              summary.gross - summary.totalContribution - summary.taxDue
            )}
          </LabelLarge>
          <LabelSmall color={theme.colors.buttonPrimaryText}>
            {t("summary.takeHome.label")}
          </LabelSmall>
        </Block>
      </UnpaddedList>
    </>
  );
};

export default TaxSummary;
