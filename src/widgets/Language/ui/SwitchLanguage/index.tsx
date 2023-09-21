import nextI18nextConfig from "@root/next-i18next.config";
import styled from "styled-components";
import { useSwitchLanguage } from "../../hooks/useSwitchLanguage";
import { Button } from "@nextui-org/react";

const locales = nextI18nextConfig.i18n.locales;

export const SwitchLanguage = () => {
  const onSwitch = useSwitchLanguage();

  return (
    <Switch>
      {locales.map((locale) => (
        <Option key={locale} onClick={() => onSwitch(locale)}>
          {locale}
        </Option>
      ))}
    </Switch>
  );
};

const Switch = styled.div``;

const Option = styled(Button)`
  cursor: pointer;
`;
