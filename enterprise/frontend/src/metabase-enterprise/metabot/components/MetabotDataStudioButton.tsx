import { t } from "ttag";

import { useSetting } from "metabase/common/hooks";
import { METAKEY } from "metabase/lib/browser";
import { useSelector } from "metabase/lib/redux";
import * as Urls from "metabase/lib/urls";
import { getLocation } from "metabase/selectors/routing";
import { ActionIcon, Icon, Tooltip } from "metabase/ui";

import { trackMetabotChatOpened } from "../analytics";
import { useMetabotAgent } from "../hooks";

export const MetabotDataStudioButton = () => {
  const metabot = useMetabotAgent();
  const location = useSelector(getLocation);
  const enabledUseCases = useSetting("metabot-enabled-use-cases");
  const isTransformsEnabled = enabledUseCases?.includes("transforms") ?? false;
  const isOnTransformsPage = location.pathname?.startsWith(
    Urls.transformList(),
  );
  const disabled = !isOnTransformsPage || !isTransformsEnabled;

  const handleClick = () => {
    if (!metabot.visible) {
      trackMetabotChatOpened("header");
    }

    metabot.setVisible(!metabot.visible);
  };

  const label = !isTransformsEnabled
    ? t`Metabot has not been enabled for transforms`
    : !isOnTransformsPage
      ? t`Metabot can't be viewed on this page`
      : t`Chat with Metabot (${METAKEY}+E)`;

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="subtle"
        bd="1px solid var(--mb-color-border)"
        p="sm"
        h="2.25rem"
        w="2.25rem"
        disabled={disabled}
        aria-label={label}
        onClick={handleClick}
      >
        <Icon c={disabled ? undefined : "text-primary"} name="metabot" />
      </ActionIcon>
    </Tooltip>
  );
};
