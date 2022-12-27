import { ListItem, ListItemLabel } from "baseui/list";
import { LabelMedium } from "baseui/typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { peso } from "../lib/util";

interface IContributionProps {
  contributions: IMandatoryContributions;
  employerType: IEmployerType;
}

const ContributionItem = (props: {
  value: number;
  children: React.ReactNode;
  desc?: string;
}) => (
  <ListItem
    endEnhancer={() => <LabelMedium>{peso.format(props.value)}</LabelMedium>}
  >
    <ListItemLabel description={props.desc}>{props.children}</ListItemLabel>
  </ListItem>
);

const Contributions: React.FC<IContributionProps> = (props) => {
  const { t } = useTranslation();
  const { contributions: c } = props;
  const total = Object.keys(c)
    .map((q) => q as keyof typeof c)
    .filter((key) => !isNaN(c[key]))
    .reduce((t, k) => (t += c[k]), 0);
  return (
    <>
      <ul style={{ padding: 0 }}>
        {props.employerType === "pvt" && (
          <ContributionItem value={c.sss}>
            {t("contributions.sss.label")}
          </ContributionItem>
        )}
        {props.employerType === "pvt" && (
          <ContributionItem
            value={c.sssMpf}
            desc={t("contributions.sssMpf.desc")}
          >
            {t("contributions.sssMpf.label")}
          </ContributionItem>
        )}
        {props.employerType === "govt" && (
          <ContributionItem value={c.gsis}>
            {t("contributions.gsis.label")}
          </ContributionItem>
        )}
        <ContributionItem
          value={c.philHealth}
          desc={`${c.philHealthYear} bracket`}
        >
          {t("contributions.philHealth.label")}
        </ContributionItem>
        <ContributionItem
          value={c.pagibig}
          desc={t("contributions.pagibig.desc")}
        >
          {t("contributions.pagibig.label")}
        </ContributionItem>
        <ContributionItem value={total}>
          {t("contributions.total")}
        </ContributionItem>
      </ul>
    </>
  );
};

export default Contributions;
