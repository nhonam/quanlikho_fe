import React, { memo, useEffect, useState } from 'react'
import { IconButton } from "@material-ui/core/";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import "./ButtonScroll.styles.scss"
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const ButtonScroll = () => {
    // Custom Button
    const ButtonScroll = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(blue[700]),
            backgroundColor: blue[700],
            '&:hover': {
                // backgroundColor: blue[900],
            },
            '&:disabled': {
                backgroundColor: blue[200],
            },
        },
    }))(IconButton);

    const [btnScroll, setBtnScroll] = useState({
        top: true,
        bottom: false
    })

    const [visibleBtnScroll] = useState(true)
    const onBtnScrollClick = (paramLabelButton) => {
        switch (paramLabelButton) {
            case "TOP":
                window.scrollTo({
                    top: 0, // Scroll Top
                    behavior: 'smooth' // smoothly scrolling
                });
                break;
            case "BOTTOM":
                window.scrollTo({
                    top: document.documentElement.scrollHeight, // Scroll End Page
                    behavior: 'smooth' // smoothly scrolling
                });
                break;
            default:
                return;
        }
    }

    const showBtnScroll = () => {
        let viewportHeight = window.innerHeight;
        let contentHeight = document.documentElement.scrollHeight;
        let viewableRatio = contentHeight / viewportHeight;
        let thumbHeight = viewportHeight * viewableRatio;
        let endPoint = Math.abs(viewportHeight - thumbHeight);

        switch (true) {
            case window.scrollY > Math.round(endPoint * 0.1) && window.scrollY < Math.round(endPoint * 0.4):
                setBtnScroll({
                    top: true,
                    bottom: false,
                });
                break;
            case window.scrollY > Math.round(endPoint * 0.4) && window.scrollY < Math.round(endPoint * 0.6):
                setBtnScroll({
                    top: false,
                    bottom: false,
                });
                break;
            case window.scrollY > Math.round(endPoint * 0.8):
                setBtnScroll({
                    top: false,
                    bottom: true,
                });
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        window.addEventListener("scroll", showBtnScroll);
        return () => {
            window.removeEventListener("scroll", showBtnScroll);
        }
    }, [])

    return (
        <>
            {visibleBtnScroll && (<div className="btn-scroll-group">
                {/* Go To Top */}
                <ButtonScroll
                    onClick={() => { onBtnScrollClick("TOP") }}
                    className='btn-scroll'
                    size="medium"
                    disabled={btnScroll.top}
                >
                    <AiOutlineArrowUp className='icon-button-scroll' fontSize="inherit" />
                </ButtonScroll>
                {/* Go To Bottom */}
                <ButtonScroll
                    onClick={() => onBtnScrollClick("BOTTOM")}
                    className='btn-scroll'
                    size="medium"
                    disabled={btnScroll.bottom}
                >
                    <AiOutlineArrowDown className='icon-button-scroll' fontSize="inherit" />
                </ButtonScroll>
            </div>)}
        </>
    )
}

export default memo(ButtonScroll);