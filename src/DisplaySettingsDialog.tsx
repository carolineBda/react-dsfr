import React, { memo, forwardRef, useId } from "react";
import { fr } from "./lib";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./lib/i18n";
import { cx } from "./lib/tools/cx";
import type { Equals } from "tsafe";
import { assert } from "tsafe/assert";
import ArtworkLightSvg from "./dsfr/artwork/light.svg";
import ArtworkDarkSvg from "./dsfr/artwork/dark.svg";
import ArtworkSystemSvg from "./dsfr/artwork/system.svg";
import { getAssetUrl } from "./lib/tools/getAssetUrl";
import type { HeaderProps } from "./Header";

export type DisplaySettingsDialog = {
    className?: string;
};

const dialogId = "fr-theme-modal";
const dialogTitleId = "fr-theme-modal-title";

export const headerQuickAccessDisplaySettingsItem: HeaderProps.QuickAccessItem.Button = {
    "buttonProps": {
        "aria-controls": dialogId,
        ...({ "data-fr-opened": false } as {})
    },
    "iconId": "fr-icon-theme-fill",
    "text": (() => {
        function Text() {
            const { t } = useTranslation();
            return <>{t("display settings")}</>;
        }

        return <Text />;
    })()
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-darkmodeswitch> */
export const DisplaySettingsDialog = memo(
    forwardRef<HTMLDialogElement, DisplaySettingsDialog>((props, ref) => {
        const { className, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        return (
            <dialog
                id={dialogId}
                className={cx(fr.cx("fr-modal"), className)}
                role="dialog"
                aria-labelledby={dialogTitleId}
                ref={ref}
                {...rest}
            >
                <div className={fr.cx("fr-container", "fr-container--fluid", "fr-container-md")}>
                    <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
                        <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
                            <div className={fr.cx("fr-modal__body")}>
                                <div className={fr.cx("fr-modal__header")}>
                                    <button
                                        className={fr.cx("fr-btn--close", "fr-btn")}
                                        aria-controls={dialogId}
                                        title={t("close")}
                                    >
                                        {t("close")}
                                    </button>
                                </div>
                                <div className="fr-modal__content">
                                    <h1 id={dialogTitleId} className={fr.cx("fr-modal__title")}>
                                        {t("display settings")}
                                    </h1>
                                    <div /*id="fr-display"*/ className={"fr-display"}>
                                        <div className={fr.cx("fr-form-group" as any)}>
                                            <fieldset className={fr.cx("fr-fieldset")}>
                                                <legend
                                                    className={fr.cx(
                                                        "fr-fieldset__legend",
                                                        "fr-text--regular"
                                                    )}
                                                    //id="-legend"
                                                >
                                                    {t("pick a theme")}
                                                </legend>
                                                <div className={fr.cx("fr-fieldset__content")}>
                                                    {(["light", "dark", "system"] as const).map(
                                                        theme => (
                                                            <RadioGroup key={theme} theme={theme} />
                                                        )
                                                    )}
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        );
    })
);

DisplaySettingsDialog.displayName = symToStr({ DisplaySettingsDialog });

export default DisplaySettingsDialog;

const RadioGroup = memo((props: { theme: "dark" | "light" | "system" }) => {
    const { theme } = props;

    const inputId = useId();

    const { t } = useTranslation();

    const pictogramUrl = getAssetUrl(
        (() => {
            switch (theme) {
                case "dark":
                    return ArtworkDarkSvg;
                case "light":
                    return ArtworkLightSvg;
                case "system":
                    return ArtworkSystemSvg;
            }
        })()
    );

    return (
        <div key={theme} className={fr.cx("fr-radio-group", "fr-radio-rich")}>
            <input value={theme} type="radio" id={inputId} name="fr-radios-theme" />
            <label className="fr-label" htmlFor={inputId}>
                {t(`${theme} theme`)}
                {theme === "system" && (
                    <span className={fr.cx("fr-hint-text")}>{t("system theme hint")}</span>
                )}
            </label>
            <div className={fr.cx("fr-radio-rich__img")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    //className={fr.cx("fr-artwork")}
                    width="80px"
                    height="80px"
                    viewBox="0 0 80 80"
                >
                    {(["artwork-decorative", "artwork-minor", "artwork-major"] as const).map(
                        label => (
                            <use
                                key={label}
                                className={fr.cx(`fr-${label}`)}
                                xlinkHref={`${pictogramUrl}#${label}`}
                            />
                        )
                    )}
                </svg>
            </div>
        </div>
    );
});

RadioGroup.displayName = symToStr({ RadioGroup });

const { useTranslation, addDisplaySettingsDialogTranslations } = createComponentI18nApi({
    "componentName": symToStr({ DisplaySettingsDialog }),
    "frMessages": {
        /* spell-checker: disable */
        "display settings": "Paramètres d'affichage",
        "close": "Fermer",
        "pick a theme": `Choisissez un thème pour personnaliser l'apparence du site.`,
        "light theme": `Thème clair`,
        "dark theme": `Thème sombre`,
        "system theme": `Système.`,
        "system theme hint": `Utilise les paramètres système.`
        /* spell-checker: enable */
    }
});

addDisplaySettingsDialogTranslations({
    "lang": "en",
    "messages": {
        "display settings": "Display settings",
        "close": "Close",
        "pick a theme": `Pick a theme to customize the website's look.`,
        "light theme": `Light theme`,
        "dark theme": "Dark theme",
        "system theme": `System.`,
        "system theme hint": "Use system preference"
    }
});

addDisplaySettingsDialogTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "display settings": "Parámetro de visualización",
        "close": "Cerrar",
        "pick a theme": `Elija un tema para personalizar el aspecto del sitio.`
        /* spell-checker: enable */
    }
});

export { addDisplaySettingsDialogTranslations };