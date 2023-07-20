import { useRef, useEffect, useState, memo } from "react";

const chibaMenu = ({ arrBtn }) => {
    let groupButtonMenuClass = "group-button-menu ";
    let btnMenuCustomClass = "btn-col-2 ";

    const buttons = arrBtn.filter(item => !item.disabled);

    switch (true) {
        case buttons.length < 4:
            switch (true) {
                case this.props.menuButtonList.length > 6:
                    groupButtonMenuClass += " group-col-1 col-6";
                    btnMenuCustomClass = "btn-col-1 col-6";
                    break;
                case this.props.menuButtonList.length <= 6 && this.props.menuButtonList.length > 4:
                    groupButtonMenuClass += " group-col-2";
                    btnMenuCustomClass = "btn-col-2 ";
                    break;
                case this.props.menuButtonList.length === 4:
                    groupButtonMenuClass += " group-col-3";
                    btnMenuCustomClass = "btn-col-2 ";
                    break;
                case this.props.menuButtonList.length <= 3:
                    groupButtonMenuClass += " group-col-4";
                    btnMenuCustomClass = "btn-col-2 ";
                    break;
                default:
                    break;
            }
            break;
        case buttons.length === 4:
            switch (true) {
                case this.props.menuButtonList.length > 4:
                    groupButtonMenuClass += " group-col-2";
                    btnMenuCustomClass = "btn-col-2 ";
                    break;
                case this.props.menuButtonList.length === 4:
                    groupButtonMenuClass += " group-col-3";
                    btnMenuCustomClass = "btn-col-2 ";
                    break;
                case this.props.menuButtonList.length <= 3:
                    groupButtonMenuClass += " group-col-4";
                    btnMenuCustomClass = "btn-col-2 ";
                    break;
                default:
                    break;
            }
            break;
        case buttons.length > 4 && buttons.length <= 6:
            groupButtonMenuClass += " group-col-3";
            btnMenuCustomClass = "btn-col-3 ";
            break;
        case buttons.length > 6 && buttons.length <= 8:
            groupButtonMenuClass += " group-col-6";
            btnMenuCustomClass = "btn-col-6";
            break;
        case buttons.length > 8:
            groupButtonMenuClass += " group-col-6";
            btnMenuCustomClass = "btn-col-6 ";
            break;
        default:
            break;
    }

    return (
        <div className="card-menu">
            <div id="menuButtonPC" className={groupButtonMenuClass}>
                <div className="list-button-menu">
                    {buttons.map((element, index) => {
                        return (
                            <div key={index} className={"btn-menu-custom " + btnMenuCustomClass}>
                                <button
                                    id={element.id ? element.id : `btn-${index}`}
                                    title={element.buttonLabel}
                                    className={`btn btn-custom ${element.disabled ? " custom-menu-disabled" : ""}`}
                                    onClick={() => !element.disabled && element.onClickFunction?.()}
                                >
                                    <img className="img-button" alt={element.buttonLabel} src={element.urlIcon} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* menu mobile */}
            <div className="menu-button-mobile px-3">
                <div className="row">
                    <div className="col-12 col-sm-8 px-0">
                        <div className="list-button-group-menu ">
                            {arrBtn.map((element, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`${btnMenuCustomClass} btn-menu-custom btn ${element.disabled ? " custom-menu-disabled" : ""}`}
                                        onClick={() => !element.disabled && element.onClickFunction?.()}
                                    >
                                        <div className="img-center">
                                            <img className="img-button" alt={element.buttonLabel} src={element.urlIcon} />
                                            <div className="button-label">{element.buttonLabel}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(chibaMenu);